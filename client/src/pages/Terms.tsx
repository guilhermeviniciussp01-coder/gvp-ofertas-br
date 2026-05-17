import { ArrowLeft, FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white"><ArrowLeft size={24} /></button>
          <span className="text-white font-bold text-lg">Termos de Serviço</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-full"><FileText size={24} className="text-orange-500" /></div>
            <h1 className="text-2xl font-black text-gray-900">Termos de Serviço</h1>
          </div>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">1. Aceitação dos Termos</h2>
              <p>Ao acessar e usar o site GVP Ofertas BR, você concorda com estes Termos de Serviço. Se não concordar, por favor não utilize nosso site.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">2. Produtos e Preços</h2>
              <p>Todos os produtos exibidos estão sujeitos à disponibilidade. Os preços podem ser alterados sem aviso prévio. Nos reservamos o direito de cancelar pedidos em caso de erro de preço.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">3. Pagamento</h2>
              <p>Aceitamos pagamento na entrega e compra online. Para pagamento na entrega, o valor deve ser pago no momento do recebimento do produto.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">4. Entrega</h2>
              <p>Entregamos em todo o Brasil. O prazo de entrega varia de 3 a 7 dias úteis. O frete é calculado no momento da compra.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">5. Devoluções e Reembolsos</h2>
              <p>Você tem até 30 dias após o recebimento para solicitar devolução. O produto deve estar em perfeitas condições. O reembolso é processado em até 5 dias úteis.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">6. Responsabilidade</h2>
              <p>Não nos responsabilizamos por danos indiretos decorrentes do uso dos produtos. Nossa responsabilidade é limitada ao valor pago pelo produto.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">7. Alterações nos Termos</h2>
              <p>Podemos atualizar estes termos a qualquer momento. Alterações entram em vigor imediatamente após publicação no site.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">8. Contato</h2>
              <p>Para dúvidas sobre os termos, entre em contato pelo WhatsApp: +55 96 98422-4137</p>
            </section>
            <p className="text-xs text-gray-400">Última atualização: Janeiro de 2025</p>
          </div>
        </div>
      </main>
    </div>
  );
}
