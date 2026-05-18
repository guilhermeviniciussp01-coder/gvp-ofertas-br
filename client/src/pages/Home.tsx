import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import FloatingCart from "@/components/FloatingCart";
import { ShoppingBag, Heart, Search, Truck, Shield, RotateCcw, Headphones, ChevronRight, Star, Zap, Gift, Tag, X } from "lucide-react";

interface Produto {
  id?: string;
  nome: string;
  descricao: string;
  imagem: string;
  whatsapp: string;
  afiliado: string;
  tipo: "entrega" | "online";
  isMostSold?: boolean;
  unitsLeft?: number;
  preco?: number;
  categoria?: string;
}

interface Testimonial {
  name: string;
  role?: string;
  comment: string;
  rating: number;
  image: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "frete" | "devolucoes" | "pagamentos";
}

const testimonials: Testimonial[] = [
  { name: "Marina Silva", role: "Cliente Verificada", comment: "Adorei a compra! Produto chegou rápido e bem embalado. Recomendo muito a GVP Ofertas BR!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer1-6p29GDCTknEFnJrg6FCqBH.webp" },
  { name: "Carlos Mendes", role: "Cliente Verificado", comment: "Melhor preço que encontrei! Atendimento pelo WhatsApp foi muito rápido e eficiente.", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer2-RBgD9Kz8KeVV3iGg96SzWg.webp" },
  { name: "Juliana Costa", role: "Cliente Verificada", comment: "Comprei 3 vezes já! Sempre com qualidade, preço bom e entrega garantida. Muito satisfeita!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer3-SkdhFw42f6sHoAvf4JHofq.webp" },
  { name: "Felipe Santos", role: "Cliente Verificado", comment: "Produto exatamente como descrito. Confiável demais! Vou continuar comprando aqui.", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer4-T6VaW6fiCFZKDSR4tFG5rf.webp" },
  { name: "Beatriz Oliveira", role: "Cliente Verificada", comment: "Entrega na minha porta, sem complicações. Loja confiável e com ótimos produtos!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer5-4A4uGaqn9B6MgeqVGUvsoH.webp" },
];

const produtos: Produto[] = [
  { id: "1", nome: "Resina Extreme Automotiva", descricao: "Resina auto brilho finalizador 500ml. Proteção máxima e brilho incomparável para seu carro.", imagem: "https://i.ibb.co/whQ8XsvY/676241131-1481905673489846-2916311791656238816-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", tipo: "entrega", isMostSold: true, unitsLeft: 5, preco: 89.99, categoria: "Automotivo" },
  { id: "2", nome: "Pistola Massageadora", descricao: "Pistola de massagem profissional com 4 cabeças intercambiáveis e cabo USB.", imagem: "https://i.ibb.co/jXXgg4S/676074914-3904377783199919-7370801944526901153-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", tipo: "entrega", isMostSold: true, unitsLeft: 8, preco: 79.99, categoria: "Saúde" },
  { id: "3", nome: "Clareador de Manchas AmazoLé", descricao: "Esfoliante clareador que limpa e uniformiza o tom da pele. Combate melasma e manchas.", imagem: "https://i.ibb.co/vvvxyvpM/661731367-730205876750039-6015324742804877210-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-gya94-0", tipo: "entrega", unitsLeft: 6, preco: 120.00, categoria: "Beleza" },
  { id: "4", nome: "Relógio Masculino Original", descricao: "Relógio masculino premium estilo Invicta, dourado, resistente e elegante.", imagem: "https://i.ibb.co/4gTxSQkX/download-1.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-osr5n-0", tipo: "entrega", isMostSold: true, unitsLeft: 3, preco: 85.00, categoria: "Moda" },
  { id: "5", nome: "Relógio Esportivo LED Unissex", descricao: "Relógio digital LED resistente à água, moderno e estiloso para qualquer ocasião.", imagem: "https://i.ibb.co/v4HBjm8t/download.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-zbnq9-0", tipo: "entrega", unitsLeft: 15, preco: 20.00, categoria: "Moda" },
  { id: "6", nome: "Fone de Ouvido Bluetooth TWS", descricao: "Fone A6S Pro MiPods sem fio, conexão Bluetooth, case carregador incluso.", imagem: "https://i.ibb.co/T9Xgdxp/666104100-1387351060086173-8195611779606541336-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-yvlif-0", tipo: "entrega", isMostSold: true, unitsLeft: 10, preco: 49.99, categoria: "Eletrônicos" },
  { id: "7", nome: "Redutor de Conta de Água", descricao: "Economizare: redutor de consumo que economiza até 50% na sua conta de água.", imagem: "https://i.ibb.co/0ph8jSww/676709830-1237086445080329-2628572986454454748-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-uukmi-0", tipo: "entrega", unitsLeft: 4, preco: 149.99, categoria: "Casa" },
  { id: "8", nome: "Kit Completo Churrasco", descricao: "Kit profissional com 20+ utensílios de aço inox para churrasco perfeito.", imagem: "https://i.ibb.co/xwTbkw2/162506261569e7cc5014170277754387iwy320260421161320.webp", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-b5zsk-0", tipo: "entrega", unitsLeft: 7, preco: 148.98, categoria: "Casa" },
  { id: "9", nome: "Kit Massagem EMS", descricao: "Kit com tapete e almofada massageadora EMS para pés e corpo. Alívio de dores.", imagem: "https://i.ibb.co/DH5fpkNC/53455382469e7d3b43406d842267824fijs20260421164452.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-it3g9-0", tipo: "entrega", unitsLeft: 9, preco: 69.98, categoria: "Saúde" },
  { id: "10", nome: "Kit Ferramentas 46 Peças", descricao: "Jogo de soquetes e chaves com maleta, 46 peças em aço inox de alta resistência.", imagem: "https://i.ibb.co/v4nBw8KJ/155772289669e7d82956f83261100227bhtj20260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-yeqi9-0", tipo: "entrega", isMostSold: true, unitsLeft: 6, preco: 78.99, categoria: "Ferramentas" },
  { id: "11", nome: "Escova a Vapor para Pets", descricao: "Escova vaporizadora que limpa, hidrata e remove pelos soltos do seu pet com facilidade.", imagem: "https://i.ibb.co/KzqFrdYt/20680304269e7d829dd8804019041787kd520260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-nu0kw-0", tipo: "entrega", unitsLeft: 12, preco: 49.99, categoria: "Pets" },
  { id: "12", nome: "Luminária Mata Mosquito", descricao: "Armadilha elétrica UV que elimina mosquitos e insetos silenciosamente. Recarregável USB.", imagem: "https://i.ibb.co/fVp4Q4sh/163632907569e7d82a21d1b313631554w0fx20260421170354.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-fdmva-0", tipo: "entrega", unitsLeft: 8, preco: 54.98, categoria: "Casa" },
  { id: "13", nome: "Câmera Lâmpada 360° IP", descricao: "Câmera de segurança em formato de lâmpada, 360°, visão noturna e acesso pelo celular.", imagem: "https://i.ibb.co/wZmz8Wpx/662525763-1261853449409138-4287481202985656184-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-v0gpl-0", tipo: "entrega", isMostSold: true, unitsLeft: 4, preco: 120.00, categoria: "Segurança" },
  { id: "14", nome: "Short Feminino Empina Bumbum", descricao: "Short fitness modelador de cintura alta, tecido premium com compressão e conforto.", imagem: "https://i.ibb.co/fd7JL2pM/663130907-943555138078111-1681655744055148382-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-j7ugp-0", tipo: "entrega", unitsLeft: 20, preco: 45.00, categoria: "Moda" },
  { id: "15", nome: "Creme Hidratante Corporal", descricao: "Hidratante intensivo com vitamina E e aloe vera. Pele macia e nutrida o dia todo.", imagem: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop", whatsapp: "https://wa.me/5596984224137", afiliado: "https://wa.me/5596984224137", tipo: "entrega", unitsLeft: 15, preco: 35.00, categoria: "Beleza" },
  { id: "16", nome: "Mochila Impermeável Esportiva", descricao: "Mochila 30L impermeável com USB charging port. Ideal para trabalho e viagens.", imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", whatsapp: "https://wa.me/5596984224137", afiliado: "https://wa.me/5596984224137", tipo: "entrega", isMostSold: true, unitsLeft: 7, preco: 89.90, categoria: "Moda" },
  { id: "17", nome: "Purificador de Ar USB", descricao: "Purificador portátil com filtro HEPA. Remove 99% das partículas do ar.", imagem: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop", whatsapp: "https://wa.me/5596984224137", afiliado: "https://wa.me/5596984224137", tipo: "entrega", unitsLeft: 10, preco: 79.90, categoria: "Casa" },
  { id: "18", nome: "Tapete Yoga Antiderrapante", descricao: "Tapete 6mm de espessura, antiderrapante, com alça de transporte. Ideal para yoga e pilates.", imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", whatsapp: "https://wa.me/5596984224137", afiliado: "https://wa.me/5596984224137", tipo: "entrega", unitsLeft: 18, preco: 59.90, categoria: "Saúde" },
  { id: "19", nome: "Luminária LED de Mesa", descricao: "Luminária com 3 modos de luz, dimmer e carregador USB integrado. Perfeita para estudos.", imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", whatsapp: "https://wa.me/5596984224137", afiliado: "https://wa.me/5596984224137", tipo: "entrega", unitsLeft: 9, preco: 69.90, categoria: "Casa" },
  { id: "20", nome: "Tênis Esportivo Unissex", descricao: "Tênis leve e confortável para corrida e treino. Solado antiderrapante e palmilha anatômica.", imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", whatsapp: "https://wa.me/5596984224137", afiliado: "https://wa.me/5596984224137", tipo: "entrega", isMostSold: true, unitsLeft: 12, preco: 119.90, categoria: "Moda" },
];

const faqItems: FAQItem[] = [
  { id: "frete-1", category: "frete", question: "Qual é o prazo de entrega?", answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização e do tipo de pagamento escolhido." },
  { id: "frete-2", category: "frete", question: "Vocês entregam em todo o Brasil?", answer: "Sim! Entregamos em todo o Brasil, incluindo regiões remotas. Oferecemos entrega garantida com rastreamento completo." },
  { id: "frete-3", category: "frete", question: "O frete é cobrado à parte?", answer: "Para compras via WhatsApp, o frete é combinado diretamente com nosso atendente." },
  { id: "devolucoes-1", category: "devolucoes", question: "Qual é a política de devolução?", answer: "Você tem até 30 dias após o recebimento do produto para solicitar devolução, sem perguntas." },
  { id: "devolucoes-2", category: "devolucoes", question: "Como faço para devolver um produto?", answer: "Entre em contato conosco pelo WhatsApp com a foto do produto e o motivo da devolução." },
  { id: "devolucoes-3", category: "devolucoes", question: "Quanto tempo leva para receber o reembolso?", answer: "O reembolso é processado em até 5 dias úteis após recebermos o produto devolvido." },
  { id: "pagamentos-1", category: "pagamentos", question: "Quais são as formas de pagamento?", answer: "Oferecemos Pagamento na Entrega e Compra Online (cartão de crédito, débito ou transferência)." },
  { id: "pagamentos-2", category: "pagamentos", question: "É seguro pagar com cartão?", answer: "Sim! Utilizamos os melhores sistemas de segurança do mercado com certificação SSL." },
  { id: "pagamentos-3", category: "pagamentos", question: "Posso parcelar a compra?", answer: "Sim! Oferecemos parcelamento em até 12x sem juros para compras acima de R$ 100." },
];

const categorias = [
  { nome: "Todos", emoji: "🛍️" },
  { nome: "Automotivo", emoji: "🚗" },
  { nome: "Saúde", emoji: "💪" },
  { nome: "Beleza", emoji: "💄" },
  { nome: "Moda", emoji: "👗" },
  { nome: "Eletrônicos", emoji: "📱" },
  { nome: "Casa", emoji: "🏠" },
  { nome: "Ferramentas", emoji: "🔧" },
  { nome: "Pets", emoji: "🐾" },
  { nome: "Segurança", emoji: "🔒" },
];

const notificacoes = [
  { nome: "João S.", cidade: "São Paulo", produto: "Resina Extreme Automotiva" },
  { nome: "Ana L.", cidade: "Rio de Janeiro", produto: "Pistola Massageadora" },
  { nome: "Carlos M.", cidade: "Fortaleza", produto: "Fone Bluetooth TWS" },
  { nome: "Maria F.", cidade: "Manaus", produto: "Relógio Masculino Original" },
  { nome: "Pedro R.", cidade: "Brasília", produto: "Kit Ferramentas 46 Peças" },
  { nome: "Lucia T.", cidade: "Salvador", produto: "Câmera Lâmpada 360°" },
  { nome: "Rafael B.", cidade: "Belém", produto: "Kit Massagem EMS" },
  { nome: "Fernanda C.", cidade: "Curitiba", produto: "Clareador AmazoLé" },
  { nome: "Diego A.", cidade: "Recife", produto: "Luminária Mata Mosquito" },
  { nome: "Camila P.", cidade: "Porto Alegre", produto: "Short Empina Bumbum" },
];

function NotificacaoCompra() {
  const [visivel, setVisivel] = useState(false);
  const [atual, setAtual] = useState(notificacoes[0]);

  useEffect(() => {
    const mostrar = () => {
      const item = notificacoes[Math.floor(Math.random() * notificacoes.length)];
      setAtual(item);
      setVisivel(true);
      setTimeout(() => setVisivel(false), 5000);
    };
    const timer = setTimeout(mostrar, 4000);
    const intervalo = setInterval(mostrar, 12000);
    return () => { clearTimeout(timer); clearInterval(intervalo); };
  }, []);

  if (!visivel) return null;

  return (
    <div className="fixed bottom-24 left-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 max-w-xs flex items-center gap-3 animate-bounce">
      <div className="bg-orange-500 rounded-full p-2 shrink-0">
        <ShoppingBag size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-900">{atual.nome} de {atual.cidade}</p>
        <p className="text-xs text-orange-500 font-semibold truncate">Comprou: {atual.produto}</p>
        <p className="text-xs text-gray-400">agora mesmo 🔥</p>
      </div>
      <button onClick={() => setVisivel(false)} className="text-gray-300 hover:text-gray-500 shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}
function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aceito = localStorage.getItem("cookies-aceitos");
    if (!aceito) setVisivel(true);
  }, []);

  if (!visivel) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-2xl">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          🍪 Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
          <button onClick={() => window.location.href = "/privacidade"} className="text-orange-400 underline">Política de Privacidade</button>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => { localStorage.setItem("cookies-aceitos", "true"); setVisivel(false); }} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Aceitar</button>
          <button onClick={() => setVisivel(false)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Recusar</button>
        </div>
      </div>
    </div>
  );
}
function ContadorOferta() {
  const [tempo, setTempo] = useState({ horas: 2, minutos: 30, segundos: 0 });

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

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-4 mb-4 shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Zap size={22} className="text-yellow-300 fill-yellow-300" />
          <div>
            <div className="text-white font-black text-lg">⚡ Oferta Relâmpago!</div>
            <div className="text-white/80 text-xs">Preços especiais por tempo limitado</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-semibold">Termina em:</span>
          <div className="flex items-center gap-1">
            <div className="bg-black/30 text-white font-black text-lg px-3 py-2 rounded-xl min-w-10 text-center">{String(tempo.horas).padStart(2, "0")}</div>
            <span className="text-white font-black text-xl">:</span>
            <div className="bg-black/30 text-white font-black text-lg px-3 py-2 rounded-xl min-w-10 text-center">{String(tempo.minutos).padStart(2, "0")}</div>
            <span className="text-white font-black text-xl">:</span>
            <div className="bg-black/30 text-white font-black text-lg px-3 py-2 rounded-xl min-w-10 text-center">{String(tempo.segundos).padStart(2, "0")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  const [filtro, setFiltro] = useState<"todos" | "entrega" | "online">("todos");
  const [faqCategory, setFaqCategory] = useState<"todos" | "frete" | "devolucoes" | "pagamentos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const produtosFiltrados = produtos.filter((p) => {
    if (filtro !== "todos" && p.tipo !== filtro) return false;
    if (searchQuery && !p.nome.toLowerCase().includes(searchQuery.toLowerCase()) && !p.descricao.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== "Todos" && p.categoria !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <ShoppingBag className="text-white" size={28} />
              <span className="font-black text-white text-xl hidden sm:block">GVP Ofertas</span>
            </div>
            <div className="flex-1 flex items-center bg-white rounded-full overflow-hidden shadow-sm">
              <input type="text" placeholder="Buscar produtos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700" />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2.5 transition-colors">
                <Search size={18} className="text-white" />
              </button>
            </div>
            <button onClick={() => window.location.href = "/favoritos"} className="shrink-0 flex flex-col items-center text-white hover:text-orange-200 transition-colors">
              <Heart size={22} className="fill-white" />
              <span className="text-xs hidden sm:block">Favoritos</span>
            </button>
          </div>
        </div>
        <div className="bg-orange-600 border-t border-orange-400">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2">
              <button onClick={() => setFiltro("todos")} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filtro === "todos" ? "bg-white text-orange-500" : "text-white hover:bg-orange-500"}`}>Todos</button>
              <button onClick={() => setFiltro("entrega")} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filtro === "entrega" ? "bg-white text-orange-500" : "text-white hover:bg-orange-500"}`}>🚚 Pag. na Entrega</button>
              <button onClick={() => setFiltro("online")} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filtro === "online" ? "bg-white text-orange-500" : "text-white hover:bg-orange-500"}`}>💳 Compra Online</button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={20} className="fill-yellow-300 text-yellow-300" />
                <span className="text-sm font-semibold bg-yellow-400 text-orange-900 px-2 py-0.5 rounded-full">OFERTAS DO DIA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Melhores Preços</h2>
              <p className="text-white/80 text-sm mb-4">Pagamento na entrega disponível!</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1"><Truck size={12} />Frete Grátis</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1"><Shield size={12} />Compra Segura</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1"><RotateCcw size={12} />30 dias garantia</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white"><div className="text-2xl font-black">5k+</div><div className="text-xs">Clientes</div></div>
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white"><div className="text-2xl font-black">4.9★</div><div className="text-xs">Avaliação</div></div>
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white"><div className="text-2xl font-black">20+</div><div className="text-xs">Produtos</div></div>
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white"><div className="text-2xl font-black">100%</div><div className="text-xs">Garantido</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4 overflow-x-auto gap-4">
            <div className="flex flex-col items-center gap-1 shrink-0"><div className="bg-orange-100 p-3 rounded-full"><Truck size={20} className="text-orange-500" /></div><span className="text-xs text-gray-600 font-medium">Entrega Rápida</span></div>
            <div className="flex flex-col items-center gap-1 shrink-0"><div className="bg-green-100 p-3 rounded-full"><Shield size={20} className="text-green-500" /></div><span className="text-xs text-gray-600 font-medium">Compra Segura</span></div>
            <div className="flex flex-col items-center gap-1 shrink-0"><div className="bg-blue-100 p-3 rounded-full"><RotateCcw size={20} className="text-blue-500" /></div><span className="text-xs text-gray-600 font-medium">30 Dias</span></div>
            <div className="flex flex-col items-center gap-1 shrink-0"><div className="bg-purple-100 p-3 rounded-full"><Headphones size={20} className="text-purple-500" /></div><span className="text-xs text-gray-600 font-medium">Suporte 24/7</span></div>
            <div className="flex flex-col items-center gap-1 shrink-0"><div className="bg-yellow-100 p-3 rounded-full"><Gift size={20} className="text-yellow-500" /></div><span className="text-xs text-gray-600 font-medium">Promoções</span></div>
            <div className="flex flex-col items-center gap-1 shrink-0"><div className="bg-red-100 p-3 rounded-full"><Tag size={20} className="text-red-500" /></div><span className="text-xs text-gray-600 font-medium">Melhores Preços</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {categorias.map((cat) => (
              <button key={cat.nome} onClick={() => setSelectedCategory(cat.nome)} className={`shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${selectedCategory === cat.nome ? "bg-orange-500 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}>
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-xs font-semibold whitespace-nowrap">{cat.nome}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">
        <ContadorOferta />

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-800">{produtosFiltrados.length} produtos encontrados</h3>
          <span className="text-xs text-orange-500 font-semibold bg-orange-50 px-3 py-1 rounded-full">Frete Grátis ✓</span>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {produtosFiltrados.map((produto, index) => (
              <ProductCard key={index} id={produto.id} nome={produto.nome} descricao={produto.descricao} imagem={produto.imagem} whatsapp={produto.whatsapp} afiliado={produto.afiliado} tipo={produto.tipo} isMostSold={produto.isMostSold} unitsLeft={produto.unitsLeft} preco={produto.preco} categoria={produto.categoria} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado.</p>
          </div>
        )}

        <section className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">⭐ Avaliações dos Clientes</h2>
            <div className="flex items-center gap-1 text-orange-500"><Star size={16} className="fill-orange-500" /><span className="font-bold text-sm">4.9</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} name={testimonial.name} role={testimonial.role} comment={testimonial.comment} rating={testimonial.rating} image={testimonial.image} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100"><div className="text-2xl font-black text-orange-500">4.9★</div><p className="text-gray-500 text-xs mt-1">Avaliação Média</p></div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100"><div className="text-2xl font-black text-blue-500">5k+</div><p className="text-gray-500 text-xs mt-1">Clientes</p></div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100"><div className="text-2xl font-black text-green-500">100%</div><p className="text-gray-500 text-xs mt-1">Garantido</p></div>
          </div>
        </section>

        <section className="mt-4 bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h2 className="text-lg font-black text-gray-900 mb-4">❓ Perguntas Frequentes</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => setFaqCategory("todos")} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${faqCategory === "todos" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Todos</button>
            <button onClick={() => setFaqCategory("frete")} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${faqCategory === "frete" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>🚚 Frete</button>
            <button onClick={() => setFaqCategory("devolucoes")} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${faqCategory === "devolucoes" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>🔄 Devoluções</button>
            <button onClick={() => setFaqCategory("pagamentos")} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${faqCategory === "pagamentos" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>💳 Pagamentos</button>
          </div>
          <FAQAccordion items={faqCategory === "todos" ? faqItems : faqItems.filter((item) => item.category === faqCategory)} />
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="bg-orange-500 py-3">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 text-white text-xs font-semibold">
            <span className="flex items-center gap-1"><Truck size={14} />Entrega Garantida</span>
            <span className="flex items-center gap-1"><Shield size={14} />Compra Segura</span>
            <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-300 text-yellow-300" />4.9 Avaliação</span>
            <span className="flex items-center gap-1"><RotateCcw size={14} />30 dias garantia</span>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3"><div className="bg-orange-500 p-2 rounded-xl"><ShoppingBag size={18} className="text-white" /></div><span className="font-bold text-lg">GVP Ofertas BR</span></div>
              <p className="text-gray-400 text-sm">Sua loja online de confiança com os melhores preços e entrega garantida em todo o Brasil.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-orange-400">Informações</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="/sobre" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />Sobre Nós</a></li>
<li><a href="/privacidade" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />Política de Privacidade</a></li>
<li><a href="/termos" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight size={12} />Termos de Serviço</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-orange-400">Contato</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="https://wa.me/5596984224137" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-green-400">💬</span>WhatsApp</a></li>
                <li><a href="mailto:contato@gvpofertasbr.com" className="hover:text-white transition-colors flex items-center gap-2"><span>📧</span>Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
            <p>&copy; 2025 GVP Ofertas BR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <FloatingCart />
<button
  onClick={() => window.open("https://wa.me/5596984224137?text=Olá! Vim pelo site GVP Ofertas BR.", "_blank")}
  className="fixed bottom-24 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</button>
<CookieBanner />
      <NotificacaoCompra />
    </div>
  );
}
