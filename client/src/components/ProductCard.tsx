import { MessageCircle, ShoppingCart, Star, Truck, Flame, Heart, Zap, Eye } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
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

export default function ProductCard({
  id = Math.random().toString(),
  nome,
  descricao,
  imagem,
  whatsapp,
  afiliado,
  tipo,
  isMostSold = false,
  unitsLeft = Math.floor(Math.random() * 15) + 3,
  preco = 99.90,
  categoria = "Geral",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(isFavorite(id));
  const [adicionado, setAdicionado] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFav) removeFavorite(id);
    else addFavorite({ id, nome, preco: preco || 99.9, imagem, categoria, addedAt: new Date().toISOString() });
    setIsFav(!isFav);
  };

  const rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
  const reviewCount = Math.floor(Math.random() * 200) + 50;
  const precoOriginal = (preco * 1.35).toFixed(2);
  const desconto = Math.floor(((preco * 1.35 - preco) / (preco * 1.35)) * 100);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const encodedMessage = encodeURIComponent(`Olá, quero comprar: ${nome}`);
    window.open(`${whatsapp.split("?")[0]}?text=${encodedMessage}`, "_blank");
  };

  const handleAddCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ nome, preco: preco || 99.90, quantidade: 1, categoria });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  const handleComprarAgora = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(afiliado, "_blank");
  };

  const handleVerProduto = () => {
    window.location.href = `/product/${id}`;
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300"
      style={{
        boxShadow: isHovered ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVerProduto}
    >
      {/* IMAGEM */}
      <div className="relative overflow-hidden bg-gray-50 h-44 sm:h-52">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* BADGES TOP LEFT */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isMostSold && (
            <span className="flex items-center gap-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow">
              <Flame size={10} />MAIS VENDIDO
            </span>
          )}
          {tipo === "entrega" && (
            <span className="flex items-center gap-1 bg-blue-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow">
              <Truck size={10} />Na Entrega
            </span>
          )}
        </div>

        {/* DESCONTO BADGE */}
        <div className="absolute top-2 right-9 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-black shadow">
          -{desconto}%
        </div>

        {/* FAVORITO */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 bg-white/90 text-red-400 p-1.5 rounded-full shadow transition-all hover:scale-110 z-10"
        >
          <Heart size={14} className={isFav ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* ESTOQUE BAIXO */}
        {unitsLeft <= 5 && (
          <div className="absolute bottom-2 left-2 bg-orange-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
            🔥 Só {unitsLeft} restantes!
          </div>
        )}

        {/* VER PRODUTO (hover) */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <span className="bg-white text-gray-800 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Eye size={12} />Ver produto
          </span>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="p-3">
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wide">{categoria}</span>

        <h3 className="font-bold text-gray-900 text-sm mt-0.5 mb-1.5 line-clamp-2 leading-tight">{nome}</h3>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">{rating} ({reviewCount})</span>
        </div>

        {/* PREÇO */}
        <div className="mb-3">
          <span className="text-xl font-black text-orange-500">R$ {preco?.toFixed(2)}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400 line-through">R$ {precoOriginal}</span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">-{desconto}%</span>
          </div>
          <p className="text-[10px] text-green-600 font-semibold mt-0.5">✅ Frete grátis · Pague na entrega</p>
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-sm"
          >
            <MessageCircle size={13} />WhatsApp
          </button>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleAddCart}
              className={`py-2 rounded-xl flex items-center justify-center gap-1 text-xs font-bold border-2 transition-all ${adicionado ? "bg-green-500 text-white border-green-500" : "bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100"}`}
            >
              <ShoppingCart size={12} />
              {adicionado ? "✓ Ok!" : "Carrinho"}
            </button>
            <button
              onClick={handleComprarAgora}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl flex items-center justify-center gap-1 text-xs font-bold shadow-sm hover:from-orange-600 hover:to-red-600 transition-all"
            >
              <Zap size={12} />Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
