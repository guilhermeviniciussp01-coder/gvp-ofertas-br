import { useState } from "react";
import { ArrowLeft, MessageCircle, ShoppingCart, Star, Truck, Shield, RotateCcw, Heart, Zap, Share2 } from "lucide-react";
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
  { id: "1", nome: "Resina Extreme Automotiva", descricao: "Resina auto brilho finalizador 500ml. Proteção máxima e brilho incomparável para seu carro.", preco: 89.99, categoria: "Automotivo", imagem: "https://i.ibb.co/whQ8XsvY/676241131-1481905673489846-2916311791656238816-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0" },
  { id: "2", nome: "Pistola Massageadora", descricao: "Pistola de massagem profissional com 4 cabeças intercambiáveis e cabo USB.", preco: 79.99, categoria: "Saúde", imagem: "https://i.ibb.co/jXXgg4S/676074914-3904377783199919-7370801944526901153-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0" },
  { id: "3", nome: "Clareador de Manchas AmazoLé", descricao: "Esfoliante clareador que limpa e uniformiza o tom da pele. Combate melasma e manchas.", preco: 120.00, categoria: "Beleza", imagem: "https://i.ibb.co/vvvxyvpM/661731367-730205876750039-6015324742804877210-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-gya94-0" },
  { id: "4", nome: "Relógio Masculino Original", descricao: "Relógio masculino premium estilo Invicta, dourado, resistente e elegante.", preco: 85.00, categoria: "Moda", imagem: "https://i.ibb.co/4gTxSQkX/download-1.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-osr5n-0" },
  { id: "5", nome: "Relógio Esportivo LED Unissex", descricao: "Relógio digital LED resistente à água, moderno e estiloso para qualquer ocasião.", preco: 20.00, categoria: "Moda", imagem: "https://i.ibb.co/v4HBjm8t/download.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-zbnq9-0" },
  { id: "6", nome: "Fone de Ouvido Bluetooth TWS", descricao: "Fone A6S Pro MiPods sem fio, conexão Bluetooth, case carregador incluso.", preco: 49.99, categoria: "Eletrônicos", imagem: "https://i.ibb.co/T9Xgdxp/666104100-1387351060086173-8195611779606541336-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-yvlif-0" },
  { id: "7", nome: "Redutor de Conta de Água", descricao: "Economizare: redutor de consumo que economiza até 50% na sua conta de água.", preco: 149.99, categoria: "Casa", imagem: "https://i.ibb.co/0ph8jSww/676709830-1237086445080329-2628572986454454748-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-uukmi-0" },
  { id: "8", nome: "Kit Completo Churrasco", descricao: "Kit profissional com 20+ utensílios de aço inox para churrasco perfeito.", preco: 148.98, categoria: "Casa", imagem: "https://i.ibb.co/xwTbkw2/162506261569e7cc5014170277754387iwy320260421161320.webp", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-b5zsk-0" },
  { id: "9", nome: "Kit Massagem EMS", descricao: "Kit com tapete e almofada massageadora EMS para pés e corpo. Alívio de dores.", preco: 69.98, categoria: "Saúde", imagem: "https://i.ibb.co/DH5fpkNC/53455382469e7d3b43406d842267824fijs20260421164452.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-it3g9-0" },
  { id: "10", nome: "Kit Ferramentas 46 Peças", descricao: "Jogo de soquetes e chaves com maleta, 46 peças em aço inox de alta resistência.", preco: 78.99, categoria: "Ferramentas", imagem: "https://i.ibb.co/v4nBw8KJ/155772289669e7d82956f83261100227bhtj20260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-yeqi9-0" },
  { id: "11", nome: "Escova a Vapor para Pets", descricao: "Escova vaporizadora que limpa, hidrata e remove pelos soltos do seu pet com facilidade.", preco: 49.99, categoria: "Pets", imagem: "https://i.ibb.co/KzqFrdYt/20680304269e7d829dd8804019041787kd520260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-nu0kw-0" },
  { id: "12", nome: "Luminária Mata Mosquito", descricao: "Armadilha elétrica UV que elimina mosquitos e insetos silenciosamente. Recarregável USB.", preco: 54.98, categoria: "Casa", imagem: "https://i.ibb.co/fVp4Q4sh/163632907569e7d82a21d1b313631554w0fx20260421170354.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-fdmva-0" },
  { id: "13", nome: "Câmera Lâmpada 360° IP", descricao: "Câmera de segurança em formato de lâmpada, 360°, visão noturna e acesso pelo celular.", preco: 120.00, categoria: "Segurança", imagem: "https://i.ibb.co/wZmz8Wpx/662525763-1261853449409138-4287481202985656184-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-v0gpl-0" },
  { id: "14", nome: "Short Feminino Empina Bumbum", descricao: "Short fitness modelador de cintura alta, tecido premium com compressão e conforto.", preco: 45.00, categoria: "Moda", imagem: "https://i.ibb.co/fd7JL2pM/663130907-943555138078111-1681655744055148382-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-j7ugp-0" },
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
  const { addItem } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(isFavorite(id));

  const precoOriginal = (produto.preco * 1.3).toFixed(2);
  const desconto = Math.floor(((produto.preco * 1.3 - produto.preco) / (produto.preco * 1.3)) * 100);
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite({ id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, categoria: produto.categoria, addedAt: new Date().toISOString() });
    }
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
    const newReview: Review = {
      id: String(reviews.length + 1),
      clientName: "Você",
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      images: review.images,
      date: "Agora",
      verified: true,
      helpful: 0,
      unhelpful: 0,
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="text-white hover:text-orange-200 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="text-white font-bold text-lg flex-1">Detalhes do Produto</span>
          <button onClick={handleToggleFavorite} className="text-white hover:text-orange-200 transition-colors">
            <Heart size={22} className={isFav ? "fill-white" : ""} />
          </button>
          <button className="text-white hover:text-orange-200 transition-colors">
            <Share2 size={22} />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Product Image */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3">
          <img src={produto.imagem} alt={produto.nome} className="w-full h-80 sm:h-96 object-cover" />
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-3">
          {/* Price */}
          <div className="bg-orange-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-black text-orange-500">R$ {produto.preco.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">R$ {precoOriginal}</span>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{desconto}% OFF</span>
            </div>
            <p className="text-green-600 text-sm font-semibold mt-1">✓ Frete Grátis • Pagamento na Entrega disponível</p>
          </div>

          {/* Name & Rating */}
          <h1 className="text-xl font-black text-gray-900 mb-2">{produto.nome}</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
              ))}
            </div>
            <span className="text-orange-500 font-semibold text-sm">{avgRating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({reviews.length} avaliações)</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm">Vendidos: 500+</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">{produto.descricao}</p>

          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-500">Categoria:</span>
            <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">{produto.categoria}</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-semibold text-gray-700">Quantidade:</span>
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                className="w-8 h-8 bg-white rounded-lg shadow-sm font-bold text-gray-700 hover:bg-orange-50 transition-colors"
              >-</button>
              <span className="font-bold text-gray-900 w-6 text-center">{quantidade}</span>
              <button
                onClick={() => setQuantidade(quantidade + 1)}
                className="w-8 h-8 bg-white rounded-lg shadow-sm font-bold text-gray-700 hover:bg-orange-50 transition-colors"
              >+</button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center gap-1 bg-green-50 rounded-xl p-3 text-center">
              <Truck size={20} className="text-green-500" />
              <span className="text-xs text-green-700 font-semibold">Frete Grátis</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-blue-50 rounded-xl p-3 text-center">
              <Shield size={20} className="text-blue-500" />
              <span className="text-xs text-blue-700 font-semibold">Compra Segura</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-purple-50 rounded-xl p-3 text-center">
              <RotateCcw size={20} className="text-purple-500" />
              <span className="text-xs text-purple-700 font-semibold">30 dias</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.open(`${produto.whatsapp}?text=${encodeURIComponent(`Olá, quero comprar ${quantidade}x ${produto.nome}`)}`, "_blank")}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg text-base"
            >
              <MessageCircle size={20} />
              Comprar via WhatsApp
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addItem({ nome: produto.nome, preco: produto.preco, quantidade, categoria: produto.categoria })}
                className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-400 text-orange-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={18} />
                Carrinho
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

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-3">
          <h2 className="text-lg font-black text-gray-900 mb-4">⭐ Avaliações do Produto</h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-6 mb-6 bg-orange-50 rounded-xl p-4">
            <div className="text-center">
              <div className="text-5xl font-black text-orange-500">{avgRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">{reviews.length} avaliações</div>
            </div>
            <div className="flex-1">
              <ReviewFilter stats={stats} selectedRating={selectedRating} onRatingChange={setSelectedRating} />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-700">{filteredReviews.length} avaliações</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "helpful" | "rating")}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="recent">Mais Recentes</option>
              <option value="helpful">Mais Úteis</option>
              <option value="rating">Melhor Avaliação</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-3 mb-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => <ReviewCard key={review.id} {...review} />)
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>Nenhuma avaliação com essa classificação.</p>
              </div>
            )}
          </div>

          {/* Add Review */}
          <ReviewForm productName={produto.nome} onSubmit={handleAddReview} />
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-50">
        <div className="container mx-auto max-w-4xl flex gap-3">
          <button
            onClick={handleToggleFavorite}
            className="flex flex-col items-center gap-0.5 px-4 py-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : ""} />
            <span className="text-xs">Favorito</span>
          </button>
          <button
            onClick={() => addItem({ nome: produto.nome, preco: produto.preco, quantidade, categoria: produto.categoria })}
            className="flex-1 bg-orange-100 hover:bg-orange-200 border-2 border-orange-400 text-orange-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={18} />
            Adicionar ao Carrinho
          </button>
          <button
            onClick={() => window.open(`${produto.whatsapp}?text=${encodeURIComponent(`Olá, quero comprar: ${produto.nome}`)}`, "_blank")}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md"
          >
            <Zap size={18} />
            Comprar Agora
          </button>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
