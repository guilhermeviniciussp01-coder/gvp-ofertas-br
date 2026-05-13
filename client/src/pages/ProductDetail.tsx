import { useState } from "react";
import { ArrowLeft, MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import ReviewFilter from "@/components/ReviewFilter";
import { useCart } from "@/contexts/CartContext";
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
  const produto = produtos.find((p) => p.id === params?.id) || produtos[0];

  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");
  const { addItem } = useCart();

  const stats = {
    total: reviews.length,
    average: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
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
    <div className="min-h-screen bg-slate-50">
      <main className="container py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 font-medium"
        >
          <ArrowLeft size={18} />
          Voltar para produtos
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={produto.imagem} alt={produto.nome} className="w-full h-96 object-cover" />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{produto.nome}</h1>
            <p className="text-slate-600 mb-6">{produto.descricao}</p>

            <div className="mb-6">
              <p className="text-4xl font-bold text-teal-600">R$ {produto.preco.toFixed(2)}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => addItem({ nome: produto.nome, preco: produto.preco, quantidade: 1, categoria: produto.categoria })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Adicionar ao Carrinho
              </Button>
              <Button
                onClick={() => window.open(`${produto.whatsapp}?text=${encodeURIComponent(`Olá, quero comprar: ${produto.nome}`)}`, "_blank")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Comprar via WhatsApp
              </Button>
              <Button
                onClick={() => window.open(produto.afiliado, "_blank")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Comprar Agora
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ReviewFilter stats={stats} selectedRating={selectedRating} onRatingChange={setSelectedRating} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <ReviewForm productName={produto.nome} onSubmit={handleAddReview} />

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{filteredReviews.length} Avaliações</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "helpful" | "rating")}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="recent">Mais Recentes</option>
                <option value="helpful">Mais Úteis</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => <ReviewCard key={review.id} {...review} />)
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
                  <p className="text-slate-600">Nenhuma avaliação com essa classificação ainda.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
 
