import { ArrowLeft, Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-white"><ArrowLeft size={24} /></button>
          <span className="text-white font-bold text-lg">Política de Privacidade</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-full"><Shield size={24} className="text-orange-500" /></div>
            <h1 className="text-2xl font-black text-gray-900">Política de Privacidade</h1>
          </div>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">1. Informações que Coletamos</h2>
              <p>Coletamos informações que você nos fornece diretamente, como nome, número de telefone e endereço para entrega quando você realiza uma compra ou entra em contato conosco pelo WhatsApp.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">2. Como Usamos suas Informações</h2>
              <p>Usamos suas informações para processar pedidos, entrar em contato sobre sua compra, enviar confirmações de pedido e melhorar nossos serviços.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">3. Compartilhamento de Informações</h2>
              <p>Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto para parceiros de entrega necessários para completar seu pedido.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">4. Segurança dos Dados</h2>
              <p>Implementamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">5. Seus Direitos (LGPD)</h2>
              <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir ou excluir seus dados pessoais. Entre em contato conosco pelo WhatsApp para exercer esses direitos.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">6. Cookies</h2>
              <p>Usamos cookies para melhorar sua experiência de navegação. Você pode desativar cookies nas configurações do seu navegador.</p>
            </section>
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">7. Contato</h2>
              <p>Para dúvidas sobre nossa política de privacidade, entre em contato pelo WhatsApp: +55 96 98422-4137</p>
            </section>
            <p className="text-xs text-gray-400">Última atualização: Janeiro de 2025</p>
          </div>
        </div>
      </main>
    </div>
  );
}
