let employeesData = [];

fetch('/api/employees')
    .then(res => res.json())
    .then(data => {
        employeesData = data;
        document.getElementById("total").innerText = data.length;
        displayEmployees(data);
    });

function displayEmployees(data) {
    let container = document.getElementById('employeeList');
    container.innerHTML = '';

    data.forEach(emp => {
        let card = `
            <div class="card">
                <img src="${emp.image}" alt="${emp.name}">
                <div class="info">
                    <h3>${emp.name}</h3>
                    <p class="designation">${emp.designation}</p>
                    <span class="dept">${emp.department}</span>
                    <p class="salary">₹${emp.salary}</p>
                    <small>ID: ${emp.id}</small>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 🔍 Search functionality
document.getElementById("search").addEventListener("input", function() {
    let value = this.value.toLowerCase();

    let filtered = employeesData.filter(emp =>
        emp.name.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value)
    );

    displayEmployees(filtered);
});