import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredFavorites, saveStoredFavorites } from '../lib/storage';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (toolId: string) => boolean;
  toggleFavorite: (toolId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => getStoredFavorites());

  useEffect(() => {
    saveStoredFavorites(favorites);
  }, [favorites]);

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
