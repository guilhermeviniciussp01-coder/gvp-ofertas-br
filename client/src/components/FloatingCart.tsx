import { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Trash2, Tag, Truck, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  const frete = total > 99 ? 0 : 15.90;
  const totalFinal = total + frete;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    message += `\nSubtotal: R$ ${total.toFixed(2)}`;
    message += frete === 0 ? "\nFrete: GRÁTIS 🎉" : `\nFrete: R$ ${frete.toFixed(2)}`;
    message += `\n*Total: R$ ${totalFinal.toFixed(2)}*\n\nPor favor, confirme a disponibilidade e o endereço de entrega.`;
    window.open(`https://wa.me/5596984224137?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            {itemCount}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:w-96 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-t-3xl sm:rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ShoppingCart size={20} />
                <h2 className="font-black text-lg">Meu Carrinho</h2>
                {itemCount > 0 && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">{itemCount} itens</span>}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Frete Grátis Progress */}
            {total < 99 && total > 0 && (
              <div className="bg-orange-50 px-4 py-3 border-b border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={14} className="text-orange-500" />
                  <span className="text-xs text-orange-700 font-semibold">
                    Falta <span className="font-black">R$ {(99 - total).toFixed(2)}</span> para frete grátis!
                  </span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min((total / 99) * 100, 100)}%` }}></div>
                </div>
              </div>
            )}

            {total >= 99 && total > 0 && (
              <div className="bg-green-50 px-4 py-2 border-b border-green-100 flex items-center gap-2">
                <Truck size={14} className="text-green-500" />
                <span className="text-xs text-green-700 font-bold">🎉 Você ganhou frete grátis!</span>
              </div>
            )}

            {/* Conteúdo */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <ShoppingCart size={40} className="opacity-50" />
                </div>
                <p className="font-bold text-gray-600 text-lg">Carrinho vazio</p>
                <p className="text-sm text-center mt-2 text-gray-400">Adicione produtos para começar suas compras!</p>
                <button onClick={() => setIsOpen(false)} className="mt-4 bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-colors">
                  Ver Produtos
                </button>
              </div>
            ) : (
              <>
                {/* Lista */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.nome} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-2">
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{item.nome}</h3>
                          <p className="text-orange-500 font-black text-base mt-0.5">R$ {item.preco.toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeItem(item.nome)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-gray-100 rounded-xl overflow-hidden">
                          <button onClick={() => updateQuantity(item.nome, item.quantidade - 1)} className="p-2 hover:bg-gray-200 transition-colors text-gray-600">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-black text-sm">{item.quantidade}</span>
                          <button onClick={() => updateQuantity(item.nome, item.quantidade + 1)} className="p-2 hover:bg-gray-200 transition-colors text-gray-600">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-orange-500">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50 rounded-b-3xl">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal ({itemCount} itens)</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1 text-gray-600"><Truck size={14} />Frete</span>
                      <span className={frete === 0 ? "text-green-600 font-bold" : "text-gray-600"}>
                        {frete === 0 ? "GRÁTIS 🎉" : `R$ ${frete.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="font-black text-gray-900">Total</span>
                      <span className="text-2xl font-black text-orange-500">R$ {totalFinal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-2">
                    <Shield size={14} className="text-blue-500 shrink-0" />
                    <span className="text-xs text-blue-600 font-medium">Compra 100% segura e garantida</span>
                  </div>

                  <button onClick={handleWhatsAppOrder} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base">
                    💬 Finalizar no WhatsApp
                  </button>

                  <button onClick={() => { clearCart(); setIsOpen(false); }} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    Limpar Carrinho
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
