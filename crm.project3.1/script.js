const clients = [
  {
    name: "Іван Петренко",
    phone: "+380991234567",
    email: "ivan@gmail.com",
    lastContact: "2026-04-10",
    status: "Новий"
  },
  {
    name: "Олена Коваль",
    phone: "+380671112233",
    email: "olena@gmail.com",
    lastContact: "2026-04-08",
    status: "В роботі"
  }
];

const tableBody = document.getElementById("table-body");

function getStatusClass(status) {
  if (status === "Новий") return "new";
  if (status === "В роботі") return "progress";
  return "done";
}

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(client => {
    tableBody.innerHTML += `
      <tr>
        <td>${client.name}</td>
        <td>${client.phone}<br>${client.email}</td>
        <td>${client.lastContact}</td>
        <td>
          <span class="badge ${getStatusClass(client.status)}">
            ${client.status}
          </span>
        </td>
      </tr>
    `;
  });
}

renderTable(clients);

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  renderTable(filtered);
});