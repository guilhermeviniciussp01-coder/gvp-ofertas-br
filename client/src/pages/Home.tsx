import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import SearchBar from "@/components/SearchBar";
import FloatingCart from "@/components/FloatingCart";
import TrustSection from "@/components/TrustSection";
import { ShoppingBag, Filter, Heart } from "lucide-react";

interface Produto {
  id?: string;
  nome: string;
  descricao: string;
  imagem: string;
  whatsapp: string;
  afiliado: string;
  tipo: "entrega" | "online";
  isMostSold?: boolean;
  unitsLeft?: number;
  preco?: number;
  categoria?: string;
}

interface Testimonial {
  name: string;
  role?: string;
  comment: string;
  rating: number;
  image: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "frete" | "devolucoes" | "pagamentos";
}

const testimonials: Testimonial[] = [
  { name: "Marina Silva", role: "Cliente Verificada", comment: "Adorei a compra! Produto chegou rápido e bem embalado. Recomendo muito a GVP Ofertas BR!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer1-6p29GDCTknEFnJrg6FCqBH.webp" },
  { name: "Carlos Mendes", role: "Cliente Verificado", comment: "Melhor preço que encontrei! Atendimento pelo WhatsApp foi muito rápido e eficiente.", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer2-RBgD9Kz8KeVV3iGg96SzWg.webp" },
  { name: "Juliana Costa", role: "Cliente Verificada", comment: "Comprei 3 vezes já! Sempre com qualidade, preço bom e entrega garantida. Muito satisfeita!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer3-SkdhFw42f6sHoAvf4JHofq.webp" },
  { name: "Felipe Santos", role: "Cliente Verificado", comment: "Produto exatamente como descrito. Confiável demais! Vou continuar comprando aqui.", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer4-T6VaW6fiCFZKDSR4tFG5rf.webp" },
  { name: "Beatriz Oliveira", role: "Cliente Verificada", comment: "Entrega na minha porta, sem complicações. Loja confiável e com ótimos produtos!", rating: 5, image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer5-4A4uGaqn9B6MgeqVGUvsoH.webp" },
];

const produtos: Produto[] = [
  { id: "1", nome: "Resina Extreme Automotiva", descricao: "Resina auto brilho finalizador 500ml. Proteção máxima e brilho incomparável para seu carro.", imagem: "https://i.ibb.co/whQ8XsvY/676241131-1481905673489846-2916311791656238816-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", tipo: "entrega", isMostSold: true, unitsLeft: 5, preco: 89.99, categoria: "Automotivo" },
  { id: "2", nome: "Pistola Massageadora", descricao: "Pistola de massagem profissional com 4 cabeças intercambiáveis e cabo USB.", imagem: "https://i.ibb.co/jXXgg4S/676074914-3904377783199919-7370801944526901153-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0", tipo: "entrega", isMostSold: true, unitsLeft: 8, preco: 79.99, categoria: "Saúde" },
  { id: "3", nome: "Clareador de Manchas AmazoLé", descricao: "Esfoliante clareador que limpa e uniformiza o tom da pele. Combate melasma e manchas.", imagem: "https://i.ibb.co/vvvxyvpM/661731367-730205876750039-6015324742804877210-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-gya94-0", tipo: "entrega", unitsLeft: 6, preco: 120.00, categoria: "Beleza" },
  { id: "4", nome: "Relógio Masculino Original", descricao: "Relógio masculino premium estilo Invicta, dourado, resistente e elegante.", imagem: "https://i.ibb.co/4gTxSQkX/download-1.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-osr5n-0", tipo: "entrega", isMostSold: true, unitsLeft: 3, preco: 85.00, categoria: "Moda" },
  { id: "5", nome: "Relógio Esportivo LED Unissex", descricao: "Relógio digital LED resistente à água, moderno e estiloso para qualquer ocasião.", imagem: "https://i.ibb.co/v4HBjm8t/download.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-zbnq9-0", tipo: "entrega", unitsLeft: 15, preco: 20.00, categoria: "Moda" },
  { id: "6", nome: "Fone de Ouvido Bluetooth TWS", descricao: "Fone A6S Pro MiPods sem fio, conexão Bluetooth, case carregador incluso.", imagem: "https://i.ibb.co/T9Xgdxp/666104100-1387351060086173-8195611779606541336-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-yvlif-0", tipo: "entrega", isMostSold: true, unitsLeft: 10, preco: 49.99, categoria: "Eletrônicos" },
  { id: "7", nome: "Redutor de Conta de Água", descricao: "Economizare: redutor de consumo que economiza até 50% na sua conta de água.", imagem: "https://i.ibb.co/0ph8jSww/676709830-1237086445080329-2628572986454454748-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-uukmi-0", tipo: "entrega", unitsLeft: 4, preco: 149.99, categoria: "Casa" },
  { id: "8", nome: "Kit Completo Churrasco", descricao: "Kit profissional com 20+ utensílios de aço inox para churrasco perfeito.", imagem: "https://i.ibb.co/xwTbkw2/162506261569e7cc5014170277754387iwy320260421161320.webp", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-b5zsk-0", tipo: "entrega", unitsLeft: 7, preco: 148.98, categoria: "Casa" },
  { id: "9", nome: "Kit Massagem EMS", descricao: "Kit com tapete e almofada massageadora EMS para pés e corpo. Alívio de dores.", imagem: "https://i.ibb.co/DH5fpkNC/53455382469e7d3b43406d842267824fijs20260421164452.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-it3g9-0", tipo: "entrega", unitsLeft: 9, preco: 69.98, categoria: "Saúde" },
  { id: "10", nome: "Kit Ferramentas 46 Peças", descricao: "Jogo de soquetes e chaves com maleta, 46 peças em aço inox de alta resistência.", imagem: "https://i.ibb.co/v4nBw8KJ/155772289669e7d82956f83261100227bhtj20260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-kit-yeqi9-0", tipo: "entrega", isMostSold: true, unitsLeft: 6, preco: 78.99, categoria: "Ferramentas" },
  { id: "11", nome: "Escova a Vapor para Pets", descricao: "Escova vaporizadora que limpa, hidrata e remove pelos soltos do seu pet com facilidade.", imagem: "https://i.ibb.co/KzqFrdYt/20680304269e7d829dd8804019041787kd520260421170353.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-nu0kw-0", tipo: "entrega", unitsLeft: 12, preco: 49.99, categoria: "Pets" },
  { id: "12", nome: "Luminária Mata Mosquito", descricao: "Armadilha elétrica UV que elimina mosquitos e insetos silenciosamente. Recarregável USB.", imagem: "https://i.ibb.co/fVp4Q4sh/163632907569e7d82a21d1b313631554w0fx20260421170354.png", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-fdmva-0", tipo: "entrega", unitsLeft: 8, preco: 54.98, categoria: "Casa" },
  { id: "13", nome: "Câmera Lâmpada 360° IP", descricao: "Câmera de segurança em formato de lâmpada, 360°, visão noturna e acesso pelo celular.", imagem: "https://i.ibb.co/wZmz8Wpx/662525763-1261853449409138-4287481202985656184-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-v0gpl-0", tipo: "entrega", isMostSold: true, unitsLeft: 4, preco: 120.00, categoria: "Segurança" },
  { id: "14", nome: "Short Feminino Empina Bumbum", descricao: "Short fitness modelador de cintura alta, tecido premium com compressão e conforto.", imagem: "https://i.ibb.co/fd7JL2pM/663130907-943555138078111-1681655744055148382-n.jpg", whatsapp: "https://wa.me/5596984224137", afiliado: "https://app.coinzz.com.br/checkout/1-unidade-j7ugp-0", tipo: "entrega", unitsLeft: 20, preco: 45.00, categoria: "Moda" },
];

const faqItems: FAQItem[] = [
  { id: "frete-1", category: "frete", question: "Qual é o prazo de entrega?", answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização e do tipo de pagamento escolhido. Para pagamento na entrega, o prazo pode ser um pouco maior. Você receberá o rastreamento do seu pedido por WhatsApp." },
  { id: "frete-2", category: "frete", question: "Vocês entregam em todo o Brasil?", answer: "Sim! Entregamos em todo o Brasil, incluindo regiões remotas. O frete é calculado automaticamente durante o processo de compra. Oferecemos entrega garantida com rastreamento completo." },
  { id: "frete-3", category: "frete", question: "O frete é cobrado à parte?", answer: "Para compras via WhatsApp, o frete é combinado diretamente com nosso atendente. Para compras online, o frete é calculado e adicionado ao total. Temos parcerias com as melhores transportadoras para garantir o melhor preço." },
  { id: "devolucoes-1", category: "devolucoes", question: "Qual é a política de devolução?", answer: "Você tem até 30 dias após o recebimento do produto para solicitar devolução, sem perguntas. Se o produto chegar com defeito ou não for como descrito, fazemos a troca ou reembolso imediatamente." },
  { id: "devolucoes-2", category: "devolucoes", question: "Como faço para devolver um produto?", answer: "Entre em contato conosco pelo WhatsApp com a foto do produto e o motivo da devolução. Enviaremos um código de devolução e as instruções de envio. O frete de devolução é por nossa conta em caso de defeito ou erro nosso." },
  { id: "devolucoes-3", category: "devolucoes", question: "Quanto tempo leva para receber o reembolso?", answer: "Após recebermos o produto devolvido e verificarmos as condições, o reembolso é processado em até 5 dias úteis. Para pagamento na entrega, o dinheiro é devolvido na próxima entrega do nosso parceiro." },
  { id: "pagamentos-1", category: "pagamentos", question: "Quais são as formas de pagamento?", answer: "Oferecemos duas principais formas: Pagamento na Entrega (você paga quando recebe o produto) e Compra Online (cartão de crédito, débito ou transferência). Todas as transações são 100% seguras." },
  { id: "pagamentos-2", category: "pagamentos", question: "É seguro pagar com cartão?", answer: "Sim! Utilizamos os melhores sistemas de segurança do mercado. Seus dados de cartão são criptografados e nunca são armazenados em nossos servidores. Temos certificação SSL e PCI compliance." },
  { id: "pagamentos-3", category: "pagamentos", question: "Posso parcelar a compra?", answer: "Sim! Oferecemos parcelamento em até 12x sem juros para compras acima de R$ 100. O parcelamento é processado automaticamente no checkout. Consulte as condições específicas de cada produto." },
];

export default function Home() {
  const [filtro, setFiltro] = useState<"todos" | "entrega" | "online">("todos");
  const [faqCategory, setFaqCategory] = useState<"todos" | "frete" | "devolucoes" | "pagamentos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categorias = ["Automotivo", "Saúde", "Beleza", "Moda", "Eletrônicos", "Casa", "Ferramentas", "Pets", "Segurança"];

  const produtosFiltrados = produtos.filter((p) => {
    if (filtro !== "todos" && p.tipo !== filtro) return false;
    if (searchQuery && !p.nome.toLowerCase().includes(searchQuery.toLowerCase()) && !p.descricao.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (p.preco && (p.preco < minPrice || p.preco > maxPrice)) return false;
    if (selectedCategory !== "todos" && p.categoria !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-gray-900">GVP Ofertas BR</h1>
                <p className="text-xs text-gray-500">Melhor preço garantido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="/favoritos" className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors">
                <Heart size={24} />
                <span className="hidden md:inline text-sm font-semibold">Favoritos</span>
              </a>
              <div className="md:hidden">
                <Filter size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button onClick={() => setFiltro("todos")} variant={filtro === "todos" ? "default" : "outline"} className={`whitespace-nowrap transition-all duration-200 ${filtro === "todos" ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md" : "border-gray-300 hover:border-orange-500"}`}>Todos</Button>
            <Button onClick={() => setFiltro("entrega")} variant={filtro === "entrega" ? "default" : "outline"} className={`whitespace-nowrap transition-all duration-200 ${filtro === "entrega" ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md" : "border-gray-300 hover:border-blue-600"}`}>🚚 Pagamento na Entrega</Button>
            <Button onClick={() => setFiltro("online")} variant={filtro === "online" ? "default" : "outline"} className={`whitespace-nowrap transition-all duration-200 ${filtro === "online" ? "bg-green-600 hover:bg-green-700 text-white shadow-md" : "border-gray-300 hover:border-green-600"}`}>💳 Compra Online</Button>
          </div>
        </div>
      </header>

      <SearchBar onSearch={setSearchQuery} onPriceFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); }} onCategoryFilter={setSelectedCategory} categories={categorias} />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 sm:p-12 border border-orange-200">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">🔥 Ofertas Imperdíveis</h2>
          <p className="text-gray-600 text-lg mb-6">Encontre os melhores produtos com os menores preços. Entrega rápida e segura!</p>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg"><span className="text-lg">✓</span>Entrega Garantida</div>
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-lg"><span className="text-lg">✓</span>Compra Segura</div>
            <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-100 px-3 py-2 rounded-lg"><span className="text-lg">✓</span>Suporte 24/7</div>
          </div>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {produtosFiltrados.map((produto, index) => (
              <ProductCard key={index} id={produto.id} nome={produto.nome} descricao={produto.descricao} imagem={produto.imagem} whatsapp={produto.whatsapp} afiliado={produto.afiliado} tipo={produto.tipo} isMostSold={produto.isMostSold} unitsLeft={produto.unitsLeft} preco={produto.preco} categoria={produto.categoria} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}

        <section className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">⭐ O Que Nossos Clientes Dizem</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Milhares de clientes satisfeitos compram regularmente na GVP Ofertas BR.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} name={testimonial.name} role={testimonial.role} comment={testimonial.comment} rating={testimonial.rating} image={testimonial.image} />
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-8 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div><div className="font-display text-3xl font-bold text-orange-600 mb-2">4.9★</div><p className="text-gray-600">Avaliação Média</p></div>
              <div><div className="font-display text-3xl font-bold text-blue-600 mb-2">5.000+</div><p className="text-gray-600">Clientes Satisfeitos</p></div>
              <div><div className="font-display text-3xl font-bold text-green-600 mb-2">100%</div><p className="text-gray-600">Entrega Garantida</p></div>
            </div>
          </div>
        </section>

        <TrustSection />

        <section className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">❓ Perguntas Frequentes</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Tire suas dúvidas sobre frete, devoluções, pagamentos e muito mais.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button onClick={() => setFaqCategory("todos")} className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${faqCategory === "todos" ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Todos</button>
            <button onClick={() => setFaqCategory("frete")} className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${faqCategory === "frete" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>🚚 Frete</button>
            <button onClick={() => setFaqCategory("devolucoes")} className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${faqCategory === "devolucoes" ? "bg-green-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>🔄 Devoluções</button>
            <button onClick={() => setFaqCategory("pagamentos")} className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${faqCategory === "pagamentos" ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>💳 Pagamentos</button>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqCategory === "todos" ? faqItems : faqItems.filter((item) => item.category === faqCategory)} />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-3">GVP Ofertas BR</h3>
              <p className="text-gray-400 text-sm">Sua loja online de confiança com os melhores preços e entrega garantida.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="https://wa.me/5596984224137" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">💬 WhatsApp</a></li>
                <li><a href="mailto:contato@gvpofertasbr.com" className="hover:text-white transition-colors">📧 Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2025 GVP Ofertas BR. Todos os direitos reservados.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <span>🔒 Pagamento Seguro</span>
                <span>🚚 Entrega Rápida</span>
                <span>⭐ Avaliações Verificadas</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FloatingCart />
    </div>
  );
}
