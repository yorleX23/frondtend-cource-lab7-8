import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import ConfirmModal from '../components/ConfirmModal';
import InventoryForm from '../components/inventory/InventoryForm';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await inventoryApi.delete(deleteId);
      setDeleteId(null);
      loadInventory(); 
    }
  };

  let processedItems = [...items];

  // Фільтрація
  if (filter === 'low') {
    processedItems = processedItems.filter(item => item.quantity > 0 && item.quantity <= 5);
  } else if (filter === 'empty') {
    processedItems = processedItems.filter(item => item.quantity === 0);
  }

  // Правильне сортування чисел і рядків
  if (sortConfig.key) {
    processedItems.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      
      // Якщо це рядок, переводимо в нижній регістр для правильного сортування за алфавітом
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getQuantityStyle = (q) => {
    if (q > 5) return 'bg-green-100 text-green-800 border-green-200';
    if (q > 0 && q <= 5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Завантаження інвентарю...</div>;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Управління складом Hikeshop</h1>
        <button 
          onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition w-full md:w-auto font-medium"
        >
          + Додати спорядження
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
        <span className="py-2 px-3 text-sm font-bold text-gray-600">Фільтр:</span>
        <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm rounded-lg transition font-medium ${filter === 'all' ? 'bg-slate-800 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>Всі товари</button>
        <button onClick={() => setFilter('low')} className={`px-4 py-2 text-sm rounded-lg transition font-medium ${filter === 'low' ? 'bg-yellow-500 text-white shadow-md' : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800'}`}>Закінчується (1-5)</button>
        <button onClick={() => setFilter('empty')} className={`px-4 py-2 text-sm rounded-lg transition font-medium ${filter === 'empty' ? 'bg-red-500 text-white shadow-md' : 'bg-red-50 hover:bg-red-100 text-red-800'}`}>Немає на складі (0)</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-200">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-slate-100 text-slate-700 border-b border-gray-200">
            <tr>
              <th className="p-4 font-bold">Фото</th>
              <th 
                className="p-4 font-bold cursor-pointer hover:bg-slate-200 transition select-none group"
                onClick={() => handleSort('inventory_name')}
                title="Натисніть для сортування"
              >
                Назва інвентарю <span className="text-gray-400 group-hover:text-gray-600">{sortConfig.key === 'inventory_name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
              </th>
              <th className="p-4 font-bold">Опис</th>
              <th 
                className="p-4 font-bold cursor-pointer hover:bg-slate-200 transition select-none group"
                onClick={() => handleSort('quantity')}
                title="Натисніть для сортування"
              >
                Залишок <span className="text-gray-400 group-hover:text-gray-600">{sortConfig.key === 'quantity' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
              </th>
              <th className="p-4 font-bold text-center">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {processedItems.map(item => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition duration-150">
                <td className="p-4">
                  <img src={item.photoUrl} alt={item.inventory_name} className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-200 bg-gray-50" />
                </td>
                <td className="p-4 font-bold text-gray-800">{item.inventory_name}</td>
                <td className="p-4 text-sm text-gray-500 max-w-xs line-clamp-2">{item.description}</td>
                <td className="p-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getQuantityStyle(item.quantity)}`}>
                    {item.quantity} шт.
                  </span>
                </td>
                <td className="p-4">
                  {/* КНОПКИ ЕМОДЖІ */}
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => setViewItem(item)} className="p-2.5 bg-gray-50 hover:bg-green-100 rounded-lg transition border border-gray-200 hover:border-green-300 shadow-sm" title="Огляд">👀</button>
                    <button onClick={() => { setEditingItem(item); setIsFormOpen(true); }} className="p-2.5 bg-gray-50 hover:bg-blue-100 rounded-lg transition border border-gray-200 hover:border-blue-300 shadow-sm" title="Редагувати">✏️</button>
                    <button onClick={() => setDeleteId(item.id)} className="p-2.5 bg-gray-50 hover:bg-red-100 rounded-lg transition border border-gray-200 hover:border-red-300 shadow-sm" title="Видалити">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {processedItems.length === 0 && (
          <div className="p-12 text-center text-gray-500">За вашими критеріями товарів не знайдено.</div>
        )}
      </div>

      {deleteId && <ConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteId(null)} message="Видалити спорядження?" />}
      {viewItem && <InventoryQuickView item={viewItem} onClose={() => setViewItem(null)} />}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden max-h-[95vh] overflow-y-auto">
            <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
              <h2 className="font-bold text-lg">{editingItem ? 'Редагувати товар' : 'Новий товар'}</h2>
              <button onClick={() => { setIsFormOpen(false); setEditingItem(null); }} className="text-gray-300 hover:text-white text-3xl leading-none pb-1">&times;</button>
            </div>
            <div className="p-6">
              <InventoryForm existingData={editingItem} onSuccess={() => { setIsFormOpen(false); setEditingItem(null); loadInventory(); }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}