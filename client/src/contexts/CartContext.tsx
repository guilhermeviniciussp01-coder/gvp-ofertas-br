import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  nome: string;
  preco: number;
  quantidade: number;
  categoria?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (nome: string) => void;
  updateQuantity: (nome: string, quantidade: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.nome === newItem.nome);
      if (existingItem) {
        return prevItems.map((item) =>
          item.nome === newItem.nome
            ? { ...item, quantidade: item.quantidade + newItem.quantidade }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeItem = (nome: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.nome !== nome));
  };

  const updateQuantity = (nome: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeItem(nome);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.nome === nome ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
