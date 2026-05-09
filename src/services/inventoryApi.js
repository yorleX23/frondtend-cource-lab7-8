const API_URL = 'http://localhost:3000'; // Прибрали /api

export const inventoryApi = {
  // Отримання всього інвентарю
  getAll: async () => {
    const res = await fetch(`${API_URL}/inventory`);
    if (!res.ok) throw new Error('Помилка завантаження');
    return res.json();
  },

  // Отримання деталей 
  getById: async (id) => {
    const res = await fetch(`${API_URL}/inventory/${id}`);
    if (!res.ok) throw new Error('Помилка завантаження деталей');
    return res.json();
  },

  // Створення (Адаптовано під json-server)
  create: async (formData) => {
    // Оскільки json-server не розуміє FormData, ми витягуємо дані і робимо з них звичайний JSON
    const newItem = {
      inventory_name: formData.get('inventory_name'),
      description: formData.get('description'),
      quantity: Number(formData.get('quantity')),
      // Ставимо картинку-заглушку, бо реальний файл json-server не збереже
      photoUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop" 
    };

    const res = await fetch(`${API_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    return res.json();
  },

  // Оновлення текстових даних
  updateText: async (id, data) => {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'PATCH', // Використовуємо PATCH для часткового оновлення в json-server
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Оновлення фото (Адаптовано під json-server)
  updatePhoto: async (id, photoFile) => {
    // Просто імітуємо успішне оновлення, оскільки json-server не вміє зберігати файли
    console.log("Імітація завантаження фото для ID:", id);
    return { success: true };
  },

  // Видалення
  delete: async (id) => {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }
};