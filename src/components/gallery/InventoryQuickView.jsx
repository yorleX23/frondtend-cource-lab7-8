import React from 'react';

export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  return (
    // Змінено z-50 на z-[100], щоб модалка гарантовано перекривала шапку сайту
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 transition-opacity">
      
      {/* Додано max-h-[90vh] overflow-y-auto для скролу на мобільних телефонах */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col md:flex-row overflow-hidden relative max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100/80 backdrop-blur text-gray-500 hover:text-white hover:bg-red-500 rounded-full text-2xl z-10 transition-colors pb-1"
          title="Закрити"
        >
          &times;
        </button>

        <div className="md:w-1/2 h-56 md:h-auto bg-gray-100 shrink-0">
          <img src={item.photoUrl} alt={item.inventory_name} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 md:w-1/2 flex flex-col bg-slate-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pr-10 leading-tight">
            {item.inventory_name}
          </h2>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Опис спорядження</h4>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {item.description || "Опис для цього спорядження відсутній."}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <div>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                item.quantity > 5 ? 'bg-green-50 text-green-700 border-green-200' : 
                (item.quantity > 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200')
              }`}>
                {item.quantity > 0 ? `На складі: ${item.quantity} шт.` : 'Немає в наявності'}
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition text-sm font-medium shadow-md"
            >
              Закрити
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}