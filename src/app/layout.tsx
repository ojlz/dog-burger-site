import type { Metadata } from "next";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  title: "Dog Burger & Café | Hambúrguer e Hot Dog Artesanal em Porto Fictício�",
  description:
    "Hambúrgueres artesanais feitos na churrasqueira e Hot Dogs especiais. Australiano Burger, Páprica Burger, Toscana Burger e mais. Peça pelo WhatsApp!",
  keywords: [
    "hambúrguer artesanal",
    "hot dog",
    "hamburgueria",
    "Porto Fictício�",
    "Estado Fictício",
    "Dog Burger",
    "burger",
    "comida artesanal",
    "delivery",
    "WhatsApp",
    "australiano burger",
    "páprica burger",
    "toscana burger",
  ],
  authors: [{ name: "Dog Burger & Café" }],
  creator: "Dog Burger & Café",
  publisher: "Dog Burger & Café",
  metadataBase: new URL("https://dogburger.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://dogburger.com.br",
    siteName: "Dog Burger & Café",
    title: "Dog Burger & Café | Hambúrguer e Hot Dog Artesanal em Porto Fictício�",
    description:
      "Hambúrgueres artesanais feitos na churrasqueira e Hot Dogs especiais. Peça pelo WhatsApp!",
    images: [
      {
        url: "/burgao.jpeg",
        width: 1200,
        height: 630,
        alt: "Dog Burger - Hambúrguer e Hot Dog Artesanal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Burger & Café | Hambúrguer e Hot Dog Artesanal em Porto Fictício�",
    description:
      "Hambúrgueres artesanais feitos na churrasqueira e Hot Dogs especiais.",
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
    canonical: "https://dogburger.com.br",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#090909" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Dog Burger & Café",
              image: "/burgao.jpeg",
              description:
                "Hambúrgueres artesanais preparados com ingredientes frescos e apresentação premium. Hot Dogs e Hambúrgueres feitos na churrasqueira.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Fictícia, 621",
                addressLocality: "Porto Fictício�",
                addressRegion: "MS",
                postalCode: "00000-000",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -23.0588221,
                longitude: -54.1959596,
              },
              telephone: "+5500090000007",
              url: "https://www.instagram.com/dogburger.site/",
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "18:00",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Tuesday",
                  opens: "15:00",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Wednesday",
                  opens: "15:00",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Thursday",
                  opens: "15:00",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "15:00",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "15:00",
                  closes: "22:30",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "200",
              },
              servesCuisine: ["Hambúrguer Artesanal", "Hot Dog", "Café"],
              acceptingReservations: "False",
              hasMenu: {
                "@type": "Menu",
                hasMenuSection: [
                  {
                    "@type": "MenuSection",
                    name: "Hambúrguer",
                    hasMenuItem: [
                      { "@type": "MenuItem", name: "Tradicional Burger", offers: { "@type": "Offer", price: "21.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Bacon Burger", offers: { "@type": "Offer", price: "23.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Cheddar Burger", offers: { "@type": "Offer", price: "23.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Páprica Burger", offers: { "@type": "Offer", price: "26.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Australiano Burger", offers: { "@type": "Offer", price: "27.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Toscana Burger", offers: { "@type": "Offer", price: "25.90", priceCurrency: "BRL" } },
                    ],
                  },
                  {
                    "@type": "MenuSection",
                    name: "Hot Dog",
                    hasMenuItem: [
                      { "@type": "MenuItem", name: "Dog Simples", offers: { "@type": "Offer", price: "9.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Dog Molho", offers: { "@type": "Offer", price: "11.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Dog Vegetariano", offers: { "@type": "Offer", price: "10.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Dog Calabresa", offers: { "@type": "Offer", price: "17.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Dog Bacon", offers: { "@type": "Offer", price: "17.90", priceCurrency: "BRL" } },
                      { "@type": "MenuItem", name: "Dog Mix", offers: { "@type": "Offer", price: "21.90", priceCurrency: "BRL" } },
                    ],
                  },
                ],
              },
            }),
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
