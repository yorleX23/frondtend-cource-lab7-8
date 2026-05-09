// Ключ для збереження даних у локальній пам'яті браузера
const STORAGE_KEY = 'hikeshop_inventory';

// Якщо склад порожній, дамо один базовий товар для краси
const getItems = () => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [
    {
      id: "1",
      inventory_name: "Намет Pinguin Tornado 3",
      description: "Надійний тримісний намет для гірських походів.",
      quantity: 12,
      photoUrl: "https://images.unsplash.com/photo-1504280390227-31dc240a5f78?q=80&w=800&auto=format&fit=crop"
    }
  ];
};

const saveItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const inventoryApi = {
  // Отримання всього інвентарю
  getAll: async () => {
    return getItems();
  },

  // Отримання деталей
  getById: async (id) => {
    return getItems().find(item => item.id === id);
  },

  // СТВОРЕННЯ: Приймає FormData з файлом!
  create: async (formData) => {
    const items = getItems();
    
    // Витягуємо файл фотографії з FormData
    const photoFile = formData.get('photo');
    
    // МАГІЯ: створюємо тимчасове посилання на файл з твого комп'ютера
    const photoUrl = photoFile 
      ? URL.createObjectURL(photoFile) 
      : 'https://via.placeholder.com/400?text=No+Image';

    const newItem = {
      id: Date.now().toString(),
      inventory_name: formData.get('inventory_name'),
      description: formData.get('description'),
      quantity: Number(formData.get('quantity')),
      photoUrl: photoUrl // Зберігаємо посилання на картинку
    };

    items.push(newItem);
    saveItems(items);
    return newItem;
  },

  // РЕДАГУВАННЯ ТЕКСТУ: Приймає звичайний JSON (як вимагає методичка)
  updateText: async (id, data) => {
    let items = getItems();
    items = items.map(item => item.id === id ? { ...item, ...data } : item);
    saveItems(items);
    return { success: true };
  },

  // РЕДАГУВАННЯ ФОТО: Отримує файл і оновлює картинку
  updatePhoto: async (id, photoFile) => {
    let items = getItems();
    
    if (photoFile) {
      // Створюємо нове посилання для нового фото
      const photoUrl = URL.createObjectURL(photoFile);
      items = items.map(item => item.id === id ? { ...item, photoUrl } : item);
      saveItems(items);
    }
    return { success: true };
  },

  // ВИДАЛЕННЯ
  delete: async (id) => {
    let items = getItems();
    items = items.filter(item => item.id !== id);
    saveItems(items);
    return { success: true };
  }
};