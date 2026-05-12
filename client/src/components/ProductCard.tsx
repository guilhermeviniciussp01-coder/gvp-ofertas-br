import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingCart, Star, Truck, Flame, Lock, Shield, Heart } from "lucide-react";
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
      addFavorite({
        id,
        nome,
        preco: preco || 99.9,
        imagem,
        categoria,
        addedAt: new Date().toISOString(),
      });
    }
    setIsFav(!isFav);
  };

  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(`Olá, quero comprar esse produto: ${nome}`);
    window.open(`${whatsapp.split("?")[0]}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 ease-out"
      style={{
        boxShadow: isHovered ? "0 12px 24px rgba(0, 0, 0, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.08)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-3 left-3 right-3 flex gap-2 z-10">
        {isMostSold && (
          <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            <Flame size={14} />
            Mais Vendido
          </div>
        )}
        {tipo === "entrega" && (
          <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
            <Truck size={14} />
            Entrega
          </div>
        )}
      </div>

      {unitsLeft <= 5 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold animate-pulse">
          Últimas {unitsLeft}
        </div>
      )}

      <button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 bg-white hover:bg-red-50 text-red-500 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 z-20"
        title={isFav ? "Remover de favoritos" : "Adicionar aos favoritos"}
      >
        <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : "text-red-500"} />
      </button>

      <div className="relative overflow-hidden bg-gray-100 h-56 sm:h-64">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300" style={{ opacity: isHovered ? 0.05 : 0 }} />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{nome}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{descricao}</p>

        <div className="mb-3">
          <p className="text-2xl font-bold text-orange-600">R$ {preco?.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-xs text-gray-600">{rating.toFixed(1)} ({reviewCount})</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex gap-2 text-xs flex-wrap">
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded">
              <span className="font-semibold">✓</span>
              Entrega Garantida
            </div>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
              <Lock size={12} />
              Compra Protegida
            </div>
          </div>
          <div className="flex gap-2 text-xs flex-wrap">
            <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded">
              <Shield size={12} />
              Garantia 30 dias
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => addItem({ nome, preco: preco || 99.90, quantidade: 1, categoria })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            Adicionar ao Carrinho
          </Button>

          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <MessageCircle size={18} />
            Comprar via WhatsApp
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <a href={afiliado} target="_blank" rel="noopener noreferrer">
              <ShoppingCart size={18} />
              Comprar Agora
            </a>
          </Button>

          
            href={`/product/${id}`}
            className="w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            ⭐ Ver Avaliações
          </a>
        </div>
      </div>
    </div>
  );
}
