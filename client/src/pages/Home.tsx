import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag, Filter } from "lucide-react";

/**
 * Home Page - Loja GVP Ofertas BR
 * 
 * Design Philosophy: Marketplace Moderno (Shopee-inspired)
 * - Header sticky com filtros
 * - Hero section com destaque
 * - Grid responsivo de produtos
 * - Filtros por tipo de pagamento
 * - Footer com informações de confiança
 */

interface Produto {
  nome: string;
  descricao: string;
  imagem: string;
  whatsapp: string;
  afiliado: string;
  tipo: "entrega" | "online";
  isMostSold?: boolean;
  unitsLeft?: number;
}

const produtos: Produto[] = [
  {
    nome: "Produto 1",
    descricao: "Descrição do produto",
    imagem: "https://via.placeholder.com/400x400?text=Produto+1",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://seulinkafiliado.com",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 3,
  },
  {
    nome: "Produto 2",
    descricao: "Outro produto",
    imagem: "https://via.placeholder.com/400x400?text=Produto+2",
    whatsapp: "https://wa.me/5599999999999",
    afiliado: "https://seulinkafiliado.com",
    tipo: "online",
    unitsLeft: 12,
  },
  {
    nome: "Produto 3",
    descricao: "Terceiro produto",
    imagem: "https://via.placeholder.com/400x400?text=Produto+3",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://seulinkafiliado.com",
    tipo: "entrega",
    unitsLeft: 8,
  },
  {
    nome: "Produto 4",
    descricao: "Quarto produto",
    imagem: "https://via.placeholder.com/400x400?text=Produto+4",
    whatsapp: "https://wa.me/5599999999999",
    afiliado: "https://seulinkafiliado.com",
    tipo: "online",
    isMostSold: true,
    unitsLeft: 2,
  },
];

export default function Home() {
  const [filtro, setFiltro] = useState<"todos" | "entrega" | "online">("todos");

  const produtosFiltrados = produtos.filter((p) => {
    if (filtro === "todos") return true;
    return p.tipo === filtro;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Sticky */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                  GVP Ofertas BR
                </h1>
                <p className="text-xs text-gray-500">Melhor preço garantido</p>
              </div>
            </div>

            {/* Filter Icon (Mobile) */}
            <div className="md:hidden">
              <Filter size={24} className="text-gray-600" />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              onClick={() => setFiltro("todos")}
              variant={filtro === "todos" ? "default" : "outline"}
              className={`whitespace-nowrap transition-all duration-200 ${
                filtro === "todos"
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                  : "border-gray-300 hover:border-orange-500"
              }`}
            >
              Todos
            </Button>
            <Button
              onClick={() => setFiltro("entrega")}
              variant={filtro === "entrega" ? "default" : "outline"}
              className={`whitespace-nowrap transition-all duration-200 ${
                filtro === "entrega"
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "border-gray-300 hover:border-blue-600"
              }`}
            >
              🚚 Pagamento na Entrega
            </Button>
            <Button
              onClick={() => setFiltro("online")}
              variant={filtro === "online" ? "default" : "outline"}
              className={`whitespace-nowrap transition-all duration-200 ${
                filtro === "online"
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                  : "border-gray-300 hover:border-green-600"
              }`}
            >
              💳 Compra Online
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 sm:p-12 border border-orange-200">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            🔥 Ofertas Imperdíveis
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Encontre os melhores produtos com os menores preços. Entrega rápida e
            segura!
          </p>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg">
              <span className="text-lg">✓</span>
              Entrega Garantida
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-lg">
              <span className="text-lg">✓</span>
              Compra Segura
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-100 px-3 py-2 rounded-lg">
              <span className="text-lg">✓</span>
              Suporte 24/7
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {produtosFiltrados.map((produto, index) => (
              <ProductCard
                key={index}
                nome={produto.nome}
                descricao={produto.descricao}
                imagem={produto.imagem}
                whatsapp={produto.whatsapp}
                afiliado={produto.afiliado}
                tipo={produto.tipo}
                isMostSold={produto.isMostSold}
                unitsLeft={produto.unitsLeft}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-display text-xl font-bold mb-3">
                GVP Ofertas BR
              </h3>
              <p className="text-gray-400 text-sm">
                Sua loja online de confiança com os melhores preços e entrega
                garantida.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Serviço
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a
                    href="https://wa.me/5596984224137"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@gvpofertasbr.com" className="hover:text-white transition-colors">
                    📧 Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2024 GVP Ofertas BR. Todos os direitos reservados.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <span>🔒 Pagamento Seguro</span>
                <span>🚚 Entrega Rápida</span>
                <span>⭐ Avaliações Verificadas</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
