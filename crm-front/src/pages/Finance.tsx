import React, { useState, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../styles/finance.css';

// Реєструємо компоненти Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface Transaction {
    id: number;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'Дохід' | 'Витрата';
}

const Finance: React.FC = () => {
    // База транзакцій
    const [transactions] = useState<Transaction[]>([
        { id: 1, date: "2026-04-16", description: "Оплата за веб-розробку", category: "Послуги", amount: 45000, type: "Дохід" },
        { id: 2, date: "2026-04-15", description: "Оренда сервера AWS", category: "Інфраструктура", amount: -3200, type: "Витрата" },
        { id: 3, date: "2026-04-14", description: "Продаж CRM ліцензії", category: "Продажі", amount: 15000, type: "Дохід" },
        { id: 4, date: "2026-04-12", description: "Маркетингова кампанія Meta", category: "Реклама", amount: -8500, type: "Витрата" },
        { id: 5, date: "2026-04-10", description: "Консультація клієнта", category: "Послуги", amount: 4000, type: "Дохід" },
        { id: 6, date: "2026-04-08", description: "Закупівля кави в офіс", category: "Офіс", amount: -1200, type: "Витрата" }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Фільтрація
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t =>
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transactions, searchTerm]);

    // Форматування суми в таблиці
    const formatAmount = (amount: number, type: string) => {
        const sign = type === 'Дохід' ? '+' : '-';
        const absValue = Math.abs(amount).toLocaleString('uk-UA');
        return `${sign} ₴${absValue}`;
    };

    // --- ЛОГІКА ДИНАМІЧНОГО ГРАФІКА ---

    // 1. Рахуємо загальні суми (беремо всі транзакції, а не тільки відфільтровані,
    //    щоб графік показував загальну картину за місяць)
    const totalIncome = transactions
        .filter(t => t.type === 'Дохід')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'Витрата')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // 2. Налаштування даних для Chart.js
    const chartData = {
        labels: ['Квітень 2026'], // Спільний підпис знизу
        datasets: [
            {
                label: 'Доходи',
                data: [totalIncome],
                backgroundColor: '#10b981', // Зелений
                borderRadius: 4,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
            },
            {
                label: 'Витрати',
                data: [totalExpense],
                backgroundColor: '#ef4444', // Червоний
                borderRadius: 4,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
            }
        ]
    };

    // 3. Налаштування зовнішнього вигляду графіка
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Ховаємо стандартну легенду, як на макеті
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 13, weight: 'normal' as const },
                bodyFont: { size: 14, weight: 'bold' as const },
                callbacks: {
                    label: function(context: any) {
                        return ` ₴ ${context.raw.toLocaleString('uk-UA')}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f1f5f9', // Світлі лінії сітки
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { size: 11 },
                    callback: function(value: any) {
                        return value.toLocaleString('uk-UA'); // Форматуємо вісь Y
                    }
                }
            },
            x: {
                grid: {
                    display: false, // Прибираємо вертикальні лінії
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { size: 12 }
                }
            }
        }
    };

    return (
        <div className="finance-page">
            <div className="page-header">
                <div className="header-titles">
                    <h2>Фінанси</h2>
                    <span className="divider">|</span>
                    <span className="subtitle">Управління доходами та витратами</span>
                </div>
                <button className="add-btn"><i className="fa-solid fa-plus"></i> Нова транзакція</button>
            </div>

            {/* --- СПРАВЖНІЙ ДИНАМІЧНИЙ ГРАФІК --- */}
            <section className="finance-chart-section fade-in-card">
                <div style={{ height: '100%', width: '100%' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </section>

            {/* Таблиця транзакцій */}
            <section className="transactions-section fade-in-card" style={{ animationDelay: '0.1s' }}>
                <div className="section-header">
                    <h3>Останні транзакції</h3>
                    <div className="search-box small-search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Пошук за описом..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-container">
                    <table className="finance-table">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Опис операції</th>
                            <th>Категорія</th>
                            <th>Сума</th>
                            <th>Тип</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td className="date-cell">{tx.date}</td>
                                    <td><strong>{tx.description}</strong></td>
                                    <td className="category-cell">{tx.category}</td>
                                    <td><strong>{formatAmount(tx.amount, tx.type)}</strong></td>
                                    <td>
                      <span className={`status-badge ${tx.type === 'Дохід' ? 'good' : 'danger'}`}>
                        {tx.type}
                      </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                    Транзакцій не знайдено
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Finance;