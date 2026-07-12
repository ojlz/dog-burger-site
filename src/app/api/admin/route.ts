import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

// GitHub CMS config
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // ex: "usuario/dog-burger-config"
const CONFIG_PATH = "config.json";

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  if (!attempts) return true;
  if (now - attempts.lastAttempt > LOCKOUT_MS) {
    loginAttempts.delete(ip);
    return true;
  }
  return attempts.count < MAX_ATTEMPTS;
}

function recordAttempt(ip: string) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  if (!attempts || now - attempts.lastAttempt > LOCKOUT_MS) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    attempts.count++;
    attempts.lastAttempt = now;
  }
}

// Session management
const sessions = new Map<string, { createdAt: number }>();
const SESSION_DURATION = 24 * 60 * 60 * 1000;

function createSession(): string {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { createdAt: Date.now() });
  return token;
}

function validateSession(token: string): boolean {
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() - session.createdAt > SESSION_DURATION) {
    sessions.delete(token);
    return false;
  }
  return true;
}

// GitHub API helpers
async function getGithubConfig(): Promise<{
  whatsappNumber: string;
  adminPassword: string;
}> {
  const fallback = {
    whatsappNumber: process.env.WHATSAPP_NUMBER || "5500090000007",
    adminPassword: process.env.ADMIN_PASSWORD || "",
  };

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    console.warn("GitHub CMS not configured, using env vars");
    return fallback;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONFIG_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      // File doesn't exist, create it with defaults
      if (res.status === 404) {
        await saveGithubConfig(fallback);
        return fallback;
      }
      return fallback;
    }

    const data = await res.json();
    const content = JSON.parse(
      Buffer.from(data.content, "base64").toString("utf-8")
    );

    return {
      whatsappNumber: content.whatsappNumber || fallback.whatsappNumber,
      adminPassword: content.adminPassword || fallback.adminPassword,
    };
  } catch (error) {
    console.error("Error reading GitHub config:", error);
    return fallback;
  }
}

async function saveGithubConfig(config: {
  whatsappNumber?: string;
  adminPassword?: string;
}): Promise<boolean> {
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return false;
  }

  try {
    // Get current file to get SHA (required for updates)
    let sha: string | undefined;
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONFIG_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    // Get current config or use defaults
    const current = await getGithubConfig();
    const newConfig = {
      whatsappNumber: config.whatsappNumber || current.whatsappNumber,
      adminPassword: config.adminPassword || current.adminPassword,
    };

    const body: Record<string, string> = {
      message: `Update config: ${new Date().toISOString()}`,
      content: Buffer.from(JSON.stringify(newConfig, null, 2)).toString(
        "base64"
      ),
    };

    if (sha) {
      body.sha = sha;
    }

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONFIG_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return res.ok;
  } catch (error) {
    console.error("Error saving GitHub config:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Senha obrigatória" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Muitas tentativas. Tente novamente em 15 minutos.",
        },
        { status: 429 }
      );
    }

    const config = await getGithubConfig();
    if (!config.adminPassword) {
      return NextResponse.json(
        { success: false, message: "Senha não configurada" },
        { status: 500 }
      );
    }

    const isValid =
      password.length === config.adminPassword.length &&
      crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(config.adminPassword)
      );

    if (!isValid) {
      recordAttempt(ip);
      return NextResponse.json(
        { success: false, message: "Senha incorreta" },
        { status: 401 }
      );
    }

    const token = createSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao processar requisição" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { whatsappNumber } = body;

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (!sessionToken || !validateSession(sessionToken)) {
      return NextResponse.json(
        { success: false, message: "Não autorizado" },
        { status: 401 }
      );
    }

    if (!whatsappNumber || typeof whatsappNumber !== "string") {
      return NextResponse.json(
        { success: false, message: "Número obrigatório" },
        { status: 400 }
      );
    }

    const cleaned = whatsappNumber.replace(/\D/g, "");
    if (cleaned.length < 10 || cleaned.length > 15) {
      return NextResponse.json(
        { success: false, message: "Número inválido" },
        { status: 400 }
      );
    }

    // Skip if it's just a session check
    if (whatsappNumber === "check") {
      return NextResponse.json({ success: true });
    }

    const saved = await saveGithubConfig({ whatsappNumber: cleaned });

    if (saved) {
      return NextResponse.json({
        success: true,
        message: "Número atualizado com sucesso",
      });
    }

    // Fallback: save locally
    const fs = await import("fs");
    const path = await import("path");
    const configPath = path.join(process.cwd(), "data", "config.json");
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let config = { whatsappNumber: cleaned, adminPassword: "" };
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      config.whatsappNumber = cleaned;
    }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return NextResponse.json({
      success: true,
      message: "Número atualizado (local)",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (!sessionToken || !validateSession(sessionToken)) {
      return NextResponse.json(
        { success: false, message: "Não autorizado" },
        { status: 401 }
      );
    }

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Senha atual e nova senha obrigatórias" },
        { status: 400 }
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Nova senha deve ter no mínimo 6 caracteres",
        },
        { status: 400 }
      );
    }

    const config = await getGithubConfig();
    if (!config.adminPassword) {
      return NextResponse.json(
        { success: false, message: "Configuração incorreta" },
        { status: 500 }
      );
    }

    const isValid =
      currentPassword.length === config.adminPassword.length &&
      crypto.timingSafeEqual(
        Buffer.from(currentPassword),
        Buffer.from(config.adminPassword)
      );

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Senha atual incorreta" },
        { status: 401 }
      );
    }

    const saved = await saveGithubConfig({ adminPassword: newPassword });

    if (saved) {
      sessions.clear();
      return NextResponse.json({
        success: true,
        message: "Senha alterada com sucesso. Faça login novamente.",
      });
    }

    return NextResponse.json(
      { success: false, message: "Erro ao salvar nova senha" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  if (sessionToken) {
    sessions.delete(sessionToken);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_session");
  return response;
}
