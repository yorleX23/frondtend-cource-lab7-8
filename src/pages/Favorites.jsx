import React from 'react';
import { useFavorites } from '../hooks/useFavorites';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <div className="p-8 text-center text-gray-500 text-xl">У вас поки немає улюбленого спорядження 🤍</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Улюблене спорядження</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden relative">
            <img src={item.photoUrl} alt={item.inventory_name} className="w-full h-48 object-cover" />
            
            <button 
              onClick={() => toggleFavorite(item)}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition"
            >
              ❤️
            </button>
            
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.inventory_name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}