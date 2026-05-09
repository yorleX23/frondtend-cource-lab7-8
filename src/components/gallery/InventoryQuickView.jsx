import React from 'react';

export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity">
      {/* Контейнер модалки */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative transform transition-all">
        
        {/* Кнопка закриття (хрестик) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xl font-bold z-10 transition-colors"
        >
          &times;
        </button>

        {/* Ліва частина: Велике фото */}
        <div className="md:w-1/2 h-64 md:h-auto bg-gray-100">
          <img
            src={item.photoUrl}
            alt={item.inventory_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Права частина: Деталі інвентарю */}
        <div className="p-8 md:w-1/2 flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
            {item.inventory_name}
          </h2>
          
          <div className="flex-grow">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Опис</h4>
            <p className="text-gray-600 leading-relaxed">
              {item.description || "Опис для цього спорядження відсутній."}
            </p>
          </div>

          {/* Інформація про залишки */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">На складі Hikeshop:</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.quantity > 0 ? `В наявності: ${item.quantity} шт.` : 'Закінчилось'}
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Закрити
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}