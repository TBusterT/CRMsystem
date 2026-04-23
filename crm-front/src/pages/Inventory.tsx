import React, { useState, useEffect } from 'react';
import '../styles/inventory.css'; // РОЗКОМЕНТОВАНО: тепер стилі підключаються

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({ totalItems: 0, totalValue: 0, totalCategories: 0 });

  useEffect(() => {
    // Імітація бази даних товарів
    const productsData: Product[] = [
      { id: "SKU-001", name: "Ноутбук Gigabyte G5", category: "Електроніка", price: 32000, stock: 15, status: "В наявності" },
      { id: "SKU-002", name: "Мишка Logitech G Pro X", category: "Аксесуари", price: 4500, stock: 42, status: "В наявності" },
      { id: "SKU-003", name: "Монітор Dell 27\"", category: "Електроніка", price: 12000, stock: 3, status: "Закінчується" },
      { id: "SKU-004", name: "Механічна клавіатура Keychron", category: "Аксесуари", price: 5200, stock: 0, status: "Немає в наявності" },
      { id: "SKU-005", name: "Навушники HyperX Cloud", category: "Аудіо", price: 3500, stock: 8, status: "В наявності" },
      { id: "SKU-006", name: "Крісло Anda Seat", category: "Меблі", price: 14000, stock: 2, status: "Закінчується" }
    ];

    setProducts(productsData);

    let items = 0;
    let value = 0;
    const categoriesSet = new Set<string>();

    productsData.forEach(p => {
      items += p.stock;
      value += p.price * p.stock;
      categoriesSet.add(p.category);
    });

    setStats({
      totalItems: items,
      totalValue: value,
      totalCategories: categoriesSet.size
    });
  }, []);

  return (
      <>
        {/* Картки статистики */}
        <div className="stats-container">
          <div className="stat-card blue"> {/* ВИПРАВЛЕНО КЛАС */}
            <div className="stat-info">
              <h3>Всього товарів <i className="fa-solid fa-box-open" style={{marginLeft: '8px', opacity: 0.7}}></i></h3>
              <div className="stat-value">{stats.totalItems.toLocaleString('uk-UA')}</div>
              <div className="stat-trend">На основі бази даних</div>
            </div>
          </div>
          <div className="stat-card green"> {/* ВИПРАВЛЕНО КЛАС */}
            <div className="stat-info">
              <h3>Вартість складу <i className="fa-solid fa-money-bill-wave" style={{marginLeft: '8px', opacity: 0.7}}></i></h3>
              <div className="stat-value">₴{stats.totalValue.toLocaleString('uk-UA')}</div>
              <div className="stat-trend">Автоматичний підрахунок</div>
            </div>
          </div>
          <div className="stat-card purple"> {/* ВИПРАВЛЕНО КЛАС */}
            <div className="stat-info">
              <h3>Категорії <i className="fa-solid fa-layer-group" style={{marginLeft: '8px', opacity: 0.7}}></i></h3>
              <div className="stat-value">{stats.totalCategories}</div>
              <div className="stat-trend">Унікальні розділи</div>
            </div>
          </div>
        </div>

        {/* Таблиця товарів */}
        <div className="inventory-section">
          <div className="section-header">
            <h3>Каталог товарів та залишки</h3>
          </div>
          <div className="table-container">
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
                else if (product.stock < 5) statusClass = 'warning';

                return (
                    <tr
                        key={product.id}
                        className="fade-in-row"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td><strong>{product.id}</strong></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₴{product.price.toLocaleString('uk-UA')}</td>
                      <td>{product.stock} шт.</td>
                      <td><span className={`status-badge ${statusClass}`}>{product.status}</span></td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
};


export default Inventory;