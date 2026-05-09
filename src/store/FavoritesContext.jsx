import React, { createContext, useState, useEffect } from 'react';

// Створюємо сам Контекст
export const FavoritesContext = createContext();

// Провайдер, який буде огортати наш додаток і "роздавати" дані
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('hike_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hike_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const isFav = prev.find(fav => fav.id === item.id);
      if (isFav) {
        return prev.filter(fav => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}