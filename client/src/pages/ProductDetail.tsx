import { useState } from "react";
import { ArrowLeft, MessageCircle, ShoppingCart, Star, Truck, Shield, RotateCcw, Heart, Zap, Share2, BadgeCheck, Package, Clock, ChevronRight, Flame } from "lucide-react";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import ReviewFilter from "@/components/ReviewFilter";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useRoute } from "wouter";

interface Review {
  id: string;
  clientName: string;
  clientImage?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  date: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
}

const produtos = [
  { id: "1", nome: "Resina Extreme Automotiva", descricao: "Resina auto brilho finalizador 500ml. Proteção máxima e brilho incomparável para seu carro.", preco: 89.99, precoOriginal: 129.99, desconto: 31, categoria: "Automotivo", imagem: "https://i.ibb.co/whQ8XsvY/676241131-1481905673489846-2916311791656238816-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", vendidos: 843, estoque: 5 },
  { id: "2", nome: "Pistola Massageadora", descricao: "Pistola de massagem profissional com 4 cabeças intercambiáveis e cabo USB.", preco: 79.99, precoOriginal: 119.99, desconto: 33, categoria: "Saúde", imagem: "https://i.ibb.co/jXXgg4S/676074914-3904377783199919-7370801944526901153-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", vendidos: 1240, estoque: 8 },
  { id: "3", nome: "Clareador de Manchas AmazoLé", descricao: "Esfoliante clareador que limpa e uniformiza o tom da pele. Combate melasma e manchas.", preco: 120.00, precoOriginal: 159.99, desconto: 25, categoria: "Beleza", imagem: "https://i.ibb.co/vvvxyvpM/661731367-730205876750039-6015324742804877210-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-gya94-0", vendidos: 567, estoque: 6 },
  { id: "4", nome: "Relógio Masculino Original", descricao: "Relógio masculino premium estilo Invicta, dourado, resistente e elegante.", preco: 85.00, precoOriginal: 120.00, desconto: 29, categoria: "Moda", imagem: "https://i.ibb.co/4gTxSQkX/download-1.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-osr5n-0", vendidos: 2100, estoque: 3 },
  { id: "5", nome: "Relógio Esportivo LED Unissex", descricao: "Relógio digital LED resistente à água, moderno e estiloso para qualquer ocasião.", preco: 20.00, precoOriginal: 35.00, desconto: 43, categoria: "Moda", imagem: "https://i.ibb.co/v4HBjm8t/download.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-zbnq9-0", vendidos: 3400, estoque: 15 },
  { id: "6", nome: "Fone de Ouvido Bluetooth TWS", descricao: "Fone A6S Pro MiPods sem fio, conexão Bluetooth, case carregador incluso.", preco: 49.99, precoOriginal: 79.99, desconto: 38, categoria: "Eletrônicos", imagem: "https://i.ibb.co/T9Xgdxp/666104100-1387351060086173-8195611779606541336-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-yvlif-0", vendidos: 4200, estoque: 10 },
  { id: "7", nome: "Redutor de Conta de Água", descricao: "Economizare: redutor de consumo que economiza até 50% na sua conta de água.", preco: 149.99, precoOriginal: 199.99, desconto: 25, categoria: "Casa", imagem: "https://i.ibb.co/0ph8jSww/676709830-1237086445080329-2628572986454454748-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-uukmi-0", vendidos: 329, estoque: 4 },
  { id: "8", nome: "Kit Completo Churrasco", descricao: "Kit profissional com 20+ utensílios de aço inox para churrasco perfeito.", preco: 148.98, precoOriginal: 199.99, desconto: 26, categoria: "Casa", imagem: "https://i.ibb.co/xwTbkw2/162506261569e7cc5014170277754387iwy320260421161320.webp", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-b5zsk-0", vendidos: 712, estoque: 7 },
  { id: "9", nome: "Kit Massagem EMS", descricao: "Kit com tapete e almofada massageadora EMS para pés e corpo. Alívio de dores.", preco: 69.98, precoOriginal: 99.99, desconto: 30, categoria: "Saúde", imagem: "https://i.ibb.co/DH5fpkNC/53455382469e7d3b43406d842267824fijs20260421164452.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-it3g9-0", vendidos: 891, estoque: 9 },
  { id: "10", nome: "Kit Ferramentas 46 Peças", descricao: "Jogo de soquetes e chaves com maleta, 46 peças em aço inox de alta resistência.", preco: 78.99, precoOriginal: 109.99, desconto: 28, categoria: "Ferramentas", imagem: "https://i.ibb.co/v4nBw8KJ/155772289669e7d82956f83261100227bhtj20260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-yeqi9-0", vendidos: 1543, estoque: 6 },
  { id: "11", nome: "Escova a Vapor para Pets", descricao: "Escova vaporizadora que limpa, hidrata e remove pelos soltos do seu pet com facilidade.", preco: 49.99, precoOriginal: 79.99, desconto: 38, categoria: "Pets", imagem: "https://i.ibb.co/KzqFrdYt/20680304269e7d829dd8804019041787kd520260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-nu0kw-0", vendidos: 654, estoque: 12 },
  { id: "12", nome: "Luminária Mata Mosquito", descricao: "Armadilha elétrica UV que elimina mosquitos e insetos silenciosamente. Recarregável USB.", preco: 54.98, precoOriginal: 79.99, desconto: 31, categoria: "Casa", imagem: "https://i.ibb.co/fVp4Q4sh/163632907569e7d82a21d1b313631554w0fx20260421170354.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-fdmva-0", vendidos: 987, estoque: 8 },
  { id: "13", nome: "Câmera Lâmpada 360° IP", descricao: "Câmera de segurança em formato de lâmpada, 360°, visão noturna e acesso pelo celular.", preco: 120.00, precoOriginal: 169.99, desconto: 29, categoria: "Segurança", imagem: "https://i.ibb.co/wZmz8Wpx/662525763-1261853449409138-4287481202985656184-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-v0gpl-0", vendidos: 432, estoque: 4 },
  { id: "14", nome: "Short Feminino Empina Bumbum", descricao: "Short fitness modelador de cintura alta, tecido premium com compressão e conforto.", preco: 45.00, precoOriginal: 69.99, desconto: 36, categoria: "Moda", imagem: "https://i.ibb.co/fd7JL2pM/663130907-943555138078111-1681655744055148382-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-j7ugp-0", vendidos: 2876, estoque: 20 },
];

const mockReviews: Review[] = [
  { id: "1", clientName: "Marina Silva", rating: 5, title: "Adorei! Produto de excelente qualidade", comment: "Recebi o produto bem embalado e em perfeito estado. A qualidade é muito boa mesmo. Recomendo para todos!", date: "2 dias atrás", verified: true, helpful: 45, unhelpful: 2 },
  { id: "2", clientName: "Carlos Mendes", rating: 4, title: "Muito bom, entrega rápida", comment: "Produto atende perfeitamente às expectativas. Entrega foi rápida e o atendimento excelente.", date: "1 semana atrás", verified: true, helpful: 32, unhelpful: 1 },
  { id: "3", clientName: "Juliana Costa", rating: 5, title: "Comprei 3 vezes, sempre perfeito!", comment: "Já comprei este produto 3 vezes e sempre vem perfeito. Qualidade consistente e preço justo.", date: "2 semanas atrás", verified: true, helpful: 78, unhelpful: 0 },
  { id: "4", clientName: "Felipe Santos", rating: 4, title: "Bom custo-benefício", comment: "Produto com boa qualidade pelo preço. Recomendo para quem procura bom custo-benefício.", date: "3 semanas atrás", verified: true, helpful: 23, unhelpful: 1 },
  { id: "5", clientName: "Beatriz Oliveira", rating: 5, title: "Superou minhas expectativas!", comment: "Não esperava tanta qualidade por esse preço. Produto excelente, entrega rápida. Voltaria a comprar com certeza!", date: "1 mês atrás", verified: true, helpful: 56, unhelpful: 1 },
];

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const id = params?.id ?? "1";
  const produto = produtos.find((p) => p.id === id) || produtos[0];

  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");
  const [quantidade, setQuantidade] = useState(1);
  const [showShare, setShowShare] = useState(false);
  const { addItem } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(isFavorite(id));

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const url = typeof window !== "undefined" ? `${window.location.origin}/product/${id}` : "";
  const economia = ((produto.precoOriginal ?? produto.preco * 1.3) - produto.preco).toFixed(2);

  const handleToggleFavorite = () => {
    if (isFav) removeFavorite(id);
    else addFavorite({ id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, categoria: produto.categoria, addedAt: new Date().toISOString() });
    setIsFav(!isFav);
  };

  const stats = {
    total: reviews.length,
    average: avgRating,
    distribution: {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    },
  };

  let filteredReviews = reviews;
  if (selectedRating) filteredReviews = reviews.filter((r) => r.rating === selectedRating);
  if (sortBy === "helpful") filteredReviews = [...filteredReviews].sort((a, b) => b.helpful - a.helpful);
  else if (sortBy === "rating") filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating);

  const handleAddReview = (review: { rating: number; title: string; comment: string; images: string[] }) => {
    const newReview: Review = { id: String(reviews.length + 1), clientName: "Você", rating: review.rating, title: review.title, comment: review.comment, images: review.images, date: "Agora", verified: true, helpful: 0, unhelpful: 0 };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white hover:text-orange-200 transition-colors p-1">
            <ArrowLeft size={22} />
          </button>
          <span className="text-white font-bold text-base flex-1 truncate">{produto.nome}</span>
          <button onClick={handleToggleFavorite} className="text-white hover:text-orange-200 transition-colors p-1">
            <Heart size={20} className={isFav ? "fill-white" : ""} />
          </button>
          <button onClick={() => setShowShare(!showShare)} className="text-white hover:text-orange-200 transition-colors p-1">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      {/* PAINEL DE COMPARTILHAR */}
      {showShare && (
        <div className="bg-white border-b border-gray-200 shadow-md">
          <div className="container mx-auto px-4 py-3 max-w-4xl">
            <p className="text-xs font-bold text-gray-500 mb-2">Compartilhar produto:</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`🔥 ${produto.nome} por R$ ${produto.preco.toFixed(2)}! Confira: ${url}`)}`, "_blank")} className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">💬 WhatsApp</button>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">📘 Facebook</button>
              <button onClick={() => { navigator.clipboard.writeText(url); alert("✅ Link copiado!"); setShowShare(false); }} className="bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">🔗 Copiar link</button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-4 max-w-4xl">

        {/* IMAGEM */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3 relative">
          <img src={produto.imagem} alt={produto.nome} className="w-full h-80 sm:h-96 object-cover" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">-{produto.desconto ?? 30}% OFF</span>
            {produto.estoque <= 5 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow animate-pulse">
                🔥 Só {produto.estoque} restantes!
              </span>
            )}
          </div>
        </div>

        {/* INFO PRINCIPAL */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-3">

          {/* BREADCRUMB */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <span className="hover:text-orange-500 cursor-pointer" onClick={() => window.location.href = "/"}>Início</span>
            <ChevronRight size={12} />
            <span className="hover:text-orange-500 cursor-pointer">{produto.categoria}</span>
            <ChevronRight size={12} />
            <span className="text-gray-600 truncate">{produto.nome}</span>
          </div>

          {/* NOME */}
          <h1 className="text-xl font-black text-gray-900 mb-2 leading-tight">{produto.nome}</h1>

          {/* RATING + VENDIDOS */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className={i < Math.floor(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
              ))}
              <span className="text-orange-500 font-bold text-sm ml-1">{avgRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm">{reviews.length} avaliações</span>
            <span className="text-gray-300">|</span>
            <span className="text-green-600 text-sm font-semibold">{produto.vendidos?.toLocaleString()}+ vendidos</span>
          </div>

          {/* PREÇO */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-4 mb-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-black text-orange-500">R$ {produto.preco.toFixed(2)}</span>
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through">R$ {(produto.precoOriginal ?? produto.preco * 1.3).toFixed(2)}</span>
                <span className="text-xs font-bold text-green-600">💰 Você economiza R$ {economia}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">✅ Frete Grátis</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">🚚 Pague na Entrega</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200">💳 12x sem juros</span>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{produto.descricao}</p>

          {/* SELOS DE CONFIANÇA */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              { icon: <Truck size={16} className="text-green-500" />, texto: "Frete Grátis", bg: "bg-green-50 border-green-200" },
              { icon: <Shield size={16} className="text-blue-500" />, texto: "Compra Segura", bg: "bg-blue-50 border-blue-200" },
              { icon: <RotateCcw size={16} className="text-purple-500" />, texto: "30 Dias Garantia", bg: "bg-purple-50 border-purple-200" },
              { icon: <BadgeCheck size={16} className="text-orange-500" />, texto: "Produto Original", bg: "bg-orange-50 border-orange-200" },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} border rounded-xl px-3 py-2 flex items-center gap-2`}>
                {s.icon}
                <span className="text-xs font-bold text-gray-700">{s.texto}</span>
              </div>
            ))}
          </div>

          {/* QUANTIDADE */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold text-gray-700">Quantidade:</span>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="w-9 h-9 bg-white rounded-lg shadow-sm font-black text-gray-700 hover:bg-orange-50 transition-colors text-lg">−</button>
              <span className="font-black text-gray-900 w-8 text-center text-lg">{quantidade}</span>
              <button onClick={() => setQuantidade(quantidade + 1)} className="w-9 h-9 bg-white rounded-lg shadow-sm font-black text-gray-700 hover:bg-orange-50 transition-colors text-lg">+</button>
            </div>
            {produto.estoque <= 10 && (
              <span className="text-xs text-red-500 font-semibold">⚠️ Apenas {produto.estoque} em estoque</span>
            )}
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.open(`${produto.whatsapp.split("?")[0]}?text=${encodeURIComponent(`Olá, quero comprar ${quantidade}x ${produto.nome} — R$ ${(produto.preco * quantidade).toFixed(2)}`)}`, "_blank")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg text-base transition-colors"
            >
              <MessageCircle size={20} />
              Comprar via WhatsApp
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { addItem({ nome: produto.nome, preco: produto.preco, quantidade, categoria: produto.categoria }); alert(`✅ ${produto.nome} adicionado ao carrinho!`); }}
                className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-400 text-orange-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={18} />
                Adicionar
              </button>
              <button
                onClick={() => window.open(produto.afiliado, "_blank")}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Zap size={18} />
                Comprar Agora
              </button>
            </div>
          </div>
        </div>

        {/* ENTREGA */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-3">
          <h2 className="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
            <Package size={18} className="text-orange-500" />
            Entrega e Pagamento
          </h2>
          <div className="space-y-3">
            {[
              { icon: <Truck size={16} className="text-green-500" />, titulo: "Frete Grátis", sub: "Entrega em 3 a 7 dias úteis para todo Brasil", badge: "GRÁTIS", cor: "bg-green-50 border-green-100" },
              { icon: <Clock size={16} className="text-blue-500" />, titulo: "Pagamento na Entrega", sub: "Pague só quando receber o produto em mãos", badge: "SEGURO", cor: "bg-blue-50 border-blue-100" },
              { icon: <Shield size={16} className="text-purple-500" />, titulo: "Garantia de 30 dias", sub: "Devolução grátis se não ficar satisfeito", badge: "GARANTIDO", cor: "bg-purple-50 border-purple-100" },
            ].map((item, i) => (
              <div key={i} className={`${item.cor} border rounded-xl p-3 flex items-center gap-3`}>
                <div className="bg-white p-2 rounded-lg shadow-sm">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{item.titulo}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
                <span className="text-xs font-black text-green-700 bg-green-200 px-2 py-0.5 rounded-full">{item.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AVALIAÇÕES */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-3">
          <h2 className="text-lg font-black text-gray-900 mb-4">⭐ Avaliações dos Clientes</h2>
          <div className="flex items-center gap-6 mb-5 bg-orange-50 rounded-2xl p-4">
            <div className="text-center shrink-0">
              <div className="text-5xl font-black text-orange-500">{avgRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">{reviews.length} avaliações</div>
            </div>
            <div className="flex-1">
              <ReviewFilter stats={stats} selectedRating={selectedRating} onRatingChange={setSelectedRating} />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-700">{filteredReviews.length} avaliações</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="recent">Mais Recentes</option>
              <option value="helpful">Mais Úteis</option>
              <option value="rating">Melhor Avaliação</option>
            </select>
          </div>
          <div className="space-y-3 mb-6">
            {filteredReviews.length > 0
              ? filteredReviews.map((review) => <ReviewCard key={review.id} {...review} />)
              : <div className="text-center py-8 text-gray-400"><p>Nenhuma avaliação com essa classificação.</p></div>
            }
          </div>
          <ReviewForm productName={produto.nome} onSubmit={handleAddReview} />
        </div>

        {/* PRODUTOS RELACIONADOS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-24">
          <div className="flex items-center gap-2 mb-4">
            <Flame size={18} className="text-orange-500 fill-orange-400" />
            <h2 className="text-base font-black text-gray-900">Produtos Relacionados</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {produtos
              .filter((p) => p.id !== produto.id && p.categoria === produto.categoria)
              .slice(0, 2)
              .concat(produtos.filter((p) => p.id !== produto.id && p.categoria !== produto.categoria).slice(0, 2))
              .slice(0, 4)
              .map((p) => (
                <button key={p.id} onClick={() => window.location.href = `/product/${p.id}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all text-left hover:-translate-y-1">
                  <img src={p.imagem} alt={p.nome} className="w-full h-28 object-cover" />
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">{p.nome}</p>
                    <p className="text-sm font-black text-orange-500 mt-1">R$ {p.preco.toFixed(2)}</p>
                    {p.precoOriginal && <p className="text-xs text-gray-400 line-through">R$ {p.precoOriginal.toFixed(2)}</p>}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </main>

      {/* BARRA INFERIOR FIXA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-2xl z-50">
        <div className="container mx-auto max-w-4xl flex gap-2">
          <button onClick={handleToggleFavorite} className="flex flex-col items-center gap-0.5 px-3 py-2 text-gray-400 hover:text-red-500 transition-colors shrink-0">
            <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : ""} />
            <span className="text-[10px]">Salvar</span>
          </button>
          <button
            onClick={() => { addItem({ nome: produto.nome, preco: produto.preco, quantidade, categoria: produto.categoria }); alert(`✅ Adicionado ao carrinho!`); }}
            className="flex-1 bg-orange-50 border-2 border-orange-400 text-orange-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-colors text-sm"
          >
            <ShoppingCart size={16} />
            Carrinho
          </button>
          <button
            onClick={() => window.open(`${produto.whatsapp.split("?")[0]}?text=${encodeURIComponent(`Olá, quero comprar: ${produto.nome}`)}`, "_blank")}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-md text-sm"
          >
            <Zap size={16} />
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
