import React, { useState, useMemo } from 'react';
import '../styles/clients.css'; // Підключаємо стилі сторінки клієнтів

interface Client {
    id: number;
    name: string;
    company: string;
    phone: string;
    email: string;
    status: 'Активний' | 'Новий лід' | 'В перемовинах';
    ltv: number;
    color: string;
}

const Clients: React.FC = () => {
    // База клієнтів
    const [clients] = useState<Client[]>([
        { id: 1, name: "Олександр Ткачук", company: "ТОВ «БудЕксперт»", phone: "+38 (050) 123-45-67", email: "olex@bud.ua", status: "Активний", ltv: 145000, color: "#3b82f6" },
        { id: 2, name: "Марія Коваленко", company: "ФОП Коваленко", phone: "+38 (067) 765-43-21", email: "maria.k@gmail.com", status: "Новий лід", ltv: 0, color: "#10b981" },
        { id: 3, name: "Ігор Мельник", company: "IT Solutions Group", phone: "+38 (063) 111-22-33", email: "igor.m@itsol.com", status: "В перемовинах", ltv: 25000, color: "#8b5cf6" },
        { id: 4, name: "Олена Петренко", company: "Kavka Cafe", phone: "+38 (099) 999-88-77", email: "petrenko@kavka.ua", status: "Активний", ltv: 54000, color: "#f59e0b" },
        { id: 5, name: "Сергій Васильєв", company: "AutoParts UA", phone: "+38 (050) 555-44-33", email: "serg@autoparts.ua", status: "Активний", ltv: 12500, color: "#ef4444" },
        { id: 6, name: "Анна Бойко", company: "Студія дизайну 'Art'", phone: "+38 (067) 333-22-11", email: "anna@artdesign.ua", status: "Новий лід", ltv: 0, color: "#06b6d4" }
    ]);

    // Стани для фільтрів
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Отримання ініціалів
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    // Отримання CSS-класу для статусу
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Активний": return "status-active";
            case "Новий лід": return "status-lead";
            case "В перемовинах": return "status-nego";
            default: return "";
        }
    };

    // Фільтрація клієнтів
    const filteredClients = useMemo(() => {
        return clients.filter(client => {
            const matchesSearch =
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === "all" || client.status === filterStatus;

            return matchesSearch && matchesStatus;
        });
    }, [clients, searchTerm, filterStatus]);

    // Підрахунок KPI
    const kpiTotal = clients.length;
    const kpiActive = clients.filter(c => c.status === "Активний").length;
    const kpiLeads = clients.filter(c => c.status === "Новий лід").length;

    return (
        <div className="clients-page">
            {/* Шапка сторінки */}
            <div className="page-header">
                <div className="header-titles">
                    <h2>База клієнтів</h2>
                    <span className="divider">|</span>
                    <span className="subtitle">Управління контактами та лідами</span>
                </div>
                <button className="add-btn"><i className="fa-solid fa-plus"></i> Новий клієнт</button>
            </div>

            {/* KPI Картки */}
            <section className="kpi-section">
                <div className="kpi-card bg-blue fade-in-card">
                    <div className="kpi-header">
                        <h3>Всього контактів</h3>
                        <i className="fa-solid fa-address-book" style={{opacity: 0.8}}></i>
                    </div>
                    <div className="kpi-value">{kpiTotal}</div>
                </div>
                <div className="kpi-card bg-green fade-in-card" style={{ animationDelay: '0.1s' }}>
                    <div className="kpi-header">
                        <h3>Активні клієнти</h3>
                        <i className="fa-solid fa-user-check" style={{opacity: 0.8}}></i>
                    </div>
                    <div className="kpi-value">{kpiActive}</div>
                </div>
                <div className="kpi-card bg-purple fade-in-card" style={{ animationDelay: '0.2s' }}>
                    <div className="kpi-header">
                        <h3>Нові ліди (Місяць)</h3>
                        <i className="fa-solid fa-fire" style={{opacity: 0.8}}></i>
                    </div>
                    <div className="kpi-value">{kpiLeads}</div>
                </div>
            </section>

            {/* Панель інструментів */}
            <section className="toolbar-section fade-in-card" style={{ animationDelay: '0.3s' }}>
                <div className="search-box">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Пошук за ім'ям, компанією або email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-box">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">Всі статуси</option>
                        <option value="Активний">Активні</option>
                        <option value="Новий лід">Нові ліди</option>
                        <option value="В перемовинах">В перемовинах</option>
                    </select>
                </div>
            </section>

            {/* Сітка клієнтів */}
            <section className="clients-grid">
                {filteredClients.length > 0 ? (
                    filteredClients.map((client, index) => (
                        <div
                            key={client.id}
                            className="client-card fade-in-card"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="card-header">
                                <div className="client-header-left">
                                    <div className="client-avatar" style={{ backgroundColor: client.color }}>
                                        {getInitials(client.name)}
                                    </div>
                                    <div className="client-info">
                                        <h3>{client.name}</h3>
                                        <span className="company">{client.company}</span>
                                    </div>
                                </div>
                                <span className={`status-badge ${getStatusClass(client.status)}`}>
                  {client.status}
                </span>
                            </div>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <i className="fa-solid fa-phone"></i> {client.phone}
                                </div>
                                <div className="contact-item">
                                    <i className="fa-solid fa-envelope"></i> {client.email}
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="ltv-info">
                                    <span>LTV (Прибуток)</span>
                                    <strong>₴{client.ltv.toLocaleString('uk-UA')}</strong>
                                </div>
                                <div className="card-actions">
                                    <button title="Написати повідомлення"><i className="fa-regular fa-comment"></i></button>
                                    <button title="Відправити Email"><i className="fa-regular fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '20px', color: '#64748b' }}>
                        За вашим запитом клієнтів не знайдено.
                    </div>
                )}
            </section>
        </div>
    );
};

export default Clients;