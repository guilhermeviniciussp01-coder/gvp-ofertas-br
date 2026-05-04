import { Star, ThumbsUp, Flag } from "lucide-react";
import { useState } from "react";

/**
 * ReviewCard Component
 * 
 * Design Philosophy: Premium Review Display
 * - Foto do cliente com iniciais como fallback
 * - Classificação em estrelas com cor dinâmica
 * - Título e comentário do cliente
 * - Fotos da avaliação com galeria
 * - Botões de útil/não útil
 * - Badge de "Compra Verificada"
 */

interface ReviewCardProps {
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

export default function ReviewCard({
  id,
  clientName,
  clientImage,
  rating,
  title,
  comment,
  images = [],
  date,
  verified,
  helpful,
  unhelpful,
}: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  // Gerar iniciais para avatar
  const initials = clientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Determinar cor da classificação
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-50";
    if (rating >= 3.5) return "bg-yellow-50";
    return "bg-red-50";
  };

  const displayedImages = showAllImages ? images : images.slice(0, 3);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Avatar */}
          {clientImage ? (
            <img
              src={clientImage}
              alt={clientName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-slate-900">{clientName}</h4>
              {verified && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                  ✓ Compra Verificada
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">{date}</p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getRatingBgColor(rating)}`}>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? `fill-yellow-400 ${getRatingColor(rating)}`
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className={`font-bold text-sm ${getRatingColor(rating)}`}>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Title */}
      <h5 className="font-semibold text-slate-900 mb-2">{title}</h5>

      {/* Comment */}
      <p className="text-slate-700 text-sm mb-4 leading-relaxed">{comment}</p>

      {/* Images Gallery */}
      {images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2 mb-2">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-slate-100 aspect-square cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src={image}
                  alt={`Review ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {!showAllImages && images.length > 3 && (
              <div
                className="relative overflow-hidden rounded-lg bg-slate-200 aspect-square cursor-pointer flex items-center justify-center hover:bg-slate-300 transition-colors"
                onClick={() => setShowAllImages(true)}
              >
                <span className="text-sm font-semibold text-slate-700">
                  +{images.length - 3}
                </span>
              </div>
            )}
          </div>
          {showAllImages && images.length > 3 && (
            <button
              onClick={() => setShowAllImages(false)}
              className="text-xs text-teal-600 hover:text-teal-700 font-medium"
            >
              Ver menos
            </button>
          )}
        </div>
      )}

      {/* Footer - Helpful/Unhelpful */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => setIsHelpful(isHelpful === true ? null : true)}
          className={`flex items-center gap-1 text-sm font-medium transition-colors ${
            isHelpful === true
              ? "text-teal-600"
              : "text-slate-600 hover:text-teal-600"
          }`}
        >
          <ThumbsUp size={16} />
          Útil ({helpful})
        </button>
        <button
          onClick={() => setIsHelpful(isHelpful === false ? null : false)}
          className={`flex items-center gap-1 text-sm font-medium transition-colors ${
            isHelpful === false
              ? "text-red-600"
              : "text-slate-600 hover:text-red-600"
          }`}
        >
          <Flag size={16} />
          Não útil ({unhelpful})
        </button>
      </div>
    </div>
  );
}
