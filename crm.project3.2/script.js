const clients = [
  { name: "Іван Петренко", status: "Новий" },
  { name: "Олена Коваль", status: "В роботі" },
  { name: "Петро Іванов", status: "Завершено" },
  { name: "Анна Клим", status: "Новий" },
  { name: "Сергій Дяченко", status: "В роботі" },
  { name: "Марія Бондар", status: "Новий" },
  { name: "Дмитро Савчук", status: "В роботі" },
  { name: "Наталія Лисенко", status: "Завершено" },
  { name: "Андрій Ткаченко", status: "Новий" },
  { name: "Юлія Мельник", status: "В роботі" },
  { name: "Олексій Гончар", status: "Завершено" },
  { name: "Ірина Шевченко", status: "Новий" },
  { name: "Владислав Коваль", status: "В роботі" },
  { name: "Катерина Романюк", status: "Завершено" },
  { name: "Максим Кравець", status: "Новий" },
  { name: "Денис Мартинюк", status: "В роботі" },
  { name: "Світлана Гнатюк", status: "Новий" }
];

const statusCount = {
  "Нові клієнти": 0,
  "В процесі роботи": 0,
  "Завершені угоди": 0
};

clients.forEach(c => {
  if (c.status === "Новий") statusCount["Нові клієнти"]++;
  if (c.status === "В роботі") statusCount["В процесі роботи"]++;
  if (c.status === "Завершено") statusCount["Завершені угоди"]++;
});

new Chart(document.getElementById("statusChart"), {
  type: "bar",
  data: {
    labels: Object.keys(statusCount),
    datasets: [{
      label: "Клієнти по статусах",
      data: Object.values(statusCount),
      backgroundColor: ["#3498db", "#f39c12", "#2ecc71"],
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "CRM аналітика клієнтів"
      },
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Кількість клієнтів"
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        title: {
          display: true,
          text: "Статуси клієнтів"
        }
      }
    }
  }
});