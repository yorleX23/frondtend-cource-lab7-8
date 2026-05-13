const STORAGE_KEY = 'hikeshop_inventory';

const getItems = () => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [
    { id: "1", inventory_name: "Намет Pinguin Tornado 3", description: "Надійний тримісний намет для гірських походів.", quantity: 12, photoUrl: "https://images.unsplash.com/photo-1504280390227-31dc240a5f78?q=80&w=800&auto=format&fit=crop" },
    { id: "2", inventory_name: "Трекінгові палиці Leki", description: "Міцні алюмінієві палиці для безпечних спусків.", quantity: 4, photoUrl: "https://images.unsplash.com/photo-1515555230216-82228b4e6eb8?q=80&w=800&auto=format&fit=crop" },
    { id: "3", inventory_name: "Рюкзак Osprey Atmos 65", description: "Туристичний рюкзак з ідеальною вентиляцією.", quantity: 0, photoUrl: "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=800&auto=format&fit=crop" },
    { id: "4", inventory_name: "Спальний мішок Deuter", description: "Зимовий спальник, температура комфорту -5°C.", quantity: 8, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Spalnyk+Deuter" },
    { id: "5", inventory_name: "Килимок Therm-a-Rest", description: "Самонадувний килимок для комфортного сну.", quantity: 2, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Kylymok" },
    { id: "6", inventory_name: "Пальник Jetboil Flash", description: "Швидка система приготування їжі (закипає за 100с).", quantity: 15, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Jetboil" },
    { id: "7", inventory_name: "Ліхтарик Petzl Actik", description: "Налобний ліхтар потужністю 450 люмен.", quantity: 3, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Petzl" },
    { id: "8", inventory_name: "Черевики Lowa Renegade", description: "Легендарні трекінгові черевики з Gore-Tex.", quantity: 0, photoUrl: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop" },
    { id: "9", inventory_name: "Шкарпетки Smartwool", description: "Термошкарпетки з мериносової вовни.", quantity: 25, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Shkarpetky" },
    { id: "10", inventory_name: "Термос Stanley 1L", description: "Тримає окріп до 24 годин.", quantity: 5, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Termos" },
    { id: "11", inventory_name: "Кружка титанова", description: "Легка кружка для гір (всього 60 грам).", quantity: 10, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Kruzhka" },
    { id: "12", inventory_name: "Фільтр для води Sawyer", description: "Очищає 99.9% бактерій з гірських річок.", quantity: 1, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Sawyer" },
    { id: "13", inventory_name: "Аптечка Deuter First Aid", description: "Укомплектована аптечка для походів.", quantity: 4, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Aptechka" },
    { id: "14", inventory_name: "Компас Suunto", description: "Точний рідинний компас для орієнтування.", quantity: 7, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Kompas" },
    { id: "15", inventory_name: "Ножа Victorinox", description: "Швейцарський ніж з 12 функціями.", quantity: 0, photoUrl: "https://images.unsplash.com/photo-1586907409241-118843924fdd?q=80&w=800&auto=format&fit=crop" },
    { id: "16", inventory_name: "Карабін Black Diamond", description: "Муфтований карабін для альпінізму.", quantity: 30, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Karabin" },
    { id: "17", inventory_name: "Каска Petzl Boreo", description: "Універсальна каска для скелелазіння.", quantity: 2, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Kaska" },
    { id: "18", inventory_name: "Льодоруб Grivel", description: "Класичний льодоруб для зимових Карпат.", quantity: 0, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Liodorub" },
    { id: "19", inventory_name: "Кішки альпіністські", description: "М'які кішки, підходять на будь-які черевики.", quantity: 4, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Kishky" },
    { id: "20", inventory_name: "Куртка мембранна", description: "Захист від дощу та вітру (10000 мм).", quantity: 6, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Kurtka" },
    { id: "21", inventory_name: "Флісова кофта", description: "Теплий другий шар одягу.", quantity: 14, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Fliska" },
    { id: "22", inventory_name: "Штани трекінгові", description: "Зручні штани, що швидко сохнуть.", quantity: 5, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Shtany" },
    { id: "23", inventory_name: "Бафф літній", description: "Захист шиї від сонця.", quantity: 40, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Buff" },
    { id: "24", inventory_name: "Окуляри Julbo", description: "Окуляри з лінзами Spectron 3/4.", quantity: 3, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Okuliary" },
    { id: "25", inventory_name: "Гермомішок 10L", description: "Для захисту речей від води в рюкзаку.", quantity: 0, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Germomishok" },
    { id: "26", inventory_name: "Гамак туристичний", description: "Легкий гамак зі стропами у комплекті.", quantity: 9, photoUrl: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=800&auto=format&fit=crop" },
    { id: "27", inventory_name: "Тент 3х3м", description: "Тент для захисту табору від дощу.", quantity: 4, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Tent" },
    { id: "28", inventory_name: "Лопата лавинна", description: "Алюмінієва лопата для зимових походів.", quantity: 2, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Lopata" },
    { id: "29", inventory_name: "Щуп лавинний", description: "Довжина 240 см, надійний замок.", quantity: 1, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Shchup" },
    { id: "30", inventory_name: "Біпер", description: "Лавинний датчик для безпеки.", quantity: 0, photoUrl: "https://placehold.co/400x300/f8fafc/334155?text=Biper" }
  ];
};

const saveItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const inventoryApi = {
  // ШТУЧНА ЗАТРИМКА (ІМІТАЦІЯ СЕРВЕРА) ДЛЯ ТОГО, ЩОБ ПОБАЧИТИ СКЕЛЕТИ
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getItems());
      }, 600); // 600 мілісекунд затримки
    });
  },

  getById: async (id) => {
    return getItems().find(item => item.id === id);
  },

  create: async (formData) => {
    const items = getItems();
    const photoFile = formData.get('photo');
    
    // Захист: якщо фото не завантажили, даємо красиву заглушку
    const photoUrl = photoFile 
      ? URL.createObjectURL(photoFile) 
      : 'https://placehold.co/400x300/f8fafc/334155?text=No+Photo';

    const newItem = {
      id: Date.now().toString(),
      inventory_name: formData.get('inventory_name'),
      description: formData.get('description'),
      quantity: Number(formData.get('quantity')),
      photoUrl: photoUrl
    };

    items.push(newItem);
    saveItems(items);
    return newItem;
  },

  updateText: async (id, data) => {
    let items = getItems();
    items = items.map(item => item.id === id ? { ...item, ...data } : item);
    saveItems(items);
    return { success: true };
  },

  updatePhoto: async (id, photoFile) => {
    let items = getItems();
    if (photoFile) {
      const photoUrl = URL.createObjectURL(photoFile);
      items = items.map(item => item.id === id ? { ...item, photoUrl } : item);
      saveItems(items);
    }
    return { success: true };
  },

  delete: async (id) => {
    let items = getItems();
    items = items.filter(item => item.id !== id);
    saveItems(items);
    return { success: true };
  }
};