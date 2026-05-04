import { useState } from "react";
import { ArrowLeft, MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import ReviewFilter from "@/components/ReviewFilter";
import { useCart } from "@/contexts/CartContext";

/**
 * ProductDetail Page
 * 
 * Design Philosophy: Premium Product Page with Reviews
 * - Detalhes completos do produto
 * - Seção de avaliações com filtros
 * - Formulário para adicionar avaliações
 * - Integração com carrinho
 */

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

// Dados fictícios do produto
const mockProduct = {
  id: "1",
  nome: "Produto 1",
  descricao: "Descrição do produto",
  preco: 49.9,
  categoria: "Eletrônicos",
  imagem: "https://via.placeholder.com/300",
  whatsapp: "https://wa.me/5596984224137?text=Olá%2C%20quero%20comprar%20esse%20produto%21",
  afiliado: "https://seulinkafiliado.com",
  tipo: "entrega" as const,
  descricaoCompleta:
    "Este é um produto de alta qualidade com excelente custo-benefício. Perfeito para quem busca qualidade e durabilidade.",
  especificacoes: [
    "Material: Premium",
    "Dimensões: 10x10x10cm",
    "Peso: 500g",
    "Garantia: 1 ano",
  ],
};

// Dados fictícios de avaliações
const mockReviews: Review[] = [
  {
    id: "1",
    clientName: "Marina Silva",
    rating: 5,
    title: "Adorei! Produto de excelente qualidade",
    comment:
      "Recebi o produto bem embalado e em perfeito estado. A qualidade é muito boa mesmo. Recomendo para todos!",
    images: [
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",
    ],
    date: "2 dias atrás",
    verified: true,
    helpful: 45,
    unhelpful: 2,
  },
  {
    id: "2",
    clientName: "Carlos Mendes",
    rating: 4,
    title: "Muito bom, entrega rápida",
    comment:
      "Produto atende perfeitamente às expectativas. Entrega foi rápida e o atendimento excelente.",
    images: ["https://via.placeholder.com/200"],
    date: "1 semana atrás",
    verified: true,
    helpful: 32,
    unhelpful: 1,
  },
  {
    id: "3",
    clientName: "Juliana Costa",
    rating: 5,
    title: "Comprei 3 vezes, sempre perfeito!",
    comment:
      "Já comprei este produto 3 vezes e sempre vem perfeito. Qualidade consistente e preço justo.",
    images: [
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200",
    ],
    date: "2 semanas atrás",
    verified: true,
    helpful: 78,
    unhelpful: 0,
  },
  {
    id: "4",
    clientName: "Felipe Santos",
    rating: 4,
    title: "Bom custo-benefício",
    comment:
      "Produto com boa qualidade pelo preço. Recomendo para quem procura bom custo-benefício.",
    date: "3 semanas atrás",
    verified: true,
    helpful: 23,
    unhelpful: 1,
  },
  {
    id: "5",
    clientName: "Beatriz Oliveira",
    rating: 5,
    title: "Superou minhas expectativas!",
    comment:
      "Não esperava tanta qualidade por esse preço. Produto excelente, entrega rápida. Voltaria a comprar com certeza!",
    images: ["https://via.placeholder.com/200", "https://via.placeholder.com/200"],
    date: "1 mês atrás",
    verified: true,
    helpful: 56,
    unhelpful: 1,
  },
];

export default function ProductDetail() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">(
    "recent"
  );
  const { addItem } = useCart();

  // Calcular estatísticas
  const stats = {
    total: reviews.length,
    average:
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    distribution: {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    },
  };

  // Filtrar e ordenar avaliações
  let filteredReviews = reviews;
  if (selectedRating) {
    filteredReviews = reviews.filter((r) => r.rating === selectedRating);
  }

  if (sortBy === "helpful") {
    filteredReviews = [...filteredReviews].sort(
      (a, b) => b.helpful - a.helpful
    );
  } else if (sortBy === "rating") {
    filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating);
  }

  const handleAddReview = (review: {
    rating: number;
    title: string;
    comment: string;
    images: string[];
  }) => {
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
    <div className="min-h-screen bg-slate-50">
      <main className="container py-8">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 font-medium">
          <ArrowLeft size={18} />
          Voltar para produtos
        </button>

        {/* Product Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={mockProduct.imagem}
              alt={mockProduct.nome}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {mockProduct.nome}
            </h1>
            <p className="text-slate-600 mb-6">{mockProduct.descricaoCompleta}</p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-teal-600">
                R$ {mockProduct.preco.toFixed(2)}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-6 bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3">
                Especificações:
              </h3>
              <ul className="space-y-2">
                {mockProduct.especificacoes.map((spec, index) => (
                  <li key={index} className="text-sm text-slate-700">
                    • {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() =>
                  addItem({
                    nome: mockProduct.nome,
                    preco: mockProduct.preco,
                    quantidade: 1,
                    categoria: mockProduct.categoria,
                  })
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Adicionar ao Carrinho
              </Button>
              <Button
                asChild
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <a href={mockProduct.whatsapp} target="_blank">
                  <MessageCircle size={18} />
                  Comprar via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filter */}
          <div className="lg:col-span-1">
            <ReviewFilter
              stats={stats}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
            />
          </div>

          {/* Main - Reviews */}
          <div className="lg:col-span-3 space-y-8">
            {/* Add Review Form */}
            <ReviewForm
              productName={mockProduct.nome}
              onSubmit={handleAddReview}
            />

            {/* Sort Options */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {filteredReviews.length} Avaliações
              </h2>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "recent" | "helpful" | "rating")
                }
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="recent">Mais Recentes</option>
                <option value="helpful">Mais Úteis</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
                  <p className="text-slate-600">
                    Nenhuma avaliação com essa classificação ainda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
