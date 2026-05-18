import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { financeApi } from '../api/finance.api';
import { useApi } from '../hooks/useApi';
import '../styles/finance.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Finance: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: transactions, loading, error } = useApi(
        () => financeApi.getAll(),
        [],
        [],
    );

    const { data: summary } = useApi(
        () => financeApi.getSummary(),
        [],
    );

    const filteredTransactions = transactions.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const formatAmount = (amount: number, type: string) => {
        const sign = type === 'income' ? '+' : '-';
        return `${sign} ₴${Math.abs(amount).toLocaleString('uk-UA')}`;
    };

    const formatDate = (iso: string) => iso.split('T')[0];

    const typeLabel = (type: string) => type === 'income' ? 'Дохід' : 'Витрата';

    const chartData = {
        labels: ['Поточний період'],
        datasets: [
            {
                label: 'Доходи',
                data: [summary?.totalIncome ?? 0],
                backgroundColor: '#10b981',
                borderRadius: 4,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
            },
            {
                label: 'Витрати',
                data: [summary?.totalExpense ?? 0],
                backgroundColor: '#ef4444',
                borderRadius: 4,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                callbacks: {
                    label: (context: any) =>
                        ` ₴ ${context.raw.toLocaleString('uk-UA')}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: {
                    color: '#64748b',
                    callback: (v: any) => v.toLocaleString('uk-UA'),
                },
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b' },
            },
        },
    };

    return (
        <div className="finance-page">
            <div className="page-header">
                <div className="header-titles">
                    <h2>Фінанси</h2>
                    <span className="divider">|</span>
                    <span className="subtitle">Управління доходами та витратами</span>
                </div>
                <button className="add-btn">
                    <i className="fa-solid fa-plus"></i> Нова транзакція
                </button>
            </div>

            <section className="finance-chart-section fade-in-card">
                <div style={{ height: '100%', width: '100%' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </section>

            <section className="transactions-section fade-in-card" style={{ animationDelay: '0.1s' }}>
                <div className="section-header">
                    <h3>Останні транзакції</h3>
                    <div className="search-box small-search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Пошук за описом..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-container">
                    {loading && (
                        <div style={{ padding: '20px', color: '#64748b' }}>
                            <i className="fa-solid fa-spinner fa-spin"></i> Завантаження...
                        </div>
                    )}
                    {error && (
                        <div style={{ padding: '20px', color: '#ef4444' }}>
                            <i className="fa-solid fa-triangle-exclamation"></i> {error}
                        </div>
                    )}
                    {!loading && !error && (
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
                                filteredTransactions.map(tx => (
                                    <tr key={tx.id}>
                                        <td className="date-cell">{formatDate(tx.createdAt)}</td>
                                        <td><strong>{tx.description}</strong></td>
                                        <td className="category-cell">{tx.category}</td>
                                        <td><strong>{formatAmount(tx.amount, tx.type)}</strong></td>
                                        <td>
                                                <span className={`status-badge ${tx.type === 'income' ? 'good' : 'danger'}`}>
                                                    {typeLabel(tx.type)}
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
                    )}
                </div>
            </section>
        </div>
    );
};

export default Finance;
