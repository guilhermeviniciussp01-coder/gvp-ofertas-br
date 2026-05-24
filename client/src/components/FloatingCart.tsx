import { ShoppingCart, X, Trash2, Plus, Minus, MessageCircle, Zap } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function FloatingCart() {
  const { items, itemCount, total, removeItem, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const lista = items.map((i) => `• ${i.quantidade}x ${i.nome} — R$ ${(i.preco * i.quantidade).toFixed(2)}`).join("\n");
    const msg = encodeURIComponent(`Olá! Quero fazer o seguinte pedido:\n\n${lista}\n\n*Total: R$ ${total.toFixed(2)}*\n\nAguardo confirmação! 😊`);
    window.open(`https://wa.me/5596984224137?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-110"
      >
        <ShoppingCart size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>

      {/* PAINEL DO CARRINHO */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* OVERLAY */}
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />

          {/* DRAWER */}
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-orange-500 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-white">
                <ShoppingCart size={20} />
                <span className="font-black text-lg">Meu Carrinho</span>
                {itemCount > 0 && (
                  <span className="bg-white text-orange-500 text-xs font-black px-2 py-0.5 rounded-full">{itemCount}</span>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="text-white hover:text-orange-200 transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* ITENS */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 font-semibold text-lg">Carrinho vazio</p>
                  <p className="text-gray-400 text-sm mt-1">Adicione produtos para continuar</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-colors"
                  >
                    Ver Produtos
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-3 flex gap-3 border border-gray-100">
                      {item.imagem && (
                        <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">{item.nome}</p>
                        {item.categoria && (
                          <span className="text-[10px] text-orange-500 font-semibold">{item.categoria}</span>
                        )}
                        <p className="text-base font-black text-orange-500 mt-1">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">R$ {item.preco.toFixed(2)} cada</p>

                        {/* QUANTIDADE */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.nome, item.quantidade - 1)}
                            className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-black text-gray-900 w-6 text-center">{item.quantidade}</span>
                          <button
                            onClick={() => updateQuantity(item.nome, item.quantidade + 1)}
                            className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.nome)}
                            className="ml-auto w-7 h-7 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* LIMPAR */}
                  <button
                    onClick={clearCart}
                    className="w-full text-xs text-red-400 hover:text-red-600 font-semibold py-2 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={12} />
                    Limpar carrinho
                  </button>
                </div>
              )}
            </div>

            {/* RODAPÉ COM TOTAL E BOTÕES */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-4 bg-white shrink-0">
                {/* RESUMO */}
                <div className="bg-orange-50 rounded-2xl p-3 mb-3 border border-orange-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})</span>
                    <span className="text-sm font-bold text-gray-800">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Frete</span>
                    <span className="text-sm font-bold text-green-600">GRÁTIS ✅</span>
                  </div>
                  <div className="border-t border-orange-200 pt-2 mt-1 flex justify-between items-center">
                    <span className="font-black text-gray-900">Total</span>
                    <span className="text-xl font-black text-orange-500">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* BOTÕES */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <MessageCircle size={18} />
                    Finalizar via WhatsApp
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
