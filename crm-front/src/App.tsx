import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory';
import './styles/global.css';
import "./styles/Dashboard/Dashboard.css";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/products" element={<Inventory />} />
                    {/* Можна додати сторінку 404 або редирект */}
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;