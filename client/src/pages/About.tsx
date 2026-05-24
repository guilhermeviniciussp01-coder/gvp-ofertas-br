import { ArrowLeft, Shield, Truck, Heart, Star, Users, Package, BadgeCheck } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white hover:text-orange-200 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <span className="text-white font-bold text-lg">Sobre a GVP Ofertas BR</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">

        {/* HERO */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center mb-4 shadow-lg">
          <div className="bg-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow">
            <svg viewBox="0 0 60 60" width="48" height="48">
              <circle cx="30" cy="30" r="30" fill="#f97316" />
              <text x="30" y="42" textAnchor="middle" fontSize="32" fontWeight="900" fill="white" fontFamily="Arial">G</text>
            </svg>
          </div>
          <h1 className="text-2xl font-black mb-1">GVP Ofertas BR</h1>
          <p className="text-orange-100 text-sm">Sua loja de confiança com os melhores preços do Brasil 🇧🇷</p>
        </div>

        {/* NOSSA HISTÓRIA */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
            <Heart size={18} className="text-orange-500" />
            Nossa História
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            A <strong>GVP Ofertas BR</strong> nasceu com um objetivo simples: trazer os melhores produtos do mercado com preços justos e entrega garantida para todo o Brasil.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Sabemos que comprar online pode gerar insegurança. Por isso, oferecemos o <strong>pagamento na entrega</strong> — você só paga quando o produto estiver nas suas mãos.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Atendemos mais de <strong>5.000 clientes</strong> em todo o Brasil, sempre com qualidade, transparência e o melhor atendimento via WhatsApp.
          </p>
        </div>

        {/* NÚMEROS */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: <Users size={22} className="text-orange-500" />, numero: "5.000+", texto: "Clientes satisfeitos", bg: "bg-orange-50 border-orange-100" },
            { icon: <Star size={22} className="text-yellow-500 fill-yellow-400" />, numero: "4.9★", texto: "Avaliação média", bg: "bg-yellow-50 border-yellow-100" },
            { icon: <Package size={22} className="text-blue-500" />, numero: "20+", texto: "Produtos disponíveis", bg: "bg-blue-50 border-blue-100" },
            { icon: <Truck size={22} className="text-green-500" />, numero: "100%", texto: "Entregas garantidas", bg: "bg-green-50 border-green-100" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} border rounded-2xl p-4 flex flex-col items-center text-center gap-2`}>
              {item.icon}
              <span className="text-2xl font-black text-gray-900">{item.numero}</span>
              <span className="text-xs text-gray-500 font-medium">{item.texto}</span>
            </div>
          ))}
        </div>

        {/* DIFERENCIAIS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <BadgeCheck size={18} className="text-orange-500" />
            Por que comprar aqui?
          </h2>
          <div className="space-y-3">
            {[
              { icon: <Truck size={18} className="text-green-500" />, titulo: "Pagamento na Entrega", sub: "Pague só quando receber. Zero risco para você.", bg: "bg-green-50 border-green-100" },
              { icon: <Shield size={18} className="text-blue-500" />, titulo: "Compra 100% Segura", sub: "Site com certificado SSL e dados protegidos.", bg: "bg-blue-50 border-blue-100" },
              { icon: <BadgeCheck size={18} className="text-orange-500" />, titulo: "Produtos Originais", sub: "Todos os produtos são verificados antes do envio.", bg: "bg-orange-50 border-orange-100" },
              { icon: <Heart size={18} className="text-red-500" />, titulo: "Suporte Humanizado", sub: "Atendimento real via WhatsApp, sem robôs.", bg: "bg-red-50 border-red-100" },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} border rounded-xl p-3 flex items-center gap-3`}>
                <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">{item.icon}</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.titulo}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTATO */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-5 text-white text-center shadow-lg mb-4">
          <p className="font-black text-lg mb-1">Ficou com dúvida?</p>
          <p className="text-green-100 text-sm mb-4">Nossa equipe está pronta para te atender agora!</p>
          <a
            href="https://wa.me/5596984224137?text=Olá! Vim pelo site GVP Ofertas BR e tenho uma dúvida."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-black px-6 py-3 rounded-2xl text-sm shadow hover:bg-green-50 transition-colors"
          >
            💬 Falar no WhatsApp
          </a>
        </div>

      </main>
    </div>
  );
}
