import { MessageCircle, ShoppingCart, Star, Truck, Flame, Heart, Zap } from "lucide-react";
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

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite({ id, nome, preco: preco || 99.9, imagem, categoria, addedAt: new Date().toISOString() });
    }
    setIsFav(!isFav);
  };

  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 200) + 50;
  const precoOriginal = (preco * 1.3).toFixed(2);
  const desconto = Math.floor(((preco * 1.3 - preco) / (preco * 1.3)) * 100);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(`Olá, quero comprar esse produto: ${nome}`);
    window.open(`${whatsapp.split("?")[0]}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-out border border-gray-100"
      style={{
        boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.12)" : "0 2px 8px rgba(0, 0, 0, 0.06)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 h-52 sm:h-60">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isMostSold && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              <Flame size={12} />
              Hot
            </div>
          )}
          {tipo === "entrega" && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              <Truck size={12} />
              Na Entrega
            </div>
          )}
        </div>

        {/* Discount badge */}
        <div className="absolute top-2 right-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          -{desconto}%
        </div>

        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white text-red-500 p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
        >
          <Heart size={16} className={isFav ? "fill-red-500 text-red-500" : "text-red-400"} />
        </button>

        {/* Units left */}
        {unitsLeft <= 5 && (
          <div className="absolute bottom-2 left-2 bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            Só {unitsLeft} restantes!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">{categoria}</span>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-sm sm:text-base mt-1 mb-1 line-clamp-2 leading-tight">{nome}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
            ))}
          </div>
          <span className="text-xs text-gray-500">{rating.toFixed(1)} ({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-orange-500">R$ {preco?.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400 line-through">R$ {precoOriginal}</span>
            <span className="text-xs font-semibold text-green-600">Economize {desconto}%</span>
          </div>
          <p className="text-xs text-green-600 font-medium mt-1">✓ Frete grátis</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
          >
            <MessageCircle size={16} />
            Comprar via WhatsApp
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addItem({ nome, preco: preco || 99.90, quantidade: 1, categoria })}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 text-xs border border-blue-200"
            >
              <ShoppingCart size={14} />
              Carrinho
            </button>

            <button
            onClick={() => window.location.href = `/product/${id}`}
            className="bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 text-xs border border-orange-200"
          >
            <Star size={14} />
            Avaliar
          </button>

          <button
            onClick={() => {
              const texto = `🔥 Olha essa oferta incrível!\n\n${nome}\nApenas R$ ${preco?.toFixed(2)}\n\nCompre agora: ${window.location.origin}/product/${id}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
            }}
            className="w-full bg-green-50 hover:bg-green-100 text-green-600 font-semibold py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 text-xs border border-green-200"
          >
            📤 Compartilhar
          </button>
          </div>

          
            <button
            onClick={() => window.open(afiliado, "_blank")}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
          >
            <Zap size={16} />
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
