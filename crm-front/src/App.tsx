import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory'; // Підключає сторінку
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Якщо адреса просто / — показує головну */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Заглушка для сторінки клієнтів (поки там пусто, показує дашборд) */}
        <Route path="/clients" element={<Dashboard />} />
        
        {/* Якщо адреса /products — показує cклад */}
        <Route path="/products" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;