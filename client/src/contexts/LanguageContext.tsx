import React, { createContext, useContext, useState } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Header
    "header.search": "Buscar produtos...",
    "header.favorites": "Favoritos",
    "header.tagline": "Sua loja de confiança",
    "header.all": "Todos",
    "header.delivery": "🚚 Pag. na Entrega",
    "header.online": "💳 Compra Online",
    // Banner
    "banner.badge1": "⚡ FRETE GRÁTIS",
    "banner.title1": "Ofertas Relâmpago",
    "banner.sub1": "Até 43% OFF em produtos selecionados",
    "banner.badge2": "✅ SEGURO E GARANTIDO",
    "banner.title2": "Pague na Entrega",
    "banner.sub2": "Compre agora e pague só quando receber",
    "banner.badge3": "💳 SEM JUROS",
    "banner.title3": "Parcele em 12x",
    "banner.sub3": "Sem juros em compras acima de R$100",
    // Trust
    "trust.delivery": "Entrega Garantida",
    "trust.delivery.sub": "3 a 7 dias úteis",
    "trust.secure": "Compra 100% Segura",
    "trust.secure.sub": "SSL certificado",
    "trust.guarantee": "30 Dias de Garantia",
    "trust.guarantee.sub": "Devolução fácil",
    "trust.support": "Suporte 24/7",
    "trust.support.sub": "WhatsApp sempre ativo",
    "trust.payment": "Pague na Entrega",
    "trust.payment.sub": "Sem risco nenhum",
    "trust.discount": "Até 43% OFF",
    "trust.discount.sub": "Ofertas diárias",
    // Seals
    "seal.verified": "Loja Verificada",
    "seal.secure": "Pagamento Seguro",
    "seal.tracked": "Entrega Rastreada",
    "seal.rating": "Avaliação 4.9★",
    // Products
    "products.bestsellers": "Mais Vendidos",
    "products.trending": "Em alta agora",
    "products.all": "Todos os Produtos",
    "products.found": "produtos encontrados",
    "products.free_shipping": "🚚 Frete Grátis ✓",
    "products.not_found": "Nenhum produto encontrado.",
    "products.clear": "Limpar filtros",
    // Timer
    "timer.title": "⚡ Oferta Relâmpago!",
    "timer.sub": "Preços especiais por tempo limitado",
    "timer.ends": "Termina em:",
    // CTA
    "cta.title": "🚚 Pague na Entrega!",
    "cta.sub": "Receba primeiro, pague depois. Zero risco pra você!",
    "cta.button": "Comprar Agora →",
    // Reviews
    "reviews.title": "⭐ Avaliações dos Clientes",
    "reviews.avg": "Avaliação Média",
    "reviews.clients": "Clientes",
    "reviews.guaranteed": "Garantido",
    // FAQ
    "faq.title": "❓ Perguntas Frequentes",
    "faq.all": "Todos",
    "faq.shipping": "🚚 Frete",
    "faq.returns": "🔄 Devoluções",
    "faq.payments": "💳 Pagamentos",
    // Footer
    "footer.about": "Sobre Nós",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.blog": "Blog de Dicas",
    "footer.track": "📦 Rastrear Pedido",
    "footer.whatsapp": "WhatsApp",
    "footer.rights": "© 2025 GVP Ofertas BR. Todos os direitos reservados.",
    "footer.desc": "Sua loja online de confiança com os melhores preços e entrega garantida em todo o Brasil.",
    "footer.info": "Informações",
    "footer.contact": "Contato",
    // Notification
    "notif.bought": "agora mesmo",
    "notif.bought_label": "Comprou:",
    // Visitors
    "visitors.online": "pessoas vendo agora",
    // WhatsApp button
    "whatsapp.message": "Olá! Vim pelo site GVP Ofertas BR.",
  },
  en: {
    // Header
    "header.search": "Search products...",
    "header.favorites": "Favorites",
    "header.tagline": "Your trusted store",
    "header.all": "All",
    "header.delivery": "🚚 Pay on Delivery",
    "header.online": "💳 Buy Online",
    // Banner
    "banner.badge1": "⚡ FREE SHIPPING",
    "banner.title1": "Flash Deals",
    "banner.sub1": "Up to 43% OFF on selected products",
    "banner.badge2": "✅ SAFE & GUARANTEED",
    "banner.title2": "Pay on Delivery",
    "banner.sub2": "Buy now and pay only when you receive",
    "banner.badge3": "💳 0% INTEREST",
    "banner.title3": "Installments",
    "banner.sub3": "No interest on purchases over $20",
    // Trust
    "trust.delivery": "Guaranteed Delivery",
    "trust.delivery.sub": "3 to 7 business days",
    "trust.secure": "100% Secure Purchase",
    "trust.secure.sub": "SSL certified",
    "trust.guarantee": "30-Day Guarantee",
    "trust.guarantee.sub": "Easy returns",
    "trust.support": "24/7 Support",
    "trust.support.sub": "Always available",
    "trust.payment": "Pay on Delivery",
    "trust.payment.sub": "Zero risk for you",
    "trust.discount": "Up to 43% OFF",
    "trust.discount.sub": "Daily deals",
    // Seals
    "seal.verified": "Verified Store",
    "seal.secure": "Secure Payment",
    "seal.tracked": "Tracked Delivery",
    "seal.rating": "4.9★ Rating",
    // Products
    "products.bestsellers": "Best Sellers",
    "products.trending": "Trending now",
    "products.all": "All Products",
    "products.found": "products found",
    "products.free_shipping": "🚚 Free Shipping ✓",
    "products.not_found": "No products found.",
    "products.clear": "Clear filters",
    // Timer
    "timer.title": "⚡ Flash Sale!",
    "timer.sub": "Special prices for limited time",
    "timer.ends": "Ends in:",
    // CTA
    "cta.title": "🚚 Pay on Delivery!",
    "cta.sub": "Receive first, pay after. Zero risk for you!",
    "cta.button": "Buy Now →",
    // Reviews
    "reviews.title": "⭐ Customer Reviews",
    "reviews.avg": "Average Rating",
    "reviews.clients": "Customers",
    "reviews.guaranteed": "Guaranteed",
    // FAQ
    "faq.title": "❓ Frequently Asked Questions",
    "faq.all": "All",
    "faq.shipping": "🚚 Shipping",
    "faq.returns": "🔄 Returns",
    "faq.payments": "💳 Payments",
    // Footer
    "footer.about": "About Us",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.blog": "Tips Blog",
    "footer.track": "📦 Track Order",
    "footer.whatsapp": "WhatsApp",
    "footer.rights": "© 2025 GVP Ofertas BR. All rights reserved.",
    "footer.desc": "Your trusted online store with the best prices and guaranteed delivery worldwide.",
    "footer.info": "Information",
    "footer.contact": "Contact",
    // Notification
    "notif.bought": "just now",
    "notif.bought_label": "Bought:",
    // Visitors
    "visitors.online": "people viewing now",
    // WhatsApp button
    "whatsapp.message": "Hello! I came from GVP Ofertas BR website.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("gvp-lang");
    if (saved === "en" || saved === "pt") return saved;
    const browser = navigator.language.toLowerCase();
    return browser.startsWith("pt") ? "pt" : "en";
  });

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("gvp-lang", l);
  };

  const t = (key: string): string => {
    return (translations[lang] as any)[key] || (translations["en"] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used inside LanguageProvider");
  return context;
}
