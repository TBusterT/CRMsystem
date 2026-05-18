import React from 'react';
import { inventoryApi } from '../api/inventory.api';
import { useApi } from '../hooks/useApi';
import '../styles/inventory.css';

const Inventory: React.FC = () => {
  const { data: products, loading, error } = useApi(
      () => inventoryApi.getAll(),
      [],
      [],
  );

  const { data: stats } = useApi(
      () => inventoryApi.getStats(),
      [],
  );

  return (
      <>
        <div className="stats-container">
          <div className="stat-card blue">
            <div className="stat-info">
              <h3>Всього товарів <i className="fa-solid fa-box-open" style={{ marginLeft: '8px', opacity: 0.7 }}></i></h3>
              <div className="stat-value">
                {stats?.totalItems.toLocaleString('uk-UA') ?? '—'}
              </div>
              <div className="stat-trend">На основі бази даних</div>
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-info">
              <h3>Вартість складу <i className="fa-solid fa-money-bill-wave" style={{ marginLeft: '8px', opacity: 0.7 }}></i></h3>
              <div className="stat-value">
                {stats ? `₴${stats.totalValue.toLocaleString('uk-UA')}` : '—'}
              </div>
              <div className="stat-trend">Автоматичний підрахунок</div>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-info">
              <h3>Категорії <i className="fa-solid fa-layer-group" style={{ marginLeft: '8px', opacity: 0.7 }}></i></h3>
              <div className="stat-value">{stats?.totalCategories ?? '—'}</div>
              <div className="stat-trend">Унікальні розділи</div>
            </div>
          </div>
        </div>

        <div className="inventory-section">
          <div className="section-header">
            <h3>Каталог товарів та залишки</h3>
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
                <table className="inventory-table">
                  <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Назва товару</th>
                    <th>Категорія</th>
                    <th>Ціна</th>
                    <th>Залишок</th>
                    <th>Статус</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products.map((product, index) => {
                    let statusClass = 'good';
                    if (product.stock === 0) statusClass = 'danger';
                    else if (product.stock <= 5) statusClass = 'warning';

                    return (
                        <tr
                            key={product.id}
                            className="fade-in-row"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <td><strong>{product.sku}</strong></td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>₴{Number(product.price).toLocaleString('uk-UA')}</td>
                          <td>{product.stock} шт.</td>
                          <td>
                                                <span className={`status-badge ${statusClass}`}>
                                                    {product.status}
                                                </span>
                          </td>
                        </tr>
                    );
                  })}
                  {products.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                          Товарів не знайдено
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
            )}
          </div>
        </div>
      </>
  );
};

export default Inventory;
