document.addEventListener('DOMContentLoaded', () => {
    const productsData = [
        { id: "SKU-001", name: "Ноутбук Gigabyte G5", category: "Електроніка", price: 32000, stock: 15, status: "В наявності" },
        { id: "SKU-002", name: "Мишка Logitech G Pro X", category: "Аксесуари", price: 4500, stock: 42, status: "В наявності" },
        { id: "SKU-003", name: "Монітор Dell 27\"", category: "Електроніка", price: 12000, stock: 3, status: "Закінчується" },
        { id: "SKU-004", name: "Механічна клавіатура Keychron", category: "Аксесуари", price: 5200, stock: 0, status: "Немає в наявності" },
        { id: "SKU-005", name: "Крісло Anda Seat", category: "Меблі", price: 14000, stock: 5, status: "В наявності" } // Додав ще одну категорію для перевірки
    ];

    renderDashboard(productsData);
});

function renderDashboard(products) {
    const tbody = document.getElementById('inventory-body');
    
    //змінні для розрахунків
    let totalItems = 0;
    let totalValue = 0;
    const categoriesSet = new Set(); // Set автоматично відкидає дублікати

    //очистка таблиці перед заповненням
    tbody.innerHTML = '';

    products.forEach((product, index) => {
        //АВТОМАТИЧНІ ПІДРАХУНКИ
        totalItems += product.stock; //додається кількість цього товару
        totalValue += (product.price * product.stock); //множиться ціна на залишок і додається до загальної суми
        categoriesSet.add(product.category); //додається категорія (якщо така вже є, set її просто проігнорує)

        //ВІДМАЛЬОВКА РЯДКІВ ТАБЛИЦІ
        let statusClass = 'good';
        if (product.stock === 0) statusClass = 'danger';
        else if (product.stock < 5) statusClass = 'warning';

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

    //отримується унікальна кількість категорій
    const totalCategories = categoriesSet.size;

    //АНІМОВАНЕ ОНОВЛЕННЯ КАРТОК СТАТИСТИКИ З НОВИМИ ДАНИМИ
    animateValue("total-items", 0, totalItems, 1000);
    animateValue("total-value", 0, totalValue, 1000, "₴");
    animateValue("total-categories", 0, totalCategories, 1000); 
}

//функція для красивої анімації цифр від 0 до кінцевого результату
function animateValue(id, start, end, duration, prefix = "") {
    const obj = document.getElementById(id);
    if (!obj) return; // Перевірка, чи існує елемент на сторінці
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * (end - start) + start);
        
        //виводить число з роздільниками розрядів 1 000 000 000
        obj.innerHTML = prefix + currentVal.toLocaleString('uk-UA');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            //щоб уникнути похибок заокруглення в кінці жорстко ставиться фінальне значення
            obj.innerHTML = prefix + end.toLocaleString('uk-UA');
        }
    };
    window.requestAnimationFrame(step);
}