import React, { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null); // Додали стан для модалки

  if (favorites.length === 0) {
    return <div className="p-8 text-center text-gray-500 text-xl font-medium mt-10">У вас поки немає улюбленого спорядження 🤍</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-800 tracking-tight">Улюблене спорядження</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(item => (
          <div 
            key={item.id} 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1.5 flex flex-col"
            onClick={() => setSelectedItem(item)} // Клік відкриває модалку
          >
            <div className="w-full h-52 overflow-hidden bg-gray-100 relative border-b border-gray-100">
              <img 
                src={item.photoUrl} 
                alt={item.inventory_name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:scale-110 transition z-20"
              >
                ❤️
              </button>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">{item.inventory_name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Підключили модалку */}
      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}