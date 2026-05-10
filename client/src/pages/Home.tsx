import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import SearchBar from "@/components/SearchBar";
import FloatingCart from "@/components/FloatingCart";
import TrustSection from "@/components/TrustSection";
import { ShoppingBag, Filter } from "lucide-react";

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
  {
    name: "Marina Silva",
    role: "Cliente Verificada",
    comment: "Adorei a compra! Produto chegou rápido e bem embalado. Recomendo muito a GVP Ofertas BR!",
    rating: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer1-6p29GDCTknEFnJrg6FCqBH.webp",
  },
  {
    name: "Carlos Mendes",
    role: "Cliente Verificado",
    comment: "Melhor preço que encontrei! Atendimento pelo WhatsApp foi muito rápido e eficiente.",
    rating: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer2-RBgD9Kz8KeVV3iGg96SzWg.webp",
  },
  {
    name: "Juliana Costa",
    role: "Cliente Verificada",
    comment: "Comprei 3 vezes já! Sempre com qualidade, preço bom e entrega garantida. Muito satisfeita!",
    rating: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer3-SkdhFw42f6sHoAvf4JHofq.webp",
  },
  {
    name: "Felipe Santos",
    role: "Cliente Verificado",
    comment: "Produto exatamente como descrito. Confiável demais! Vou continuar comprando aqui.",
    rating: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer4-T6VaW6fiCFZKDSR4tFG5rf.webp",
  },
  {
    name: "Beatriz Oliveira",
    role: "Cliente Verificada",
    comment: "Entrega na minha porta, sem complicações. Loja confiável e com ótimos produtos!",
    rating: 5,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663603292872/LuYQsdrNkQEuXDq3pzjeSs/customer5-4A4uGaqn9B6MgeqVGUvsoH.webp",
  },
];

const produtos: Produto[] = [
  {
    id: "1",
    nome: "Resina Extreme Automotiva",
    descricao: "Resina auto brilho finalizador 500ml. Proteção máxima e brilho incomparável para seu carro.",
    imagem: "https://via.placeholder.com/400x400?text=Resina+Extreme",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 5,
    preco: 89.99,
    categoria: "Automotivo",
  },
  {
    id: "2",
    nome: "Pistola Massageadora",
    descricao: "Pistola de massagem profissional com 4 cabeças intercambiáveis e cabo USB.",
    imagem: "https://via.placeholder.com/400x400?text=Pistola+Massageadora",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-pdoge-0",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 8,
    preco: 79.99,
    categoria: "Saúde",
  },
  {
    id: "3",
    nome: "Clareador de Manchas AmazoLé",
    descricao: "Esfoliante clareador que limpa e uniformiza o tom da pele. Combate melasma e manchas.",
    imagem: "https://via.placeholder.com/400x400?text=Clareador+AmazoLe",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-gya94-0",
    tipo: "entrega",
    unitsLeft: 6,
    preco: 120.00,
    categoria: "Beleza",
  },
  {
    id: "4",
    nome: "Relógio Masculino Original",
    descricao: "Relógio masculino premium estilo Invicta, dourado, resistente e elegante.",
    imagem: "https://via.placeholder.com/400x400?text=Relogio+Masculino",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-osr5n-0",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 3,
    preco: 85.00,
    categoria: "Moda",
  },
  {
    id: "5",
    nome: "Relógio Esportivo LED Unissex",
    descricao: "Relógio digital LED resistente à água, moderno e estiloso para qualquer ocasião.",
    imagem: "https://via.placeholder.com/400x400?text=Relogio+LED",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-zbnq9-0",
    tipo: "entrega",
    unitsLeft: 15,
    preco: 20.00,
    categoria: "Moda",
  },
  {
    id: "6",
    nome: "Fone de Ouvido Bluetooth TWS",
    descricao: "Fone A6S Pro MiPods sem fio, conexão Bluetooth, case carregador incluso.",
    imagem: "https://via.placeholder.com/400x400?text=Fone+Bluetooth",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-yvlif-0",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 10,
    preco: 49.99,
    categoria: "Eletrônicos",
  },
  {
    id: "7",
    nome: "Redutor de Conta de Água",
    descricao: "Economizare: redutor de consumo que economiza até 50% na sua conta de água.",
    imagem: "https://via.placeholder.com/400x400?text=Redutor+Agua",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-uukmi-0",
    tipo: "entrega",
    unitsLeft: 4,
    preco: 149.99,
    categoria: "Casa",
  },
  {
    id: "8",
    nome: "Kit Completo Churrasco",
    descricao: "Kit profissional com 20+ utensílios de aço inox para churrasco perfeito.",
    imagem: "https://via.placeholder.com/400x400?text=Kit+Churrasco",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-kit-b5zsk-0",
    tipo: "entrega",
    unitsLeft: 7,
    preco: 148.98,
    categoria: "Casa",
  },
  {
    id: "9",
    nome: "Kit Massagem EMS",
    descricao: "Kit com tapete e almofada massageadora EMS para pés e corpo. Alívio de dores.",
    imagem: "https://via.placeholder.com/400x400?text=Kit+Massagem",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-kit-it3g9-0",
    tipo: "entrega",
    unitsLeft: 9,
    preco: 69.98,
    categoria: "Saúde",
  },
  {
    id: "10",
    nome: "Kit Ferramentas 46 Peças",
    descricao: "Jogo de soquetes e chaves com maleta, 46 peças em aço inox de alta resistência.",
    imagem: "https://via.placeholder.com/400x400?text=Kit+Ferramentas",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-kit-yeqi9-0",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 6,
    preco: 78.99,
    categoria: "Ferramentas",
  },
  {
    id: "11",
    nome: "Escova a Vapor para Pets",
    descricao: "Escova vaporizadora que limpa, hidrata e remove pelos soltos do seu pet com facilidade.",
    imagem: "https://via.placeholder.com/400x400?text=Escova+Pet",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-nu0kw-0",
    tipo: "entrega",
    unitsLeft: 12,
    preco: 49.99,
    categoria: "Pets",
  },
  {
    id: "12",
    nome: "Luminária Mata Mosquito",
    descricao: "Armadilha elétrica UV que elimina mosquitos e insetos silenciosamente. Recarregável USB.",
    imagem: "https://via.placeholder.com/400x400?text=Mata+Mosquito",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-fdmva-0",
    tipo: "entrega",
    unitsLeft: 8,
    preco: 54.98,
    categoria: "Casa",
  },
  {
    id: "13",
    nome: "Câmera Lâmpada 360° IP",
    descricao: "Câmera de segurança em formato de lâmpada, 360°, visão noturna e acesso pelo celular.",
    imagem: "https://via.placeholder.com/400x400?text=Camera+360",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-v0gpl-0",
    tipo: "entrega",
    isMostSold: true,
    unitsLeft: 4,
    preco: 120.00,
    categoria: "Segurança",
  },
  {
    id: "14",
    nome: "Short Feminino Empina Bumbum",
    descricao: "Short fitness modelador de cintura alta, tecido premium com compressão e conforto.",
    imagem: "https://via.placeholder.com/400x400?text=Short+Feminino",
    whatsapp: "https://wa.me/5596984224137",
    afiliado: "https://app.coinzz.com.br/checkout/1-unidade-j7ugp-0",
    tipo: "entrega",
    unitsLeft: 20,
    preco: 45.00,
    categoria: "Moda",
  },
];

const faqItems: FAQItem[] = [
  {
    id: "frete-1",
    category: "frete",
    question: "Qual é o prazo de entrega?",
    answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização e do tipo de pagamento escolhido. Para pagamento na entrega, o prazo pode ser um pouco maior. Você receberá o rastreamento do seu pedido por WhatsApp.",
  },
  {
    id: "frete-2",
    category: "frete",
    question: "Vocês entregam em todo o Brasil?",
    answer: "Sim! Entregamos em todo o Brasil, incluindo regiões remotas. O frete é calculado automaticamente durante o processo de compra. Oferecemos entrega garantida com rastreamento completo.",
  },
  {
    id: "frete-3",
    category: "frete",
    question: "O frete é cobrado à parte?",
    answer: "Para compras via WhatsApp, o frete é combinado diretamente com nosso atendente. Para compras online, o frete é calculado e adicionado ao total. Temos parcerias com as melhores transportadoras para garantir o melhor preço.",
  },
  {
    id: "devolucoes-1",
    category: "devolucoes",
    question: "Qual é a política de devolução?",
    answer: "Você tem até 30 dias após o recebimento do produto para solicitar devolução, sem perguntas. Se o produto chegar com defeito ou não for como descrito, fazemos a troca ou reembolso imediatamente.",
  },
  {
    id: "devolucoes-2",
    category: "devolucoes",
    question: "Como faço para devolver um produto?",
    answer: "Entre em contato conosco pelo WhatsApp com a foto do produto e o motivo da devolução. Enviaremos um código de devolução e as instruções de envio. O frete de devolução é por nossa conta em caso de defeito ou erro nosso.",
  },
  {
    id: "devolucoes-3",
    category: "devolucoes",
    question: "Quanto tempo leva para receber o reembolso?",
    answer: "Após recebermos o produto devolvido e verificarmos as condições, o reembolso é processado em até 5 dias úteis. Para pagamento na entrega, o dinheiro é devolvido na próxima entrega do nosso parceiro.",
  },
  {
    id: "pagamentos-1",
    category: "pagamentos",
    question: "Quais são as formas de pagamento?",
    answer: "Oferecemos duas principais formas: Pagamento na Entrega (você paga qua
