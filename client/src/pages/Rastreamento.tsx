import { useState } from "react";
import { ArrowLeft, Package, Truck, MapPin, CheckCircle, Clock, Search } from "lucide-react";

const etapas = [
  { icone: <CheckCircle size={20} className="text-green-500" />, titulo: "Pedido Confirmado", sub: "Seu pedido foi recebido", feito: true },
  { icone: <Package size={20} className="text-green-500" />, titulo: "Em Preparação", sub: "Produto sendo embalado", feito: true },
  { icone: <Truck size={20} className="text-orange-500" />, titulo: "Em Transporte", sub: "A caminho de você", feito: true, ativo: true },
  { icone: <MapPin size={20} className="text-gray-300" />, titulo: "Saiu para Entrega", sub: "Chegando hoje", feito: false },
  { icone: <CheckCircle size={20} className="text-gray-300" />, titulo: "Entregue", sub: "Produto recebido", feito: false },
];

export default function Rastreamento() {
  const [codigo, setCodigo] = useState("");
  const [buscado, setBuscado] = useState(false);

  const handleBuscar = () => {
    if (codigo.trim().length > 5) setBuscado(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white hover:text-orange-200 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <span className="text-white font-bold text-lg">Rastrear Pedido</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        {/* BUSCA */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h2 className="text-lg font-black text-gray-900 mb-1">🔍 Rastreie seu pedido</h2>
          <p className="text-sm text-gray-500 mb-4">Digite o código de rastreamento enviado pelo WhatsApp</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: BR123456789BR"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              className="flex-1 border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none font-mono"
            />
            <button
              onClick={handleBuscar}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-bold transition-colors flex items-center gap-1"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* RESULTADO */}
        {buscado && (
          <>
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500">Código de rastreamento</p>
                  <p className="font-black text-gray-900 font-mono">{codigo}</p>
                </div>
                <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1.5 rounded-full border border-orange-200">
                  🚚 Em Transporte
                </span>
              </div>

              {/* LINHA DO TEMPO */}
              <div className="space-y-1">
                {etapas.map((etapa, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`p-1.5 rounded-full ${etapa.feito ? "bg-green-50" : "bg-gray-50"} ${etapa.ativo ? "ring-2 ring-orange-400 ring-offset-1" : ""}`}>
                        {etapa.icone}
                      </div>
                      {i < etapas.length - 1 && (
                        <div className={`w-0.5 h-8 mt-1 ${etapa.feito ? "bg-green-300" : "bg-gray-200"}`} />
                      )}
                    </div>
                    <div className="pt-1.5 pb-4">
                      <p className={`text-sm font-bold ${etapa.feito ? "text-gray-900" : "text-gray-400"}`}>{etapa.titulo}</p>
                      <p className={`text-xs ${etapa.feito ? "text-gray-500" : "text-gray-300"}`}>{etapa.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRAZO */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
              <Clock size={20} className="text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-orange-700">Previsão de entrega</p>
                <p className="text-xs text-orange-600">3 a 7 dias úteis após o despacho</p>
              </div>
            </div>

            {/* CORREIOS */}
            <a
              href={`https://rastreamento.correios.com.br/app/index.php`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow transition-colors"
            >
              <Package size={18} />
              Ver nos Correios
            </a>
          </>
        )}

        {/* SEM CÓDIGO */}
        {!buscado && (
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-5xl mb-3">📦</div>
            <p className="font-bold text-gray-700 mb-1">Não tem o código ainda?</p>
            <p className="text-sm text-gray-500 mb-4">O código é enviado via WhatsApp após a confirmação do pedido.</p>
            <a
              href="https://wa.me/5596984224137?text=Olá! Quero saber o código de rastreamento do meu pedido."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-2xl text-sm transition-colors"
            >
              💬 Pedir código no WhatsApp
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
