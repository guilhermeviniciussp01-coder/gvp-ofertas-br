import { Shield, Lock, CheckCircle, Award, Zap, Heart } from "lucide-react";

/**
 * TrustSection Component
 * 
 * Design Philosophy: Premium Trust Indicators
 * - Certificados de segurança e conformidade
 * - Selos de confiança visual
 * - Garantias e proteções ao cliente
 * - Indicadores de qualidade
 */

export default function TrustSection() {
  const trustItems = [
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Sua compra é 100% protegida",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Lock,
      title: "Dados Criptografados",
      description: "Certificado SSL 256-bit",
      color: "from-green-500 to-green-600",
    },
    {
      icon: CheckCircle,
      title: "Garantia de Devolução",
      description: "30 dias sem perguntas",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      title: "Loja Verificada",
      description: "Certificação LGPD",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Zap,
      title: "Suporte 24/7",
      description: "Resposta em até 2 horas",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Heart,
      title: "Satisfação Garantida",
      description: "Ou seu dinheiro de volta",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            🛡️ Compre com Confiança
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Milhares de clientes confiam em nós. Sua segurança e satisfação são nossas prioridades.
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
              >
                <div className={`bg-gradient-to-br ${item.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Certificações e Conformidades
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* SSL Certificate */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-green-50 to-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 border-green-300">
                <Lock className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900 text-center">SSL 256-bit</p>
              <p className="text-xs text-slate-500 text-center mt-1">Criptografia</p>
            </div>

            {/* LGPD */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 border-blue-300">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900 text-center">LGPD</p>
              <p className="text-xs text-slate-500 text-center mt-1">Privacidade</p>
            </div>

            {/* PCI-DSS */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 border-purple-300">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900 text-center">PCI-DSS</p>
              <p className="text-xs text-slate-500 text-center mt-1">Pagamentos</p>
            </div>

            {/* Verified */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 border-amber-300">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-sm font-semibold text-slate-900 text-center">Verificado</p>
              <p className="text-xs text-slate-500 text-center mt-1">Loja Oficial</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <p className="text-4xl font-bold mb-2">50.000+</p>
            <p className="text-blue-100">Clientes Satisfeitos</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
            <p className="text-4xl font-bold mb-2">99.8%</p>
            <p className="text-green-100">Taxa de Satisfação</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <p className="text-4xl font-bold mb-2">24/7</p>
            <p className="text-purple-100">Suporte Disponível</p>
          </div>
        </div>
      </div>
    </section>
  );
}
