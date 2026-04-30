import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "frete" | "devolucoes" | "pagamentos";
}

interface FAQAccordionProps {
  items: FAQItem[];
}

/**
 * FAQAccordion - Componente de Perguntas Frequentes
 * 
 * Design Philosophy: Marketplace Moderno (Shopee-inspired)
 * - Acordeão interativo com animações suaves
 * - Ícone de chevron que rotaciona ao abrir
 * - Resposta com fade-in animation
 * - Espaçamento generoso e tipografia clara
 * - Apenas um item aberto por vez
 */
export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition-colors duration-200"
        >
          {/* Question Header */}
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="font-heading font-semibold text-gray-900 text-left">
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className="text-orange-500 flex-shrink-0 transition-transform duration-300"
              style={{
                transform: openId === item.id ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Answer Content */}
          {openId === item.id && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 animate-in fade-in duration-300">
              <p className="text-gray-700 leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
