import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onPriceFilter: (minPrice: number, maxPrice: number) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
}

/**
 * SearchBar - Componente de Busca com Filtros Avançados
 * 
 * Design Philosophy: Marketplace Moderno (Shopee-inspired)
 * - Barra de busca com ícone de lupa
 * - Filtros de preço com slider/inputs
 * - Filtros de categoria com dropdown
 * - Design responsivo e intuitivo
 * - Animações suaves
 */
export default function SearchBar({
  onSearch,
  onPriceFilter,
  onCategoryFilter,
  categories,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handlePriceChange = () => {
    onPriceFilter(minPrice, maxPrice);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedCategory("todos");
    onSearch("");
    onPriceFilter(0, 1000);
    onCategoryFilter("todos");
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[80px] z-40 py-4">
      <div className="container mx-auto px-4">
        {/* Main Search Bar */}
        <div className="flex gap-3 items-center mb-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                showAdvanced ? "rotate-180" : ""
              }`}
            />
            Filtros
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  📁 Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="todos">Todas as Categorias</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  💰 Preço Mínimo
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">R$</span>
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(Number(e.target.value));
                      handlePriceChange();
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  💰 Preço Máximo
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">R$</span>
                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      handlePriceChange();
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center gap-2"
              >
                <X size={18} />
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
