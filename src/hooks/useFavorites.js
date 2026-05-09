import { useState, useEffect } from 'react';

export function useFavorites() {
  // Зберігати улюблені елементи в localStorage[cite: 1]
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

  return { favorites, toggleFavorite, isFavorite };
}