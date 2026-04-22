import React from 'react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <div className="logo-area">
                <div className="logo-icon"><i className="fa-solid fa-table-columns"></i></div>
                <div className="logo-text">
                    <h1>CRM Pro</h1>
                    <span>v2.1.0</span>
                </div>
            </div>
            <nav className="menu">
                <p className="menu-label">Меню</p>
                <a href="/" className="menu-item active">
                    <div className="item-icon blue-icon"><i className="fa-solid fa-house"></i></div>
                    <span>Головна</span>
                </a>
                <a href="/clients" className="menu-item">
                    <div className="item-icon green-icon"><i className="fa-solid fa-users"></i></div>
                    <span>Клієнти</span>
                </a>
                <a href="/inbox" className="menu-item">
                    <div className="item-icon" style={{ backgroundColor: '#0ea5e9' }}><i className="fa-solid fa-message"></i></div>
                    <span>Повідомлення</span>
                </a>
                <a href="/inventory" className="menu-item">
                    <div className="item-icon purple-icon"><i className="fa-solid fa-box"></i></div>
                    <span>Товари</span>
                </a>
                <a href="/finance" className="menu-item">
                    <div className="item-icon" style={{ backgroundColor: '#f59e0b' }}><i className="fa-solid fa-wallet"></i></div>
                    <span>Фінанси</span>
                </a>
            </nav>
        </aside>
    );
};