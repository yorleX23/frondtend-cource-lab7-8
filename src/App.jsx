import { Routes, Route, Link } from 'react-router-dom';
import Gallery from './pages/Gallery';
import AdminInventory from './pages/AdminInventory';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="bg-slate-800 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">⛰️ Hikeshop</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-blue-300 transition">Галерея</Link>
            <Link to="/favorites" className="hover:text-blue-300 transition">Улюблені</Link>
            <Link to="/admin" className="hover:text-blue-300 transition">Адмін-панель</Link>
          </div>
        </div>
      </nav>

      
      <main className="max-w-7xl mx-auto py-6">
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