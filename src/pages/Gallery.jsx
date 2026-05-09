import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // НОВИЙ СТАН: індикатор завантаження
  const [selectedItem, setSelectedItem] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // Вмикаємо завантаження перед запитом
    setIsLoading(true);
    inventoryApi.getAll()
      .then(data => setItems(data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false)); // Вимикаємо після отримання даних
  }, []);

  // КОМПОНЕНТ СКЕЛЕТА (буде блимати сірим, поки немає даних)
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="mt-6 h-5 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Каталог спорядження</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading 
          ? /* Показуємо 8 скелетів під час завантаження */
            Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : /* Показуємо реальні товари, коли дані прийшли */
            items.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative transform hover:-translate-y-1"
            onClick={() => setSelectedItem(item)}
          >
            <img 
              src={item.photoUrl} 
              alt={item.inventory_name} 
              className="w-full h-48 object-cover"
            />
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:scale-110 transition"
            >
              {isFavorite(item.id) ? '❤️' : '🤍'}
            </button>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 text-gray-800">{item.inventory_name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${item.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {item.quantity > 0 ? `В наявності: ${item.quantity} шт.` : 'Немає на складі'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модалка Quick View */}
      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}