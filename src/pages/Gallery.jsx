import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setIsLoading(true);
    inventoryApi.getAll()
      .then(data => setItems(data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
      <div className="w-full h-52 bg-gray-200"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="mt-6 h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-800 tracking-tight">Каталог спорядження</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading 
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : items.map(item => (
          <div 
            key={item.id} 
            // Чистий ховер без смужок: тільки тінь і підйом
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1.5 flex flex-col"
            onClick={() => setSelectedItem(item)}
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
                {isFavorite(item.id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2 text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">{item.inventory_name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{item.description}</p>
              
              <div className="mt-auto">
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${
                  item.quantity > 5 ? 'bg-green-50 text-green-700 border-green-200' : 
                  (item.quantity > 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200')
                }`}>
                  {item.quantity > 0 ? `Залишок: ${item.quantity} шт.` : 'Закінчилось'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}