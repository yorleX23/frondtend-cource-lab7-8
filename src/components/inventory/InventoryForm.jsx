import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../../services/inventoryApi';

export default function InventoryForm({ existingData = null, onSuccess }) {
  const [formData, setFormData] = useState({
    inventory_name: existingData?.inventory_name || '',
    description: existingData?.description || '',
    quantity: existingData?.quantity || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Якщо existingData раптом зміниться, оновлюємо поля форми
  useEffect(() => {
    if (existingData) {
      setFormData({
        inventory_name: existingData.inventory_name,
        description: existingData.description,
        quantity: existingData.quantity,
      });
    }
  }, [existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (existingData) {
        // РЕДАГУВАННЯ
        await inventoryApi.updateText(existingData.id, formData);
      } else {
        // СТВОРЕННЯ
        const data = new FormData();
        data.append('inventory_name', formData.inventory_name);
        data.append('description', formData.description);
        data.append('quantity', formData.quantity);
        await inventoryApi.create(data);
      }
      onSuccess(); // Закриваємо модалку і оновлюємо таблицю
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