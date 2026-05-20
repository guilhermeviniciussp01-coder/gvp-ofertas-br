import { ArrowLeft, Clock, Tag } from "lucide-react";
import { useState } from "react";
const posts = [
  {
    id: "1",
    titulo: "Como deixar seu carro brilhando com Resina Automotiva",
    resumo: "Aprenda o passo a passo para aplicar resina automotiva e deixar seu carro com brilho de showroom.",
    categoria: "Automotivo",
    tempo: "3 min",
    emoji: "🚗",
    conteudo: "A resina automotiva é um dos melhores produtos para proteger e realçar o brilho do seu carro. Para aplicar corretamente: 1) Lave e seque bem o carro. 2) Aplique a resina em movimentos circulares. 3) Aguarde secar por 5 minutos. 4) Polir com pano macio. O resultado é incrível!"
  },
  {
    id: "2",
    titulo: "5 benefícios da Pistola Massageadora para sua saúde",
    resumo: "Descubra como a pistola massageadora pode aliviar dores musculares e melhorar sua qualidade de vida.",
    categoria: "Saúde",
    tempo: "4 min",
    emoji: "💪",
    conteudo: "A pistola massageadora é usada por atletas profissionais e fisioterapeutas. Seus benefícios incluem: alivio de dores musculares, melhora da circulação, redução do estresse, aceleração da recuperação pós-treino e melhora da mobilidade articular."
  },
  {
    id: "3",
    titulo: "Como eliminar manchas de melasma com o Clareador AmazoLé",
    resumo: "Dicas práticas para usar o clareador e ter resultados visíveis em poucas semanas.",
    categoria: "Beleza",
    tempo: "5 min",
    emoji: "✨",
    conteudo: "O clareador AmazoLé é formulado com ingredientes naturais que combatem o melasma de forma eficaz. Use diariamente após lavar o rosto, aplique em movimentos circulares nas manchas e use protetor solar durante o dia para potencializar os resultados."
  },
  {
    id: "4",
    titulo: "Fone Bluetooth TWS: como escolher o melhor",
    resumo: "Guia completo para escolher o fone bluetooth ideal para seu estilo de vida.",
    categoria: "Eletrônicos",
    tempo: "4 min",
    emoji: "🎧",
    conteudo: "Na hora de escolher um fone TWS, considere: qualidade do som, autonomia da bateria, conforto, resistência à água e conectividade. O A6S Pro MiPods oferece tudo isso com excelente custo-benefício."
  },
  {
    id: "5",
    titulo: "Economize até 50% na conta de água com o Economizare",
    resumo: "Saiba como o redutor de consumo pode fazer uma grande diferença na sua conta de água.",
    categoria: "Casa",
    tempo: "3 min",
    emoji: "💧",
    conteudo: "O Economizare reduz o fluxo de água sem comprometer a pressão. Basta instalar no registro e começar a economizar imediatamente. Famílias relatam economia de até 50% na conta de água desde o primeiro mês de uso."
  },
  {
    id: "6",
    titulo: "Kit Churrasco: como fazer o churrasco perfeito",
    resumo: "Dicas dos melhores churrasqueiros para um churrasco inesquecível com o kit completo.",
    categoria: "Casa",
    tempo: "6 min",
    emoji: "🔥",
    conteudo: "Um bom churrasco começa com os utensílios certos. Com o Kit Completo de Churrasco você tem tudo que precisa: espátulas, grelhas, pinças e muito mais. Tempere a carne com antecedência e mantenha o fogo constante para um resultado perfeito."
  },
];

export default function Blog() {
  const [postAberto, setPostAberto] = useState<typeof posts[0] | null>(null);

  if (postAberto) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setPostAberto(null)} className="text-white"><ArrowLeft size={24} /></button>
            <span className="text-white font-bold text-lg truncate">{postAberto.titulo}</span>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-6xl mb-4 text-center">{postAberto.emoji}</div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">{postAberto.categoria}</span>
              <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={12} />{postAberto.tempo} de leitura</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-4">{postAberto.titulo}</h1>
            <p className="text-gray-600 leading-relaxed">{postAberto.conteudo}</p>
            <div className="mt-8 bg-orange-50 rounded-2xl p-4 border border-orange-100">
              <p className="text-orange-700 font-bold text-sm mb-3">🛍️ Quer comprar esse produto?</p>
              <button onClick={() => window.location.href = "/"} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
                Ver Produtos
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white"><ArrowLeft size={24} /></button>
          <span className="text-white font-bold text-lg">Blog de Dicas</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 text-white text-center">
          <h1 className="text-2xl font-black mb-2">📚 Blog GVP Ofertas</h1>
          <p className="text-white/80 text-sm">Dicas e tutoriais sobre nossos produtos</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <button key={post.id} onClick={() => setPostAberto(post)} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0">{post.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">{post.categoria}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{post.tempo}</span>
                  </div>
                  <h2 className="font-black text-gray-900 text-base mb-1 line-clamp-2">{post.titulo}</h2>
                  <p className="text-gray-500 text-sm line-clamp-2">{post.resumo}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
