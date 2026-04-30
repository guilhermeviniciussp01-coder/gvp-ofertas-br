import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role?: string;
  comment: string;
  rating: number;
  image: string;
}

/**
 * TestimonialCard - Componente de Depoimento de Cliente
 * 
 * Design Philosophy: Marketplace Moderno (Shopee-inspired)
 * - Foto circular do cliente
 * - Avaliação em estrelas
 * - Comentário destacado
 * - Nome e profissão do cliente
 * - Sombra suave e espaçamento generoso
 * - Hover effect com elevação
 */
export default function TestimonialCard({
  name,
  role,
  comment,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:translate-y-[-4px]">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm mb-6 leading-relaxed italic">
        "{comment}"
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-orange-500">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Role */}
        <div>
          <h4 className="font-heading font-semibold text-gray-900 text-sm">
            {name}
          </h4>
          {role && (
            <p className="text-xs text-gray-500">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
