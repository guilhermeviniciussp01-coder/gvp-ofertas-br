import { ArrowLeft, ShoppingBag, Heart, Shield, Truck, Star } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white"><ArrowLeft size={24} /></button>
          <span className="text-white font-bold text-lg">Sobre Nós</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-2xl"><ShoppingBag size={24} className="text-white" /></div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">GVP Ofertas BR</h1>
              <p className="text-orange-500 text-sm font-semibold">Sua loja de confiança</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Somos uma loja online dedicada a oferecer os melhores produtos com os menores preços do Brasil. 
            Nossa missão é proporcionar uma experiência de compra segura e conveniente, com pagamento na entrega disponível em todo o território nacional.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-orange-500">5k+</div>
              <p className="text-gray-500 text-xs mt-1">Clientes Satisfeitos</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-green-500">4.9★</div>
              <p className="text-gray-500 text-xs mt-1">Avaliação Média</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-blue-500">20+</div>
              <p className="text-gray-500 text-xs mt-1">Produtos</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-purple-500">100%</div>
              <p className="text-gray-500 text-xs mt-1">Entrega Garantida</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full shrink-0"><Truck size={20} className="text-green-500" /></div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Entrega em Todo o Brasil</h3>
              <p className="text-gray-600 text-sm">Entregamos em todos os estados brasileiros com rastreamento completo do pedido.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0"><Shield size={20} className="text-blue-500" /></div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Compra 100% Segura</h3>
              <p className="text-gray-600 text-sm">Suas informações são protegidas e a compra é garantida. Pagamento na entrega disponível.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0"><Heart size={20} className="text-red-500" /></div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Atendimento Personalizado</h3>
              <p className="text-gray-600 text-sm">Nossa equipe está disponível pelo WhatsApp para ajudar com qualquer dúvida.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="bg-yellow-100 p-3 rounded-full shrink-0"><Star size={20} className="text-yellow-500" /></div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Produtos de Qualidade</h3>
              <p className="text-gray-600 text-sm">Selecionamos cuidadosamente cada produto para garantir a melhor experiência.</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500 rounded-2xl p-6 text-center text-white">
          <h3 className="font-black text-xl mb-2">Entre em Contato</h3>
          <p className="text-white/80 text-sm mb-4">Estamos aqui para ajudar!</p>
          <button
            onClick={() => window.open("https://wa.me/5596984224137", "_blank")}
            className="bg-white text-orange-500 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
          >
            💬 Falar no WhatsApp
          </button>
        </div>
      </main>
    </div>
  );
}
