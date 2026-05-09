import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../../services/inventoryApi';

export default function InventoryForm({ existingData = null, onSuccess }) {
  const [formData, setFormData] = useState({
    inventory_name: existingData?.inventory_name || '',
    description: existingData?.description || '',
    quantity: existingData?.quantity || 0,
  });
  
  // Стан для збереження вибраного файлу фотографії
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingData) {
      setFormData({
        inventory_name: existingData.inventory_name,
        description: existingData.description,
        quantity: existingData.quantity,
      });
      setPhoto(null); // Очищаємо вибране фото при відкритті форми редагування
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (existingData) {
        // 1. Оновлюємо текстові дані
        await inventoryApi.updateText(existingData.id, formData);
        
        // 2. Якщо вибрали нове фото, відправляємо його окремим запитом
        if (photo) {
          await inventoryApi.updatePhoto(existingData.id, photo);
        }
      } else {
        // Створюємо новий товар використовуючи FormData
        const data = new FormData();
        data.append('inventory_name', formData.inventory_name);
        data.append('description', formData.description);
        data.append('quantity', formData.quantity);
        
        if (photo) {
          data.append('photo', photo); // Додаємо файл до посилки
        }
        
        await inventoryApi.create(data);
      }
      onSuccess(); 
    } catch (error) {
      console.error("Помилка збереження:", error);
      alert("Не вдалося зберегти товар.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Назва спорядження *</label>
        <input 
          required 
          type="text" 
          value={formData.inventory_name}
          onChange={e => setFormData({...formData, inventory_name: e.target.value})}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Опис</label>
        <textarea 
          required
          rows="3"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Кількість на складі (шт.)</label>
        <input 
          required
          type="number" 
          min="0"
          value={formData.quantity}
          onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* НОВИЙ БЛОК: Поле для вибору файлу */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Фото інвентарю</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={e => setPhoto(e.target.files[0])} // Записуємо файл у стан
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
        />
        {existingData && <p className="text-xs text-gray-400 mt-1">Залиште порожнім, щоб не змінювати поточне фото.</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`mt-4 py-2 rounded-lg font-bold text-white transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
      >
        {isSubmitting ? 'Збереження...' : (existingData ? 'Оновити товар' : 'Зберегти товар')}
      </button>
    </form>
  );
}