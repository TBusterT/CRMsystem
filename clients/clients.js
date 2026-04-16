document.addEventListener("DOMContentLoaded", () => {

    // 1. Мок-дані (База клієнтів)
    const clients = [
        { id: 1, name: "Олександр Ткачук", company: "ТОВ «БудЕксперт»", phone: "+38 (050) 123-45-67", email: "olex@bud.ua", status: "Активний", ltv: 145000, color: "#3b82f6" },
        { id: 2, name: "Марія Коваленко", company: "ФОП Коваленко", phone: "+38 (067) 765-43-21", email: "maria.k@gmail.com", status: "Новий лід", ltv: 0, color: "#10b981" },
        { id: 3, name: "Ігор Мельник", company: "IT Solutions Group", phone: "+38 (063) 111-22-33", email: "igor.m@itsol.com", status: "В перемовинах", ltv: 25000, color: "#8b5cf6" },
        { id: 4, name: "Олена Петренко", company: "Kavka Cafe", phone: "+38 (099) 999-88-77", email: "petrenko@kavka.ua", status: "Активний", ltv: 54000, color: "#f59e0b" },
        { id: 5, name: "Сергій Васильєв", company: "AutoParts UA", phone: "+38 (050) 555-44-33", email: "serg@autoparts.ua", status: "Активний", ltv: 12500, color: "#ef4444" },
        { id: 6, name: "Анна Бойко", company: "Студія дизайну 'Art'", phone: "+38 (067) 333-22-11", email: "anna@artdesign.ua", status: "Новий лід", ltv: 0, color: "#06b6d4" }
    ];

    const gridContainer = document.getElementById("clientsGrid");
    const searchInput = document.getElementById("searchClient");
    const statusFilter = document.getElementById("statusFilter");

    // 2. Функція отримання ініціалів (наприклад, "Олександр Ткачук" -> "ОТ")
    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    // Отримання CSS класу для бейджа
    function getStatusClass(status) {
        if (status === "Активний") return "status-active";
        if (status === "Новий лід") return "status-lead";
        if (status === "В перемовинах") return "status-nego";
        return "";
    }

    // 3. Рендер сітки карток
    function renderClients(data) {
        gridContainer.innerHTML = "";

        if(data.length === 0) {
            gridContainer.innerHTML = `<p style="color: #64748b; padding: 20px;">За вашим запитом клієнтів не знайдено.</p>`;
            return;
        }

        data.forEach((client, index) => {
            const card = document.createElement('div');
            card.className = 'client-card fade-in-card';
            card.style.animationDelay = `${index * 0.05}s`; // Плавна поява по черзі

            card.innerHTML = `
                <div class="card-header">
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <div class="client-avatar" style="background-color: ${client.color}">
                            ${getInitials(client.name)}
                        </div>
                        <div class="client-info">
                            <h3>${client.name}</h3>
                            <span class="company">${client.company}</span>
                        </div>
                    </div>
                    <span class="status-badge ${getStatusClass(client.status)}">${client.status}</span>
                </div>
                
                <div class="contact-details">
                    <div class="contact-item">
                        <i class="fa-solid fa-phone"></i> ${client.phone}
                    </div>
                    <div class="contact-item">
                        <i class="fa-solid fa-envelope"></i> ${client.email}
                    </div>
                </div>

                <div class="card-footer">
                    <div class="ltv-info">
                        <span>LTV (Прибуток)</span>
                        <strong>₴${client.ltv.toLocaleString('uk-UA')}</strong>
                    </div>
                    <div class="card-actions">
                        <button title="Написати повідомлення"><i class="fa-regular fa-comment"></i></button>
                        <button title="Відправити Email"><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    // 4. Оновлення KPI (Верхні картки)
    function updateKPIs(data) {
        document.getElementById("kpi-total").innerText = data.length;
        document.getElementById("kpi-active").innerText = data.filter(c => c.status === "Активний").length;
        document.getElementById("kpi-leads").innerText = data.filter(c => c.status === "Новий лід").length;
    }

    // 5. Логіка фільтрації
    function filterClients() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterStatus = statusFilter.value;

        const filtered = clients.filter(client => {
            const matchesSearch = client.name.toLowerCase().includes(searchTerm) ||
                client.company.toLowerCase().includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm);

            const matchesStatus = filterStatus === "all" || client.status === filterStatus;

            return matchesSearch && matchesStatus;
        });

        renderClients(filtered);
    }

    // Слухачі подій для фільтрів
    searchInput.addEventListener("input", filterClients);
    statusFilter.addEventListener("change", filterClients);

    // Первинний запуск
    renderClients(clients);
    updateKPIs(clients);
});