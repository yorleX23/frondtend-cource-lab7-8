import { Routes, Route, NavLink } from 'react-router-dom';
import Gallery from './pages/Gallery';
import AdminInventory from './pages/AdminInventory';
import Favorites from './pages/Favorites';

function App() {
  return (
    // Додали selection:bg-blue-200 (красиве виділення тексту мишкою)
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      
      {/* СУЧАСНИЙ NAVBAR: фіксований зверху (sticky), ефект скла (backdrop-blur) */}
      <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Логотип з градієнтом */}
            {/* Класичний строгий логотип без градієнта та збільшення */}
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-2xl drop-shadow-md">⛰️</span>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Пішохідний шоп
              </span>
            </div>

            {/* Меню навігації з підсвічуванням активної сторінки */}
            <div className="flex gap-2 sm:gap-4">
              <NavLink 
                to="/" 
                className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white/10 text-blue-400 shadow-inner' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                Галерея
              </NavLink>
              
              <NavLink 
                to="/favorites" 
                className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white/10 text-red-400 shadow-inner' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                Улюблені
              </NavLink>
              
              <NavLink 
                to="/admin" 
                className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white/10 text-emerald-400 shadow-inner' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                Адмін-панель
              </NavLink>
            </div>

          </div>
        </div>
      </nav>

      {/* ГОЛОВНИЙ КОНТЕНТ: Додали відступ знизу і клас для плавної анімації */}
      <main className="max-w-7xl mx-auto w-full pb-12 pt-6 animate-fade-in">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<AdminInventory />} />
        </Routes>
      </main>
      
    </div>
  );
}

export default App;