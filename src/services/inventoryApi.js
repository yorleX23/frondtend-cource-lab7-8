const STORAGE_KEY = 'hikeshop_inventory';

const getItems = () => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [
    { id: "1", inventory_name: "Намет Pinguin Tornado 3", description: "Надійний тримісний намет для гірських походів.", quantity: 12, photoUrl: "https://www.sportparadise.com.ua/images/produkty/thumb/17464_17464b1598137af3b3f45.jpg.webp" },
    { id: "2", inventory_name: "Трекінгові палиці Leki", description: "Міцні алюмінієві палиці для безпечних спусків.", quantity: 4, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/5/9/5904823021813_20-jpg/palici-trekingovi-fizan-smu-summit-green-1643756.jpg" },
    { id: "3", inventory_name: "Рюкзак Osprey Atmos 65", description: "Туристичний рюкзак з ідеальною вентиляцією.", quantity: 0, photoUrl: "https://www.gorgany.com/media/catalog/product/o/s/osprey_atmos_ag_65_black_1_24_5558.jpg?width=700&height=700&store=ukrainian&image-type=image&format=webp" },
    { id: "4", inventory_name: "Спальний мішок Deuter", description: "Зимовий спальник, температура комфорту -5°C.", quantity: 8, photoUrl: "https://tramp.in.ua/content/images/31/260x390l80mc0/32376113882834.webp" },
    { id: "5", inventory_name: "Килимок Therm-a-Rest", description: "Самонадувний килимок для комфортного сну.", quantity: 2, photoUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQlp9RaKAO_dxN0W-owLQk899ro_FGSDraOawIwm15lji4hAyqeKyJo7WOxHxFYpcy-Ub7l6bRVLqb71c-oG5oFj9lm3WJuVZGb3gCGI3V6t7IvTx8QD3rbZbb9xrXaQwCFqIpIJrs&usqp=CAc" },
    { id: "6", inventory_name: "Пальник Jetboil Flash", description: "Швидка система приготування їжі (закипає за 100с).", quantity: 15, photoUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ7MUpF4qLX7gtidJ8BFlXGSgUE9awu5ZIVk2Zhi6_6PhjP8JTanYIlvuc47gYTxWRqdszqU9IBeXYPQPFlJLjPUWNsHMY4DiuwnfDetJ3ehNEwjwOq1z2pw-e5flr8fKoPDNA47Ww&usqp=CAc" },
    { id: "7", inventory_name: "Ліхтарик Petzl Actik", description: "Налобний ліхтар потужністю 450 люмен.", quantity: 3, photoUrl: "https://www.gorgany.com/media/catalog/product/p/e/petzl_tikkina_300_lm_black_1_26_88c8.jpg?store=ukrainian&image-type=image&format=webp" },
    { id: "8", inventory_name: "Черевики Lowa Renegade", description: "Легендарні трекінгові черевики з Gore-Tex.", quantity: 0, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/1/9/195751785594_20-jpg/chereviki-trekingovi-cholovichi-salomon-crosstrak-wp-black-black-asphalt-1257719.jpg" },
    { id: "9", inventory_name: "Шкарпетки Smartwool", description: "Термошкарпетки з мериносової вовни.", quantity: 25, photoUrl: "https://rollerblade.com.ua/components/com_jshopping/files/img_products/full_H0653-6099-1.jpg" },
    { id: "10", inventory_name: "Термос Stanley 1L", description: "Тримає окріп до 24 годин.", quantity: 5, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/8/1/810096852236_40-jpg/pljashka-turistichna-hydro-flask-lightweight-wide-flex-cap-b-40-oz-1182-ml-obsidian-1053490.jpg" },
    { id: "11", inventory_name: "Кружка титанова", description: "Легка кружка для гір (всього 60 грам).", quantity: 10, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/8/4/840394224978_40-jpg/termokruzhka-hydro-flask-mug-355-ml-black-1806694.jpg" },
    { id: "12", inventory_name: "Фільтр для води Sawyer", description: "Очищає 99.9% бактерій з гірських річок.", quantity: 1, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/1/9/195751049863_40-jpg/pljashka-salomon-pljashka-xa-filter-490ml-16oz-clear-blue-1182208.jpg" },
    { id: "13", inventory_name: "Аптечка Deuter First Aid", description: "Укомплектована аптечка для походів.", quantity: 4, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/4/2/4260329282662_40-jpg/aptechka-turistichna-restube-first-aid-kit-yellow-1505774.jpg" },
    { id: "14", inventory_name: "Компас Suunto", description: "Точний рідинний компас для орієнтування.", quantity: 7, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/7/3/7318860194900_40E-jpg/kompas-silva-ranger-s-37467-962960.jpg" },
    { id: "15", inventory_name: "Ножа Victorinox", description: "Швейцарський ніж з 12 функціями.", quantity: 0, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/4/9/4983608451374_19-jpg/nizh-dlja-dajvingu-tusa-x-pert-ii-chornij-fk-920-1533244.jpg" },
    { id: "16", inventory_name: "Карабін Black Diamond", description: "Муфтований карабін для альпінізму.", quantity: 30, photoUrl: "https://iron-hunter.com.ua/image/cache/catalog/accessories/karabin_pozharniy_fix-1200x900.jpg" },
    { id: "17", inventory_name: "Каска Petzl Boreo", description: "Універсальна каска для скелелазіння.", quantity: 2, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/4/0/4028545155432_40-jpg/sholom-dlja-skelelazinnja-edelrid-salathe-lite-icemint-1946164.jpg" },
    { id: "18", inventory_name: "Льодоруб Grivel", description: "Класичний льодоруб для зимових Карпат.", quantity: 0, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/8/0/8056420788426_20-jpg/palici-dlja-skandinavs-koi-hod-bi-fizan-speed-yellow-1811092.jpg" },
    { id: "19", inventory_name: "Кішки альпіністські", description: "М'які кішки, підходять на будь-які черевики.", quantity: 4, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/5/9/5904013003551_40-jpg/kishki-dlja-vzuttja-volven-pro-traxion-lite-green-1740571.jpg" },
    { id: "20", inventory_name: "Куртка мембранна", description: "Захист від дощу та вітру (10000 мм).", quantity: 6, photoUrl: "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/5/0/5059913230696_40-jpg/kurtka-doschovik-cholovicha-rab-phantom-mountain-black-1955500.jpg" },
    
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