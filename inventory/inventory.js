document.addEventListener('DOMContentLoaded', () => {
    // Тестові дані (Мок-дані)
    const productsData = [
        { id: "SKU-001", name: "Ноутбук Gigabyte G5", category: "Електроніка", price: 32000, stock: 15, status: "В наявності" },
        { id: "SKU-002", name: "Мишка Logitech G Pro X", category: "Аксесуари", price: 4500, stock: 42, status: "В наявності" },
        { id: "SKU-003", name: "Монітор Dell 27\"", category: "Електроніка", price: 12000, stock: 3, status: "Закінчується" },
        { id: "SKU-004", name: "Механічна клавіатура Keychron", category: "Аксесуари", price: 5200, stock: 0, status: "Немає в наявності" },
        { id: "SKU-005", name: "Крісло Anda Seat", category: "Меблі", price: 14000, stock: 5, status: "В наявності" }
    ];

    renderDashboard(productsData);
});

function renderDashboard(products) {
    const tbody = document.getElementById('inventory-body');

    let totalItems = 0;
    let totalValue = 0;
    const categoriesSet = new Set();

    tbody.innerHTML = '';

    products.forEach((product, index) => {
        // Розрахунки
        totalItems += product.stock;
        totalValue += (product.price * product.stock);
        categoriesSet.add(product.category);

        // Визначення кольору бейджа
        let statusClass = 'good';
        if (product.stock === 0) statusClass = 'danger';
        else if (product.stock < 5) statusClass = 'warning';

        // Генерація рядка
        const tr = document.createElement('tr');
        tr.className = 'fade-in-row';
        tr.style.animationDelay = `${index * 0.1}s`;

        tr.innerHTML = `
            <td><strong>${product.id}</strong></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₴${product.price.toLocaleString('uk-UA')}</td>
            <td>${product.stock} шт.</td>
            <td><span class="status-badge ${statusClass}">${product.status}</span></td>
        `;
        tbody.appendChild(tr);
    });

    // Запуск анімації оновлення карток
    animateValue("total-items", totalItems);
    animateValue("total-value", totalValue, "₴");
    animateValue("total-categories", categoriesSet.size);
}

// Функція анімації цифр
function animateValue(id, target, prefix = "") {
    const el = document.getElementById(id);
    if (!el) return;

    let current = 0;
    const step = Math.max(target / 40, 1); // Швидкість анімації

    const update = () => {
        current += step;
        if (current < target) {
            el.innerText = prefix + Math.ceil(current).toLocaleString('uk-UA');
            requestAnimationFrame(update);
        } else {
            el.innerText = prefix + target.toLocaleString('uk-UA');
        }
    };
    update();
}