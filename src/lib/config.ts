export interface SiteConfig {
  whatsappNumber: string;
  businessName: string;
  tagline: string;
  address: string;
  phone: string;
  openingHours: string;
  rating: number;
  reviewCount: number;
  instagramUrl: string;
}

export function formatWhatsAppUrl(phone: string, message?: string): string {
  const baseUrl = "https://wa.me/";
  const cleanedPhone = phone.replace(/\D/g, "");
  const encodedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `${baseUrl}${cleanedPhone}${encodedMessage}`;
}

export const siteConfig: SiteConfig = {
  whatsappNumber: "5500090000007",
  businessName: "Dog Burger & Café",
  tagline: "O sabor que faz Porto Fictício� voltar",
  address: "Av. Fictícia, 621 - Centro, Porto Fictício� - MS, CEP: 00000-000",
  phone: "(00) 90000-0007",
  openingHours: "Dom: 18h–22h30 | Seg: Fechado | Ter–Sáb: 15h–22h30",
  rating: 4.8,
  reviewCount: 200,
  instagramUrl: "https://www.instagram.com/dogburger.site/",
};

export interface Specialties {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const specialties: Specialties[] = [
  {
    id: "1",
    name: "Australiano Burger",
    description:
      "Pão australiano, maionese da casa, molho barbecue, hambúrguer 150g, bacon crocante, rúcula, tomate, cebola roxa, queijo mussarela e queijo cheddar em dobro.",
    price: "R$ 27,90",
    image: "/australianoburger.jpg",
  },
  {
    id: "2",
    name: "Hot Dog Prensado",
    description:
      "Na chapa com crosta dourada incrível! Molho artesanal, a melhor salsicha Seara, milho verde e a melhor batata palha. Crocância e sabor em cada mordida.",
    price: "R$ 17,90",
    image: "/hotdogprensado.webp",
  },
  {
    id: "3",
    name: "Toscana Burger",
    description:
      "Pão de batata, hambúrguer de linguiça toscana 150g, queijo mussarela duplo, bacon crocante, alface, tomate, cebola roxa, molho barbecue e molho especial.",
    price: "R$ 25,90",
    image: "/dogao.jpeg",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mariana S.",
    text: "O melhor hambúrguer que já comi em Porto Fictício�! A carne é incrível e o atendimento é excelente. Sempre peço pelo WhatsApp, super prático.",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos R.",
    text: "Lugar incrível! A vibe é muito boa e os hambúrgueres são monstruosos. Recomendo demais o Dog Burger Supreme.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana P.",
    text: "Já pedi várias vezes pelo delivery e nunca decepciona. Ingredientes frescos e sempre muito saboroso. Meu lugar favorito!",
    rating: 5,
  },
  {
    id: "4",
    name: "Lucas M.",
    text: "Ambiente top, comida top, atendimento top. Não tem o que reclamar. O Dog Burger é referência na cidade!",
    rating: 5,
  },
];
