import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="top-header">
            <div className="header-title">
                <h2>Панель управління</h2>
                <span className="divider">|</span>
                <span className="last-update">Останнє оновлення: <span>щойно</span></span>
            </div>
            <div className="header-actions">
                <button className="icon-btn">
                    <i className="fa-regular fa-bell"></i>
                </button>
                <button className="profile-btn">
                    <i className="fa-solid fa-user"></i>
                </button>
            </div>
        </header>
    );
};