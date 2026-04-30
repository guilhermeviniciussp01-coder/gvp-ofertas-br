import { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

/**
 * FloatingCart - Carrinho de Compras Flutuante
 * 
 * Design Philosophy: Marketplace Moderno (Shopee-inspired)
 * - Botão flutuante com ícone de carrinho
 * - Modal com lista de produtos
 * - Ajuste de quantidade com botões +/-
 * - Cálculo automático de total
 * - Botão para finalizar pedido no WhatsApp
 */
export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Montar mensagem com os produtos
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    message += `\n*Total: R$ ${total.toFixed(2)}*\n\nPor favor, confirme a disponibilidade e o frete.`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5596984224137?text=${encodedMessage}`;

    // Abrir WhatsApp e limpar carrinho
    window.open(whatsappUrl, "_blank");
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Modal do Carrinho */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Carrinho */}
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-96 max-h-[80vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20} />
                Meu Carrinho
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Conteúdo */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
                <ShoppingCart size={48} className="mb-4 opacity-50" />
                <p className="text-center font-semibold">Carrinho vazio</p>
                <p className="text-sm text-center mt-2">
                  Adicione produtos para começar suas compras
                </p>
              </div>
            ) : (
              <>
                {/* Lista de Produtos */}
                <div className="flex-1 divide-y divide-gray-200">
                  {items.map((item) => (
                    <div
                      key={item.nome}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.nome}
                          </h3>
                          <p className="text-sm text-gray-600">
                            R$ {item.preco.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.nome)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Controle de Quantidade */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg w-fit">
                        <button
                          onClick={() =>
                            updateQuantity(item.nome, item.quantidade - 1)
                          }
                          className="p-2 hover:bg-gray-200 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.nome, item.quantidade + 1)
                          }
                          className="p-2 hover:bg-gray-200 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <p className="text-right mt-3 font-semibold text-orange-600">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer com Total e Botão */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 space-y-3">
                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>

                  {/* Botões de Ação */}
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      💬 Finalizar no WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        clearCart();
                        setIsOpen(false);
                      }}
                      className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
