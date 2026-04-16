document.addEventListener("DOMContentLoaded", () => {

    // 1. Мок-дані фінансових транзакцій
    const transactions = [
        { date: "2026-04-16", desc: "Оплата за веб-розробку", category: "Послуги", amount: 45000, type: "Дохід" },
        { date: "2026-04-15", desc: "Оренда сервера AWS", category: "Інфраструктура", amount: 3200, type: "Витрата" },
        { date: "2026-04-14", desc: "Продаж CRM ліцензії", category: "Продажі", amount: 15000, type: "Дохід" },
        { date: "2026-04-12", desc: "Маркетингова кампанія Meta", category: "Реклама", amount: 8500, type: "Витрата" },
        { date: "2026-04-10", desc: "Консультація клієнта", category: "Послуги", amount: 4000, type: "Дохід" },
        { date: "2026-04-08", desc: "Закупівля кави в офіс", category: "Офіс", amount: 1200, type: "Витрата" }
    ];

    const tableBody = document.getElementById("table-body");
    const searchInput = document.getElementById("searchInput");

    // 2. Логіка рендеру таблиці
    function renderTable(data) {
        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">Транзакцій не знайдено</td></tr>`;
            return;
        }

        data.forEach(t => {
            const isIncome = t.type === "Дохід";
            const badgeClass = isIncome ? "income" : "expense";
            const amountClass = isIncome ? "amount-income" : "amount-expense";
            const sign = isIncome ? "+" : "-";

            tableBody.innerHTML += `
              <tr>
                <td>${t.date}</td>
                <td><strong>${t.desc}</strong></td>
                <td>${t.category}</td>
                <td class="${amountClass}">${sign} ₴${t.amount.toLocaleString('uk-UA')}</td>
                <td><span class="badge ${badgeClass}">${t.type}</span></td>
              </tr>
            `;
        });
    }

    // Первинний рендер таблиці
    renderTable(transactions);

    // 3. Логіка пошуку (фільтрація)
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();
        // Шукаємо збіги в описі або категорії
        const filtered = transactions.filter(t =>
            t.desc.toLowerCase().includes(value) ||
            t.category.toLowerCase().includes(value)
        );
        renderTable(filtered);
    });

    // 4. Логіка малювання графіка (Chart.js)
    // Підраховуємо загальну суму доходів і витрат для графіка
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
        if (t.type === "Дохід") totalIncome += t.amount;
        if (t.type === "Витрата") totalExpense += t.amount;
    });

    const ctx = document.getElementById("financeChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Квітень 2026"], // Можна розширити на кілька місяців
            datasets: [
                {
                    label: "Доходи",
                    data: [totalIncome],
                    backgroundColor: "#10b981", // Зелений
                    borderRadius: 6
                },
                {
                    label: "Витрати",
                    data: [totalExpense],
                    backgroundColor: "#ef4444", // Червоний
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => ` ₴ ${context.parsed.y.toLocaleString('uk-UA')}`
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            }
        }
    });

});