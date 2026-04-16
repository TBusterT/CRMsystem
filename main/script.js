document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Анімація цифр (Count Up) ---
    const countElements = document.querySelectorAll('.kpi-value, .count-up');
    countElements.forEach(el => {
        const targetAttr = el.getAttribute('data-target');
        if (!targetAttr) return;
        const target = parseInt(targetAttr);
        let current = 0;
        const step = target / 50;

        const update = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.ceil(current).toLocaleString('uk-UA');
                setTimeout(update, 20);
            } else {
                el.innerText = target.toLocaleString('uk-UA');
            }
        };
        update();
    });

    // --- 2. Налаштування Chart.js ---
    const canvas = document.getElementById('salesChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dataSets = {
            week: {
                labels: ['Пн', 'Вв', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
                data: [1200, 1900, 1500, 2200, 1800, 2500, 2100],
                color: '#3b82f6'
            },
            month: {
                labels: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв'],
                data: [45000, 52000, 48000, 61000, 55000, 67000],
                color: '#10b981'
            }
        };

        let salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataSets.month.labels,
                datasets: [{
                    data: dataSets.month.data,
                    backgroundColor: dataSets.month.color,
                    borderRadius: 8,
                    barThickness: 30
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
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

        // --- 3. Перемикання періодів ---
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const type = tab.getAttribute('data-type');
                const newData = dataSets[type];

                salesChart.data.labels = newData.labels;
                salesChart.data.datasets[0].data = newData.data;
                salesChart.data.datasets[0].backgroundColor = newData.color;
                salesChart.update();
            });
        });
    }
});