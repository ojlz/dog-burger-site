"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  BarChart3,
  MousePointerClick,
  Save,
  Check,
  TrendingUp,
  Key,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [analytics, setAnalytics] = useState<{
    pageViews: number;
    whatsappClicks: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "analytics" | "settings" | "password"
  >("analytics");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        const data = await res.json();
        setError(data.message || "Senha incorreta");
      }
    } catch {
      setError("Erro ao autenticar");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin", { method: "DELETE" });
    } catch {
      // Ignore error
    }
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleUpdateWhatsapp = async () => {
    if (!whatsappNumber.trim()) {
      alert("Digite um número válido");
      return;
    }

    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber: whatsappNumber.trim() }),
      });

      if (res.ok) {
        localStorage.setItem("whatsapp_number", whatsappNumber.trim());
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao atualizar");
      }
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setIsAuthenticated(false);
          setPasswordSuccess(false);
        }, 2000);
      } else {
        const data = await res.json();
        setPasswordError(data.message || "Erro ao alterar senha");
      }
    } catch {
      setPasswordError("Erro ao conectar com o servidor");
    }
  };

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ whatsappNumber: "check" }),
        });
        // If we get 401, session is invalid
        if (res.status === 401) {
          setIsAuthenticated(false);
        }
      } catch {
        // Ignore
      }
    };

    // Only check if we think we're authenticated
    // The cookie handles actual auth
    const savedNumber = localStorage.getItem("whatsapp_number");
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    }

    // Read analytics
    const visits = parseInt(localStorage.getItem("page_visits") || "0");
    const whatsappClicks = parseInt(
      localStorage.getItem("whatsapp_clicks") || "0"
    );

    setAnalytics({
      pageViews: visits,
      whatsappClicks: whatsappClicks,
    });
  }, []);

  const conversionRate =
    analytics && analytics.pageViews > 0
      ? ((analytics.whatsappClicks / analytics.pageViews) * 100).toFixed(1)
      : "0";

  if (!isAuthenticated) {
    return (
      <div className="admin-page min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          className="w-full max-w-md p-8 rounded-3xl glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <Lock size={48} className="mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
              Painel Administrativo
            </h1>
            <p className="text-muted mt-2">Dog Burger & Café</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Digite sua senha"
                className="w-full px-4 py-4 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <motion.button
              type="submit"
              className="w-full btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Entrar
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-page min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-[family-name:var(--font-display)]">
              <span className="gradient-text">DOG</span>
              <span className="text-white"> BURGER</span>
            </span>
            <span className="text-muted text-sm">Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted">Online</span>
            </div>

            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 text-muted hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut size={18} />
              <span className="text-sm">Sair</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-primary text-background"
                : "bg-surface text-muted hover:text-white"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "settings"
                ? "bg-primary text-background"
                : "bg-surface text-muted hover:text-white"
            }`}
          >
            Configurações
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "password"
                ? "bg-primary text-background"
                : "bg-surface text-muted hover:text-white"
            }`}
          >
            Alterar Senha
          </button>
        </div>

        {activeTab === "analytics" && analytics && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<BarChart3 size={24} />}
                label="Visualizações"
                value={analytics.pageViews.toLocaleString()}
                color="text-purple-500"
              />
              <StatCard
                icon={<MousePointerClick size={24} />}
                label="Cliques no WhatsApp"
                value={analytics.whatsappClicks.toLocaleString()}
                color="text-green-500"
              />
              <StatCard
                icon={<TrendingUp size={24} />}
                label="Conversão"
                value={`${conversionRate}%`}
                color="text-primary"
              />
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border">
              <p className="text-sm text-muted">
                Uma visita é contada por dispositivo, a cada 15 minutos. Os
                cliques no WhatsApp são contados a cada clique.
              </p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-xl space-y-6">
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <MessageCircle size={20} className="text-primary" />
                Número do WhatsApp
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-muted text-sm mb-2 block">
                    Número atual (formato internacional)
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="5500090000007"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  />
                  <p className="text-muted text-xs mt-2">
                    Formato: Código do país + DDD + Número (ex: 5500090000007)
                  </p>
                </div>

                <motion.button
                  onClick={handleUpdateWhatsapp}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                    saveSuccess ? "bg-green-500 text-white" : "btn-primary"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {saveSuccess ? (
                    <>
                      <Check size={20} />
                      <span>Salvo com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Salvar Número</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass">
              <h3 className="text-white font-bold mb-4">Número Ativo</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {whatsappNumber || "5500090000007"}
                  </p>
                  <p className="text-muted text-sm">
                    Clique no botão flutuante para testar
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="max-w-xl">
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Key size={20} className="text-primary" />
                Alterar Senha
              </h3>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="text-muted text-sm mb-2 block">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite a senha atual"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-muted text-sm mb-2 block">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="text-muted text-sm mb-2 block">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    required
                    minLength={6}
                  />
                </div>

                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}

                {passwordSuccess && (
                  <p className="text-green-500 text-sm">
                    Senha alterada com sucesso! Redirecionando...
                  </p>
                )}

                <motion.button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                    passwordSuccess ? "bg-green-500 text-white" : "btn-primary"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={passwordSuccess}
                >
                  {passwordSuccess ? (
                    <>
                      <Check size={20} />
                      <span>Senha Alterada!</span>
                    </>
                  ) : (
                    <>
                      <Key size={20} />
                      <span>Alterar Senha</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-2xl glass"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`mb-4 ${color}`}>{icon}</div>
      <div className="text-3xl font-bold text-white font-[family-name:var(--font-display)]">
        {value}
      </div>
      <div className="text-muted text-sm mt-1">{label}</div>
    </motion.div>
  );
}
