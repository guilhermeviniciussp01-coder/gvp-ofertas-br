import { createContext, useContext, useState, ReactNode } from "react";

/**
 * FavoritesContext
 * 
 * Gerencia estado global de produtos favoritos
 * - Adicionar/remover favoritos
 * - Verificar se produto está favoritado
 * - Obter lista de favoritos
 * - Persistir em localStorage
 */

interface FavoriteProduct {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  addedAt: string;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>(() => {
    // Carregar favoritos do localStorage
    try {
      const stored = localStorage.getItem("gvp-favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addFavorite = (product: FavoriteProduct) => {
    setFavorites((prev) => {
      // Verificar se já existe
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      const updated = [
        ...prev,
        {
          ...product,
          addedAt: new Date().toISOString(),
        },
      ];
      // Persistir no localStorage
      localStorage.setItem("gvp-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      // Persistir no localStorage
      localStorage.setItem("gvp-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some((p) => p.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("gvp-favorites");
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  }
  return context;
}
