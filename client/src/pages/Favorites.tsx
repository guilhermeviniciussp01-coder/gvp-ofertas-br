import { Heart, ShoppingCart, MessageCircle, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

/**
 * Favorites Page
 * 
 * Design Philosophy: Clean Favorites Management
 * - Listagem de produtos favoritos
 * - Botões para remover ou adicionar ao carrinho
 * - Página vazia com CTA
 * - Integração com carrinho
 */

export default function Favorites() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { addItem } = useCart();
  const [removedItem, setRemovedItem] = useState<string | null>(null);

  const handleRemove = (productId: string) => {
    removeFavorite(productId);
    setRemovedItem(productId);
    setTimeout(() => setRemovedItem(null), 2000);
  };

  const handleAddToCart = (product: any) => {
    addItem({
      nome: product.nome,
      preco: product.preco,
      quantidade: 1,
      categoria: product.categoria,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <a
              href="/"
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 font-medium"
            >
              <ArrowLeft size={18} />
              Voltar para Home
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Heart className="fill-red-500 text-red-500" size={32} />
              Meus Favoritos
            </h1>
            <p className="text-slate-600 mt-2">
              {favorites.length} produto{favorites.length !== 1 ? "s" : ""} salvo
              {favorites.length !== 1 ? "s" : ""}
            </p>
          </div>

          {favorites.length > 0 && (
            <Button
              onClick={clearFavorites}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Limpar Favoritos
            </Button>
          )}
        </div>

        {/* Notification */}
        {removedItem && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <span>✓</span>
            <span>Produto removido dos favoritos</span>
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-dashed border-slate-300 p-12 text-center">
            <Heart className="mx-auto mb-4 text-slate-400" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Nenhum Favorito Ainda
            </h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Clique no ícone de coração nos produtos para salvá-los aqui e
              acompanhar as melhores ofertas!
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Explorar Produtos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-slate-100 h-48">
                  <img
                    src={product.imagem}
                    alt={product.nome}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-md"
                  >
                    <Heart className="fill-white" size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Category */}
                  <p className="text-xs font-semibold text-teal-600 uppercase mb-1">
                    {product.categoria}
                  </p>

                  {/* Name */}
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                    {product.nome}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-teal-600">
                      R$ {product.preco.toFixed(2)}
                    </p>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-slate-500 mb-4">
                    Adicionado em{" "}
                    {new Date(product.addedAt).toLocaleDateString("pt-BR")}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Adicionar ao Carrinho
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <a
                        href={`https://wa.me/5596984224137?text=Olá%2C%20quero%20comprar%20esse%20produto%3A%20${encodeURIComponent(product.nome)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {favorites.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Quer adicionar mais produtos?</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Continuar Comprando
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
