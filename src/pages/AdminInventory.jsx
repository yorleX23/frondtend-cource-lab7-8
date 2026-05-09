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
  const [editingItem, setEditingItem] = useState(null); // НОВИЙ СТАН для редагування
  const [viewItem, setViewItem] = useState(null); // Стан для перегляду деталей

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
      loadInventory(); // Оновлюємо список після видалення
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Завантаження інвентарю...</div>;

  return (
    <div className="p-6">
    {/* Кнопка ДОДАТИ */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Управління складом Hikeshop</h1>
        <button 
          onClick={() => {
            setEditingItem(null); // Очищаємо форму для нового товару
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Додати спорядження
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 border-b">
            <tr>
              <th className="p-4">Фото</th>
              <th className="p-4">Назва інвентарю</th>
              <th className="p-4">Опис</th>
              <th className="p-4">Залишок на складі</th>
              <th className="p-4">Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <img src={item.photoUrl} alt={item.inventory_name} className="w-16 h-16 object-cover rounded shadow-sm" />
                </td>
                <td className="p-4 font-bold text-gray-800">{item.inventory_name}</td>
                <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.quantity} шт.
                  </span>
                </td>
                
                {/* КНОПКИ ДІЙ (Додано кнопку Переглянути) */}
                <td className="p-4 flex gap-3 mt-4">
                  <button 
                    onClick={() => setViewItem(item)} 
                    className="text-green-600 hover:text-green-800 font-medium transition"
                  >
                    Переглянути
                  </button>
                  <button 
                    onClick={() => {
                      setEditingItem(item); // Передаємо поточний товар у форму
                      setIsFormOpen(true);
                    }} 
                    className="text-blue-500 hover:text-blue-700 font-medium transition"
                  >
                    Редагувати
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="text-red-500 hover:text-red-700 font-medium transition">Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="p-12 text-center text-gray-500">Склад порожній. Натисніть "+ Додати спорядження".</div>
        )}
      </div>

      {/* Модалка підтвердження видалення */}
      {deleteId && (
        <ConfirmModal 
          onConfirm={handleDelete} 
          onCancel={() => setDeleteId(null)} 
          message="Ви впевнені, що хочете видалити це спорядження зі складу?" 
        />
      )}

      {/* Модалка ПЕРЕГЛЯДУ */}
      {viewItem && (
        <InventoryQuickView 
          item={viewItem} 
          onClose={() => setViewItem(null)} 
        />
      )}

      {/* Модалка з формою додавання/редагування */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden">
            <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
              {/* Змінюємо заголовок залежно від дії */}
              <h2 className="font-bold text-lg">{editingItem ? 'Редагувати товар' : 'Новий товар'}</h2>
              <button 
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingItem(null); // Очищаємо при закритті
                }} 
                className="text-gray-300 hover:text-white text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <InventoryForm 
                existingData={editingItem} // Передаємо дані у форму!
                onSuccess={() => {
                  setIsFormOpen(false); 
                  setEditingItem(null);
                  loadInventory();      
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}