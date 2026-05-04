import { Star, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * ReviewForm Component
 * 
 * Design Philosophy: Simple and Intuitive Review Submission
 * - Classificação interativa com estrelas
 * - Campos de título e comentário
 * - Upload de múltiplas fotos
 * - Validação de campos
 * - Botão de envio com feedback
 */

interface ReviewFormProps {
  productName: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
    images: string[];
  }) => void;
}

export default function ReviewForm({ productName, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simular upload de imagens (em produção, seria um upload real)
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages((prev) => [...prev, event.target?.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validação
    if (rating === 0) {
      setError("Por favor, selecione uma classificação");
      return;
    }
    if (!title.trim()) {
      setError("Por favor, adicione um título");
      return;
    }
    if (!comment.trim()) {
      setError("Por favor, adicione um comentário");
      return;
    }

    setIsSubmitting(true);
    // Simular envio
    setTimeout(() => {
      onSubmit({
        rating,
        title,
        comment,
        images,
      });
      // Resetar form
      setRating(0);
      setTitle("");
      setComment("");
      setImages([]);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg border border-teal-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">
        Compartilhe sua experiência com {productName}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Qual sua avaliação? *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-slate-600 mt-2">
              {rating === 5 && "Excelente! 😍"}
              {rating === 4 && "Muito bom! 😊"}
              {rating === 3 && "Bom! 👍"}
              {rating === 2 && "Poderia melhorar 😐"}
              {rating === 1 && "Não recomendo 😞"}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
            Título da avaliação *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Produto excelente, chegou rápido!"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            maxLength={100}
          />
          <p className="text-xs text-slate-500 mt-1">{title.length}/100</p>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold text-slate-900 mb-2">
            Seu comentário *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte-nos mais sobre sua experiência com este produto..."
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            maxLength={500}
          />
          <p className="text-xs text-slate-500 mt-1">{comment.length}/500</p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Adicione fotos (opcional)
          </label>
          <div className="flex gap-2 mb-3 flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-teal-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-teal-300 rounded-lg cursor-pointer hover:bg-teal-50 transition-colors">
            <Upload size={18} className="text-teal-600" />
            <span className="text-sm font-medium text-teal-600">
              Clique para adicionar fotos
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Máximo 5 fotos. Formatos: JPG, PNG
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
        >
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </form>
    </div>
  );
}
