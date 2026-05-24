import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import FloatingCart from "@/components/FloatingCart";
import VisitantesOnline from "@/components/VisitantesOnline";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/contexts/LanguageContext";
import {
  ShoppingBag, Heart, Search, Truck, Shield, RotateCcw,
  Headphones, ChevronRight, Star, Zap, X,
  Flame, TrendingUp, Package, BadgeCheck,
  Clock, MapPin, CreditCard, Percent
} from "lucide-react";

interface Produto {
  id?: string;
  nome: string;
  nomeEn: string;
  descricao: string;
  descricaoEn: string;
  imagem: string;
  whatsapp: string;
  afiliado: string;
  tipo: "entrega" | "online";
  isMostSold?: boolean;
  unitsLeft?: number;
  preco?: number;
  precoOriginal?: number;
  categoria?: string;
  categoriaEn?: string;
  desconto?: number;
}

const produtos: Produto[] = [
  { id: "1", nome: "Resina Extreme Automotiva", nomeEn: "Extreme Automotive Resin", descricao: "Resina auto brilho finalizador 500ml. Proteção máxima e brilho incomparável para seu carro.", descricaoEn: "Auto gloss resin 500ml. Maximum protection and incomparable shine for your car.", imagem: "https://i.ibb.co/whQ8XsvY/676241131-1481905673489846-2916311791656238816-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", tipo: "entrega", isMostSold: true, unitsLeft: 5, preco: 89.99, precoOriginal: 129.99, desconto: 31, categoria: "Automotivo", categoriaEn: "Automotive" },
  { id: "2", nome: "Pistola Massageadora", nomeEn: "Massage Gun", descricao: "Pistola de massagem profissional com 4 cabeças intercambiáveis e cabo USB.", descricaoEn: "Professional massage gun with 4 interchangeable heads and USB cable.", imagem: "https://i.ibb.co/jXXgg4S/676074914-3904377783199919-7370801944526901153-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", tipo: "entrega", isMostSold: true, unitsLeft: 8, preco: 79.99, precoOriginal: 119.99, desconto: 33, categoria: "Saúde", categoriaEn: "Health" },
  { id: "3", nome: "Clareador de Manchas AmazoLé", nomeEn: "AmazoLé Skin Brightener", descricao: "Esfoliante clareador que limpa e uniformiza o tom da pele.", descricaoEn: "Brightening exfoliant that cleanses and evens skin tone. Fights melasma and dark spots.", imagem: "https://i.ibb.co/vvvxyvpM/661731367-730205876750039-6015324742804877210-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-gya94-0", tipo: "entrega", unitsLeft: 6, preco: 120.00, precoOriginal: 159.99, desconto: 25, categoria: "Beleza", categoriaEn: "Beauty" },
  { id: "4", nome: "Relógio Masculino Original", nomeEn: "Original Men's Watch", descricao: "Relógio masculino premium estilo Invicta, dourado, resistente e elegante.", descricaoEn: "Premium men's watch Invicta style, gold, resistant and elegant.", imagem: "https://i.ibb.co/4gTxSQkX/download-1.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-osr5n-0", tipo: "entrega", isMostSold: true, unitsLeft: 3, preco: 85.00, precoOriginal: 120.00, desconto: 29, categoria: "Moda", categoriaEn: "Fashion" },
  { id: "5", nome: "Relógio Esportivo LED Unissex", nomeEn: "LED Sports Watch Unisex", descricao: "Relógio digital LED resistente à água, moderno e estiloso.", descricaoEn: "Water-resistant LED digital watch, modern and stylish for any occasion.", imagem: "https://i.ibb.co/v4HBjm8t/download.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-zbnq9-0", tipo: "entrega", unitsLeft: 15, preco: 20.00, precoOriginal: 35.00, desconto: 43, categoria: "Moda", categoriaEn: "Fashion" },
  { id: "6", nome: "Fone de Ouvido Bluetooth TWS", nomeEn: "TWS Bluetooth Earbuds", descricao: "Fone A6S Pro MiPods sem fio, conexão Bluetooth, case carregador incluso.", descricaoEn: "A6S Pro MiPods wireless earbuds, Bluetooth, charging case included.", imagem: "https://i.ibb.co/T9Xgdxp/666104100-1387351060086173-8195611779606541336-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-yvlif-0", tipo: "entrega", isMostSold: true, unitsLeft: 10, preco: 49.99, precoOriginal: 79.99, desconto: 38, categoria: "Eletrônicos", categoriaEn: "Electronics" },
  { id: "7", nome: "Redutor de Conta de Água", nomeEn: "Water Bill Reducer", descricao: "Economizare: redutor de consumo que economiza até 50% na sua conta de água.", descricaoEn: "Economizare: consumption reducer that saves up to 50% on your water bill.", imagem: "https://i.ibb.co/0ph8jSww/676709830-1237086445080329-2628572986454454748-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-uukmi-0", tipo: "entrega", unitsLeft: 4, preco: 149.99, precoOriginal: 199.99, desconto: 25, categoria: "Casa", categoriaEn: "Home" },
  { id: "8", nome: "Kit Completo Churrasco", nomeEn: "Complete BBQ Kit", descricao: "Kit profissional com 20+ utensílios de aço inox para churrasco perfeito.", descricaoEn: "Professional kit with 20+ stainless steel utensils for the perfect BBQ.", imagem: "https://i.ibb.co/xwTbkw2/162506261569e7cc5014170277754387iwy320260421161320.webp", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-b5zsk-0", tipo: "entrega", unitsLeft: 7, preco: 148.98, precoOriginal: 199.99, desconto: 26, categoria: "Casa", categoriaEn: "Home" },
  { id: "9", nome: "Kit Massagem EMS", nomeEn: "EMS Massage Kit", descricao: "Kit com tapete e almofada massageadora EMS para pés e corpo.", descricaoEn: "Kit with EMS massage mat and cushion for feet and body. Pain relief.", imagem: "https://i.ibb.co/DH5fpkNC/53455382469e7d3b43406d842267824fijs20260421164452.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-it3g9-0", tipo: "entrega", unitsLeft: 9, preco: 69.98, precoOriginal: 99.99, desconto: 30, categoria: "Saúde", categoriaEn: "Health" },
  { id: "10", nome: "Kit Ferramentas 46 Peças", nomeEn: "46-Piece Tool Kit", descricao: "Jogo de soquetes e chaves com maleta, 46 peças em aço inox.", descricaoEn: "Socket and wrench set with case, 46 pieces in high-strength stainless steel.", imagem: "https://i.ibb.co/v4nBw8KJ/155772289669e7d82956f83261100227bhtj20260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-yeqi9-0", tipo: "entrega", isMostSold: true, unitsLeft: 6, preco: 78.99, precoOriginal: 109.99, desconto: 28, categoria: "Ferramentas", categoriaEn: "Tools" },
  { id: "11", nome: "Escova a Vapor para Pets", nomeEn: "Pet Steam Brush", descricao: "Escova vaporizadora que limpa, hidrata e remove pelos soltos do seu pet.", descricaoEn: "Steam brush that cleans, hydrates and removes loose hair from your pet.", imagem: "https://i.ibb.co/KzqFrdYt/20680304269e7d829dd8804019041787kd520260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-nu0kw-0", tipo: "entrega", unitsLeft: 12, preco: 49.99, precoOriginal: 79.99, desconto: 38, categoria: "Pets", categoriaEn: "Pets" },
  { id: "12", nome: "Luminária Mata Mosquito", nomeEn: "Mosquito Killer Lamp", descricao: "Armadilha elétrica UV que elimina mosquitos e insetos silenciosamente.", descricaoEn: "UV electric trap that silently eliminates mosquitoes and insects. USB rechargeable.", imagem: "https://i.ibb.co/fVp4Q4sh/163632907569e7d82a21d1b313631554w0fx20260421170354.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-fdmva-0", tipo: "entrega", unitsLeft: 8, preco: 54.98, precoOriginal: 79.99, desconto: 31, categoria: "Casa", categoriaEn: "Home" },
  { id: "13", nome: "Câmera Lâmpada 360° IP", nomeEn: "360° IP Bulb Camera", descricao: "Câmera de segurança em formato de lâmpada, 360°, visão noturna.", descricaoEn: "Security camera in bulb format, 360°, night vision and mobile access.", imagem: "https://i.ibb.co/wZmz8Wpx/662525763-1261853449409138-4287481202985656184-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-v0gpl-0", tipo: "entrega", isMostSold: true, unitsLeft: 4, preco: 120.00, precoOriginal: 169.99, desconto: 29, categoria: "Segurança", categoriaEn: "Security" },
  { id: "14", nome: "Short Feminino Empina Bumbum", nomeEn: "Women's Lifting Shorts", descricao: "Short fitness modelador de cintura alta, tecido premium com compressão.", descricaoEn: "High-waist shaping fitness shorts, premium compression fabric and comfort.", imagem: "https://i.ibb.co/fd7JL2pM/663130907-943555138078111-1681655744055148382-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-j7ugp-0", tipo: "entrega", unitsLeft: 20, preco: 45.00, precoOriginal: 69.99, desconto: 36, categoria: "Moda", categoriaEn: "Fashion" },
];

const categoriasPt = ["Todos","Automotivo","Saúde","Beleza","Moda","Eletrônicos","Casa","Ferramentas","Pets","Segurança"];
const categoriasEn = ["All","Automotive","Health","Beauty","Fashion","Electronics","Home","Tools","Pets","Security"];
const categoriasEmoji = ["🛍️","🚗","💪","💄","👗","📱","🏠","🔧","🐾","🔒"];

const notificacoes = [
  { nome: "João S.", cidade: "São Paulo", produto: "Resina Extreme", produtoEn: "Extreme Resin" },
  { nome: "Ana L.", cidade: "Rio de Janeiro", produto: "Pistola Massageadora", produtoEn: "Massage Gun" },
  { nome: "Carlos M.", cidade: "Fortaleza", produto: "Fone Bluetooth", produtoEn: "Bluetooth Earbuds" },
  { nome: "Maria F.", cidade: "Manaus", produto: "Relógio Masculino", produtoEn: "Men's Watch" },
  { nome: "Pedro R.", cidade: "Brasília", produto: "Kit Ferramentas", produtoEn: "Tool Kit" },
  { nome: "John D.", cidade: "London", produto: "Massage Gun", produtoEn: "Massage Gun" },
  { nome: "Emma W.", cidade: "Paris", produto: "LED Watch", produtoEn: "LED Watch" },
  { nome: "James K.", cidade: "New York", produto: "BBQ Kit", produtoEn: "BBQ Kit" },
];

export default function Home() {
  const { lang, t } = useLang();
  const [filtro, setFiltro] = useState<"todos" | "entrega" | "online">("todos");
  const [faqCategory, setFaqCategory] = useState<"todos" | "frete" | "devolucoes" | "pagamentos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0); // index
  const [tempo, setTempo] = useState({ horas: 2, minutos: 30, segundos: 0 });
  const [bannerAtual, setBannerAtual] = useState(0);
  const [notifVisivel, setNotifVisivel] = useState(false);
  const [notifAtual, setNotifAtual] = useState(notificacoes[0]);
  const [cookieVisivel, setCookieVisivel] = useState(false);
  const [visitantes, setVisitantes] = useState(Math.floor(Math.random() * 30) + 25);

  const categorias = lang === "en" ? categoriasEn : categoriasPt;
  const selectedCategoryName = categorias[selectedCategory];

  useEffect(() => {
    const timer = setInterval(() => {
      setTempo((prev) => {
        if (prev.segundos > 0) return { ...prev, segundos: prev.segundos - 1 };
        if (prev.minutos > 0) return { ...prev, minutos: prev.minutos - 1, segundos: 59 };
        if (prev.horas > 0) return { horas: prev.horas - 1, minutos: 59, segundos: 59 };
        return { horas: 2, minutos: 30, segundos: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerAtual((p) => (p + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const mostrar = () => {
      const item = notificacoes[Math.floor(Math.random() * notificacoes.length)];
      setNotifAtual(item);
      setNotifVisivel(true);
      setTimeout(() => setNotifVisivel(false), 5000);
    };
    const timer = setTimeout(mostrar, 4000);
    const intervalo = setInterval(mostrar, 12000);
    return () => { clearTimeout(timer); clearInterval(intervalo); };
  }, []);

  useEffect(() => {
    const aceito = localStorage.getItem("cookies-aceitos");
    if (!aceito) setCookieVisivel(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitantes((prev) => Math.max(18, Math.min(99, prev + Math.floor(Math.random() * 5) - 2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const banners = [
    { badge: t("banner.badge1"), titulo: t("banner.title1"), sub: t("banner.sub1"), cor: "from-orange-600 to-red-500", emoji: "🔥" },
    { badge: t("banner.badge2"), titulo: t("banner.title2"), sub: t("banner.sub2"), cor: "from-blue-600 to-blue-400", emoji: "🚚" },
    { badge: t("banner.badge3"), titulo: t("banner.title3"), sub: t("banner.sub3"), cor: "from-green-600 to-emerald-400", emoji: "💸" },
  ];

  const faqItems = lang === "en" ? [
    { id: "s1", category: "frete" as const, question: "What is the delivery time?", answer: "Delivery time varies from 3 to 7 business days depending on your location." },
    { id: "s2", category: "frete" as const, question: "Do you deliver worldwide?", answer: "Yes! We deliver worldwide. Guaranteed delivery with full tracking." },
    { id: "s3", category: "frete" as const, question: "Is shipping free?", answer: "Yes! Free shipping on all orders." },
    { id: "r1", category: "devolucoes" as const, question: "What is the return policy?", answer: "You have 30 days after receiving to request a return, no questions asked." },
    { id: "r2", category: "devolucoes" as const, question: "How do I return a product?", answer: "Contact us via WhatsApp with a photo of the product and the reason for return." },
    { id: "p1", category: "pagamentos" as const, question: "What payment methods are accepted?", answer: "We accept credit/debit cards, PayPal, and bank transfer." },
    { id: "p2", category: "pagamentos" as const, question: "Is it safe to pay by card?", answer: "Yes! We use SSL certified security systems." },
  ] : [
    { id: "frete-1", category: "frete" as const, question: "Qual é o prazo de entrega?", answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização." },
    { id: "frete-2", category: "frete" as const, question: "Vocês entregam em todo o Brasil?", answer: "Sim! Entregamos em todo o Brasil com rastreamento completo." },
    { id: "frete-3", category: "frete" as const, question: "O frete é cobrado à parte?", answer: "Não! Frete grátis em todos os pedidos." },
    { id: "dev-1", category: "devolucoes" as const, question: "Qual é a política de devolução?", answer: "Você tem até 30 dias após o recebimento para solicitar devolução, sem perguntas." },
    { id: "dev-2", category: "devolucoes" as const, question: "Como faço para devolver um produto?", answer: "Entre em contato pelo WhatsApp com a foto do produto e o motivo." },
    { id: "pag-1", category: "pagamentos" as const, question: "Quais são as formas de pagamento?", answer: "Oferecemos Pagamento na Entrega e Compra Online (cartão, débito ou transferência)." },
    { id: "pag-2", category: "pagamentos" as const, question: "É seguro pagar com cartão?", answer: "Sim! Utilizamos os melhores sistemas de segurança com certificação SSL." },
  ];

  const testimonials = [
    { name: "Marina Silva", role: lang === "en" ? "Verified Customer" : "Cliente Verificada", comment: lang === "en" ? "Loved it! Product arrived fast and well packed. Highly recommend GVP Ofertas BR!" : "Adorei a compra! Produto chegou rápido e bem embalado. Recomendo muito!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer1-6p29GDCTknEFnJrg6FCqBH.webp" },
    { name: "Carlos Mendes", role: lang === "en" ? "Verified Customer" : "Cliente Verificado", comment: lang === "en" ? "Best price I found! WhatsApp support was very fast and efficient." : "Melhor preço que encontrei! Atendimento pelo WhatsApp foi muito rápido.", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer2-RBgD9Kz8KeVV3iGg96SzWg.webp" },
    { name: "Juliana Costa", role: lang === "en" ? "Verified Customer" : "Cliente Verificada", comment: lang === "en" ? "Bought 3 times already! Always perfect quality and good prices." : "Comprei 3 vezes já! Sempre com qualidade, preço bom e entrega garantida.", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer3-SkdhFw42f6sHoAvf4JHofq.webp" },
    { name: "John D.", role: lang === "en" ? "Verified Customer" : "Cliente Verificado", comment: lang === "en" ? "Amazing product, fast international delivery. Will buy again for sure!" : "Produto incrível, entrega internacional rápida. Vou comprar de novo!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer4-T6VaW6fiCFZKDSR4tFG5rf.webp" },
    { name: "Emma W.", role: lang === "en" ? "Verified Customer" : "Cliente Verificada", comment: lang === "en" ? "Delivery right to my door, no complications. Trustworthy store!" : "Entrega na minha porta, sem complicações. Loja confiável!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer5-4A4uGaqn9B6MgeqVGUvsoH.webp" },
  ];

  const produtosFiltrados = produtos.filter((p) => {
    if (filtro !== "todos" && p.tipo !== filtro) return false;
    const nome = lang === "en" ? p.nomeEn : p.nome;
    const desc = lang === "en" ? p.descricaoEn : p.descricao;
    const cat = lang === "en" ? (p.categoriaEn || "") : (p.categoria || "");
    if (searchQuery && !nome.toLowerCase().includes(searchQuery.toLowerCase()) && !desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== 0 && cat !== selectedCategoryName) return false;
    return true;
  });

  const maiVendidos = produtos.filter((p) => p.isMostSold);
  const b = banners[bannerAtual];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-white/20 p-1.5 rounded-xl">
                <ShoppingBag className="text-white" size={22} />
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-white text-lg leading-none block">GVP Ofertas</span>
                <span className="text-orange-200 text-[10px] leading-none">{t("header.tagline")}</span>
              </div>
            </div>
            <div className="flex-1 flex items-center bg-white rounded-xl overflow-hidden shadow-sm border border-orange-300">
              <input type="text" placeholder={t("header.search")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700" />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2.5 transition-colors">
                <Search size={16} className="text-white" />
              </button>
            </div>
            {/* SELETOR DE IDIOMA */}
            <LanguageSwitcher />
            <button onClick={() => window.location.href = "/favoritos"} className="shrink-0 flex flex-col items-center text-white hover:text-orange-200 transition-colors">
              <Heart size={20} className="fill-white" />
              <span className="text-[10px] hidden sm:block">{t("header.favorites")}</span>
            </button>
          </div>
        </div>
        <div className="bg-orange-600 border-t border-orange-400">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2">
              {[{ key: "todos", label: t("header.all") }, { key: "entrega", label: t("header.delivery") }, { key: "online", label: t("header.online") }].map(({ key, label }) => (
                <button key={key} onClick={() => setFiltro(key as any)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filtro === key ? "bg-white text-orange-500 shadow" : "text-white hover:bg-orange-500"}`}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* BARRA DE CONFIANÇA */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-start sm:justify-around py-3 overflow-x-auto gap-4">
            {[
              { icon: <Truck size={18} className="text-orange-500" />, titulo: t("trust.delivery"), sub: t("trust.delivery.sub") },
              { icon: <Shield size={18} className="text-green-500" />, titulo: t("trust.secure"), sub: t("trust.secure.sub") },
              { icon: <RotateCcw size={18} className="text-blue-500" />, titulo: t("trust.guarantee"), sub: t("trust.guarantee.sub") },
              { icon: <Headphones size={18} className="text-purple-500" />, titulo: t("trust.support"), sub: t("trust.support.sub") },
              { icon: <CreditCard size={18} className="text-indigo-500" />, titulo: t("trust.payment"), sub: t("trust.payment.sub") },
              { icon: <Percent size={18} className="text-red-500" />, titulo: t("trust.discount"), sub: t("trust.discount.sub") },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0 min-w-[70px]">
                <div className="bg-gray-50 p-2.5 rounded-xl">{item.icon}</div>
                <span className="text-xs font-bold text-gray-700 text-center whitespace-nowrap">{item.titulo}</span>
                <span className="text-[10px] text-gray-400 text-center">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIAS */}
      <div className="bg-white mt-2 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categorias.map((cat, i) => (
              <button key={cat} onClick={() => setSelectedCategory(i)} className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${selectedCategory === i ? "bg-orange-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}>
                <span className="text-base">{categoriasEmoji[i]}</span>
                <span className="text-[11px] font-semibold whitespace-nowrap">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">
        {/* BANNER */}
        <div className={`bg-gradient-to-r ${b.cor} rounded-2xl p-5 mb-4 shadow-lg relative overflow-hidden`}>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">{b.emoji}</div>
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">{b.badge}</span>
          <h2 className="text-white font-black text-2xl">{b.titulo}</h2>
          <p className="text-white/80 text-sm mt-1">{b.sub}</p>
          <div className="flex gap-1 mt-3">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setBannerAtual(i)} className={`h-1.5 rounded-full transition-all ${i === bannerAtual ? "bg-white w-6" : "bg-white/40 w-2"}`} />
            ))}
          </div>
        </div>

        {/* CONTADOR */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-4 mb-3 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Zap size={22} className="text-yellow-300 fill-yellow-300" />
              <div>
                <div className="text-white font-black text-lg">{t("timer.title")}</div>
                <div className="text-white/80 text-xs">{t("timer.sub")}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-white/80" />
              <span className="text-white text-xs font-semibold">{t("timer.ends")}</span>
              <div className="flex items-center gap-1">
                {[tempo.horas, tempo.minutos, tempo.segundos].map((val, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="bg-black/30 text-white font-black text-lg px-3 py-2 rounded-xl min-w-10 text-center">{String(val).padStart(2, "0")}</span>
                    {i < 2 && <span className="text-white font-black text-xl">:</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* VISITANTES ONLINE */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 w-fit mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
          <span className="text-xs font-bold text-green-700">{visitantes} {t("visitors.online")}</span>
        </div>

        {/* SELOS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[
            { icon: <BadgeCheck size={16} className="text-green-600" />, texto: t("seal.verified"), bg: "bg-green-50 border-green-200" },
            { icon: <Shield size={16} className="text-blue-600" />, texto: t("seal.secure"), bg: "bg-blue-50 border-blue-200" },
            { icon: <Package size={16} className="text-orange-600" />, texto: t("seal.tracked"), bg: "bg-orange-50 border-orange-200" },
            { icon: <Star size={16} className="text-yellow-500 fill-yellow-500" />, texto: t("seal.rating"), bg: "bg-yellow-50 border-yellow-200" },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} border rounded-xl px-3 py-2 flex items-center gap-2`}>
              {s.icon}
              <span className="text-xs font-bold text-gray-700">{s.texto}</span>
            </div>
          ))}
        </div>

        {/* MAIS VENDIDOS */}
        {maiVendidos.length > 0 && selectedCategory === 0 && !searchQuery && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-orange-500 fill-orange-400" />
                <h2 className="text-base font-black text-gray-900">{t("products.bestsellers")}</h2>
              </div>
              <span className="text-xs text-orange-500 font-semibold bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={12} />{t("products.trending")}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {maiVendidos.map((produto, index) => (
                <ProductCard key={index} id={produto.id} nome={lang === "en" ? produto.nomeEn : produto.nome} descricao={lang === "en" ? produto.descricaoEn : produto.descricao} imagem={produto.imagem} whatsapp={produto.whatsapp} afiliado={produto.afiliado} tipo={produto.tipo} isMostSold={produto.isMostSold} unitsLeft={produto.unitsLeft} preco={produto.preco} categoria={lang === "en" ? produto.categoriaEn : produto.categoria} />
              ))}
            </div>
          </section>
        )}

        {selectedCategory === 0 && !searchQuery && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("products.all")}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-700">{produtosFiltrados.length} {t("products.found")}</h3>
          <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200">{t("products.free_shipping")}</span>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {produtosFiltrados.map((produto, index) => (
              <ProductCard key={index} id={produto.id} nome={lang === "en" ? produto.nomeEn : produto.nome} descricao={lang === "en" ? produto.descricaoEn : produto.descricao} imagem={produto.imagem} whatsapp={produto.whatsapp} afiliado={produto.afiliado} tipo={produto.tipo} isMostSold={produto.isMostSold} unitsLeft={produto.unitsLeft} preco={produto.preco} categoria={lang === "en" ? produto.categoriaEn : produto.categoria} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 font-semibold">{t("products.not_found")}</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory(0); }} className="mt-3 text-orange-500 text-sm underline">{t("products.clear")}</button>
          </div>
        )}

        {/* BANNER CTA */}
        <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white text-center sm:text-left">
              <div className="text-2xl font-black">{t("cta.title")}</div>
              <p className="text-white/80 text-sm mt-1">{t("cta.sub")}</p>
            </div>
            <a href={`https://wa.me/5596984224137?text=${encodeURIComponent(t("whatsapp.message"))}`} target="_blank" rel="noopener noreferrer" className="bg-white text-green-700 font-black px-6 py-3 rounded-xl text-sm hover:bg-green-50 transition-colors shrink-0 shadow">
              {t("cta.button")}
            </a>
          </div>
        </div>

        {/* AVALIAÇÕES */}
        <section className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">{t("reviews.title")}</h2>
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              <Star size={14} className="fill-orange-500 text-orange-500" />
              <span className="font-bold text-sm text-orange-600">4.9</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} name={testimonial.name} role={testimonial.role} comment={testimonial.comment} rating={testimonial.rating} image={testimonial.image} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100"><div className="text-2xl font-black text-orange-500">4.9★</div><p className="text-gray-500 text-xs mt-1">{t("reviews.avg")}</p></div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100"><div className="text-2xl font-black text-blue-500">5k+</div><p className="text-gray-500 text-xs mt-1">{t("reviews.clients")}</p></div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100"><div className="text-2xl font-black text-green-500">100%</div><p className="text-gray-500 text-xs mt-1">{t("reviews.guaranteed")}</p></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-4 bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h2 className="text-lg font-black text-gray-900 mb-4">{t("faq.title")}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {[{ key: "todos", label: t("faq.all"), color: "bg-orange-500" }, { key: "frete", label: t("faq.shipping"), color: "bg-blue-500" }, { key: "devolucoes", label: t("faq.returns"), color: "bg-green-500" }, { key: "pagamentos", label: t("faq.payments"), color: "bg-purple-500" }].map(({ key, label, color }) => (
              <button key={key} onClick={() => setFaqCategory(key as any)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${faqCategory === key ? `${color} text-white` : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{label}</button>
            ))}
          </div>
          <FAQAccordion items={faqCategory === "todos" ? faqItems : faqItems.filter((item) => item.category === faqCategory)} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white">
        <div className="bg-orange-500 py-3">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 text-white text-xs font-semibold">
            <span className="flex items-center gap-1"><Truck size={14} />{t("trust.delivery")}</span>
            <span className="flex items-center gap-1"><Shield size={14} />{t("trust.secure")}</span>
            <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-300 text-yellow-300" />4.9 ★</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} />{t("trust.guarantee")}</span>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-orange-500 p-2 rounded-xl"><ShoppingBag size={18} className="text-white" /></div>
                <span className="font-bold text-lg">GVP Ofertas BR</span>
              </div>
              <p className="text-gray-400 text-sm">{t("footer.desc")}</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-lg border border-green-500/30">✅ {t("seal.verified")}</span>
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-lg border border-blue-500/30">🔒 SSL</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-orange-400">{t("footer.info")}</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="/sobre" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />{t("footer.about")}</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />{t("footer.privacy")}</a></li>
                <li><a href="/termos" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />{t("footer.terms")}</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />{t("footer.blog")}</a></li>
                <li><a href="/rastreamento" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />{t("footer.track")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-orange-400">{t("footer.contact")}</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="https://wa.me/5596984224137" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-green-400">💬</span>{t("footer.whatsapp")}</a></li>
                <li><a href="mailto:contato@gvpofertasbr.com" className="hover:text-white transition-colors flex items-center gap-2"><span>📧</span>Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
            <p>{t("footer.rights")}</p>
          </div>
        </div>
      </footer>

      <FloatingCart />

      <button onClick={() => window.open(`https://wa.me/5596984224137?text=${encodeURIComponent(t("whatsapp.message"))}`, "_blank")} className="fixed bottom-24 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      {/* NOTIFICAÇÃO DE COMPRA */}
      {notifVisivel && (
        <div className="fixed bottom-28 left-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 max-w-[260px] flex items-center gap-3 animate-bounce">
          <div className="bg-green-500 rounded-full p-2 shrink-0"><ShoppingBag size={14} className="text-white" /></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 flex items-center gap-1"><MapPin size={10} className="text-orange-500" />{notifAtual.nome} · {notifAtual.cidade}</p>
            <p className="text-xs text-orange-500 font-semibold truncate">✅ {t("notif.bought_label")} {lang === "en" ? notifAtual.produtoEn : notifAtual.produto}</p>
            <p className="text-xs text-gray-400">{t("notif.bought")}</p>
          </div>
          <button onClick={() => setNotifVisivel(false)} className="text-gray-300 hover:text-gray-500 shrink-0"><X size={14} /></button>
        </div>
      )}

      {/* COOKIE BANNER */}
      {cookieVisivel && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-2xl">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-300 text-center sm:text-left">
              🍪 {lang === "en" ? "We use cookies to improve your experience." : "Usamos cookies para melhorar sua experiência."}{" "}
              <a href="/privacidade" className="text-orange-400 underline">{t("footer.privacy")}</a>
            </p>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { localStorage.setItem("cookies-aceitos", "true"); setCookieVisivel(false); }} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">{lang === "en" ? "Accept" : "Aceitar"}</button>
              <button onClick={() => setCookieVisivel(false)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">{lang === "en" ? "Decline" : "Recusar"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
