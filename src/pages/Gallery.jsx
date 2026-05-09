import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import QuickViewModal from '../components/gallery/InventoryQuickView';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    inventoryApi.getAll().then(setItems);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Каталог спорядження</h1>
      
      {/* Адаптивний grid (desktop / tablet / mobile)[cite: 1] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div 
            key={item.id} 
            // Hover-ефекти та плавні transition[cite: 1]
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer relative"
            onClick={() => setSelectedItem(item)}
          >
            <img 
              src={item.photoUrl} 
              alt={item.inventory_name} 
              className="w-full h-48 object-cover"
            />
            
            {/* Кнопка "Улюблені"[cite: 1] */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item);
              }}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition"
            >
              {isFavorite(item.id) ? '❤️' : '🤍'}
            </button>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.inventory_name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
              
              {/* Відображення наявності */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${item.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {item.quantity > 0 ? `В наявності: ${item.quantity} шт.` : 'Немає на складі'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Взаємодія по кліку: modal "Quick View"[cite: 1] */}
      {selectedItem && (
        <QuickViewModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}