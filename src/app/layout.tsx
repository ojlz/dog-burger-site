import type { Metadata } from "next";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const siteUrl = "https://dogburger.com.br";

export const metadata: Metadata = {
  title: {
    default:
      "Dog Burger & Café | Melhor Hamburgueria Artesanal de Porto Fictício/EX",
    template: "%s | Dog Burger & Café",
  },
  description:
    "🏆 Dog Burger & Café - A melhor hamburgueria artesanal de Porto Fictício/EX. Hambúrgueres feitos na churrasqueira, Hot Dogs prensados e cafés especiais. 📲 Peça pelo WhatsApp! ⭐ 4.8 estrelas no Google.",
  keywords: [
    // Principais
    "hamburgueria porto-ficticio",
    "hambúrguer artesanal porto-ficticio",
    "hot dog porto-ficticio",
    "dog burger porto-ficticio",
    "melhor hamburger porto-ficticio",
    "hamburgueria estado fictício",
    // Pratos
    "australiano burger",
    "páprica burger",
    "toscana burger",
    "hot dog prensado",
    "hambúrguer cheddar",
    "hambúrguer bacon",
    // Genéricos
    "hambúrguer artesanal",
    "comida artesanal",
    "delivery porto-ficticio",
    "lanchonete porto-ficticio",
    "restaurante porto-ficticio",
    // Intenção de compra
    "pedir hamburger porto-ficticio",
    "hamburger perto de mim",
    "onde comer em porto-ficticio",
    "melhor lanche porto-ficticio",
  ],
  authors: [{ name: "Dog Burger & Café" }],
  creator: "Dog Burger & Café",
  publisher: "Dog Burger & Café",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Dog Burger & Café",
    title: "Dog Burger & Café | Melhor Hamburgueria Artesanal de Porto Fictício",
    description:
      "🏆 Hambúrgueres artesanais feitos na churrasqueira e Hot Dogs prensados. ⭐ 4.8 estrelas no Google. 📲 Peça pelo WhatsApp!",
    images: [
      {
        url: "/burgao.jpeg",
        width: 1200,
        height: 630,
        alt: "Dog Burger - Melhor Hamburgueria Artesanal de Porto Fictício - Hambúrguer Australiano",
      },
      {
        url: "/australianoburger.jpg",
        width: 800,
        height: 600,
        alt: "Australiano Burger - Dog Burger Porto Fictício",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Burger & Café | Melhor Hamburgueria de Porto Fictício",
    description:
      "🏆 Hambúrgueres artesanais e Hot Dogs em Porto Fictício/EX. ⭐ 4.8 no Google. Peça pelo WhatsApp!",
    images: ["/burgao.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "google-site-verification": "",
    "geo.region": "BR-EX",
    "geo.placename": "Porto Fictício",
    "geo.position": "0.0000;-30.0000",
    "ICBM": "0.0000, -30.0000",
  },
};

// JSON-LD structured data
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Dog Burger & Café",
  image: [`${siteUrl}/burgao.jpeg`, `${siteUrl}/australianoburger.jpg`],
  url: siteUrl,
  telephone: "+5500090000007",
  description:
    "Hamburgueria artesanal em Porto Fictício/EX. Hambúrgueres feitos na churrasqueira, Hot Dogs prensados e cafés especiais.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Fictícia, 621",
    addressLocality: "Porto Fictício",
    addressRegion: "MS",
    postalCode: "00000-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 0.0000,
    longitude: -30.0000,
  },
  priceRange: "$$",
  servesCuisine: ["Hambúrguer Artesanal", "Hot Dog", "Café", "Lanche"],
  acceptReservations: "False",
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Hambúrgueres Artesanais",
        description: "Hambúrgueres feitos na churrasqueira com ingredientes selecionados",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Australiano Burger", description: "Pão australiano, hambúrguer 150g, queijo cheddar, mussarela, bacon crocante, cebola roxa, rúcula, tomate, molho barbecue e molho especial", offers: { "@type": "Offer", price: "27.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Páprica Burger", description: "Pão de brioche com gergelim, hambúrguer 150g, queijo prato duplo, picles, cebola caramelizada e molho páprica especial", offers: { "@type": "Offer", price: "26.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Toscana Burger", description: "Pão de batata, hambúrguer de linguiça toscana 150g, mussarela duplo, bacon crocante, alface, tomate, cebola roxa, molho barbecue e molho especial", offers: { "@type": "Offer", price: "25.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Tradicional Burger", description: "Pão de leite, hambúrguer 150g, queijo prato, molho especial, tomate e alface", offers: { "@type": "Offer", price: "21.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Bacon Burger", description: "Pão de brioche com gergelim, hambúrguer 150g, queijo prato, bacon crocante, cebola roxa, tomate, maionese, molho barbecue e alface", offers: { "@type": "Offer", price: "23.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Cheddar Burger", description: "Pão de brioche com gergelim, hambúrguer 150g, queijo cheddar, bacon crocante, cebola caramelizada e molho especial defumado", offers: { "@type": "Offer", price: "23.90", priceCurrency: "BRL" } },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Hot Dogs Prensados",
        description: "Hot Dogs prensados na chapa com crocância irresistível",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Dog Mix", description: "Pão, salsicha, frango desfiado, bacon, calabresa, milho verde, batata palha, alface, tomate, maionese e molho especial", offers: { "@type": "Offer", price: "21.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Dog Calabresa", description: "Pão, salsicha, calabresa, milho verde, batata palha, alface, tomate, maionese e molho especial", offers: { "@type": "Offer", price: "17.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Dog Bacon", description: "Pão, salsicha, bacon, milho verde, batata palha, alface, tomate, maionese e molho especial", offers: { "@type": "Offer", price: "17.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Dog Molho", description: "Pão, salsicha, molho bolonhesa, milho verde, vinagrete, batata palha e maionese", offers: { "@type": "Offer", price: "11.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Dog Vegetariano", description: "Pão, queijo mussarela, queijo catupiry, milho verde, tomate, alface, batata palha, maionese e molho especial", offers: { "@type": "Offer", price: "10.90", priceCurrency: "BRL" } },
          { "@type": "MenuItem", name: "Dog Simples", description: "Pão, salsicha, milho verde, batata palha, maionese e molho especial", offers: { "@type": "Offer", price: "9.90", priceCurrency: "BRL" } },
        ],
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "200",
    bestRating: "5",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mariana S." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "O melhor hambúrguer que já comi em Porto Fictício! A carne é incrível e o atendimento é excelente.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Carlos R." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Lugar incrível! A vibe é muito boa e os hambúrgueres são monstruosos.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ana P." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Já pedi várias vezes pelo delivery e nunca decepciona. Ingredientes frescos e sempre muito saboroso.",
    },
  ],
  sameAs: [
    "https://www.instagram.com/dogburger.site/",
    "https://wa.me/5500090000007",
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "15:00", closes: "22:30" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qual o melhor hambúrguer da Dog Burger?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Australiano Burger é o mais pedido! Pão australiano, hambúrguer 150g, queijo cheddar, mussarela, bacon crocante, cebola roxa, rúcula, tomate, molho barbecue e molho especial. Por R$ 27,90.",
      },
    },
    {
      "@type": "Question",
      name: "A Dog Burger faz delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim! Você pode pedir pelo WhatsApp (00) 90000-0007. Entregamos em Porto Fictício e região.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o horário de funcionamento da Dog Burger?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Funcionamos de Terça a Sábado das 15h às 22h30, e Domingo das 18h às 22h30. Segunda-feira estamos fechados.",
      },
    },
    {
      "@type": "Question",
      name: "Onde fica a Dog Burger em Porto Fictício?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estamos na Av. Fictícia, 621 - Centro, Porto Fictício - EX, CEP: 00000-000. Pelo Google Maps, busque por 'Dog Burger & Café'.",
      },
    },
    {
      "@type": "Question",
      name: "A Dog Burger tem hot dog prensado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim! Nosso Hot Dog Prensado é feito na chapa com crosta dourada, molho artesanal, salsicha Seara, milho verde e batata palha. A partir de R$ 9,90.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a nota da Dog Burger no Google?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Dog Burger tem 4.8 estrelas no Google com mais de 200 avaliações. Somos a hamburgueria mais bem avaliada de Porto Fictício!",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dog Burger & Café",
  image: `${siteUrl}/burgao.jpeg`,
  url: siteUrl,
  telephone: "+5500090000007",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Fictícia, 621",
    addressLocality: "Porto Fictício",
    addressRegion: "MS",
    postalCode: "00000-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 0.0000,
    longitude: -30.0000,
  },
  priceRange: "$$",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "15:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "15:00", closes: "22:30" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "200",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#090909" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Dog Burger" />
        <link rel="apple-touch-icon" href="/burgao.jpeg" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
