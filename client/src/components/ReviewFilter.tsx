import { Star } from "lucide-react";

/**
 * ReviewFilter Component
 * 
 * Design Philosophy: Clean Filter Interface
 * - Filtro por número de estrelas
 * - Exibição de contagem de avaliações
 * - Barra de progresso visual
 * - Botão para limpar filtros
 */

interface ReviewFilterProps {
  stats: {
    total: number;
    average: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
}

export default function ReviewFilter({
  stats,
  selectedRating,
  onRatingChange,
}: ReviewFilterProps) {
  const getRatingPercentage = (count: number) => {
    return stats.total > 0 ? (count / stats.total) * 100 : 0;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Avaliações</h3>

      {/* Average Rating */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-slate-900">
            {stats.average.toFixed(1)}
          </div>
          <div className="flex gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(stats.average)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-2">
            {stats.total} avaliações
          </p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() =>
              onRatingChange(selectedRating === rating ? null : rating)
            }
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              selectedRating === rating
                ? "bg-teal-50 border-2 border-teal-500"
                : "hover:bg-slate-50 border border-transparent"
            }`}
          >
            {/* Stars */}
            <div className="flex gap-0.5 w-20">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${getRatingColor(rating)} transition-all`}
                  style={{
                    width: `${getRatingPercentage(stats.distribution[rating as keyof typeof stats.distribution])}%`,
                  }}
                />
              </div>
            </div>

            {/* Count */}
            <div className="text-sm font-medium text-slate-600 w-12 text-right">
              {stats.distribution[rating as keyof typeof stats.distribution]}
            </div>
          </button>
        ))}
      </div>

      {/* Clear Filter */}
      {selectedRating !== null && (
        <button
          onClick={() => onRatingChange(null)}
          className="w-full mt-6 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
