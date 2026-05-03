const products = [
    {name:"Wireless Headphones", price:7999, desc:"Noise-cancelling over-ear headphones.", img:"https://via.placeholder.com/80"},
    {name:"Smartwatch", price:12999, desc:"Fitness tracking smartwatch.", img:"https://via.placeholder.com/80"},
    {name:"Gaming Mouse", price:2499, desc:"Ergonomic gaming mouse.", img:"https://via.placeholder.com/80"},
    {name:"Laptop Stand", price:1999, desc:"Adjustable aluminium stand.", img:"https://via.placeholder.com/80"},

    {name:"Keyboard", price:2999, desc:"Mechanical keyboard.", img:"https://via.placeholder.com/80"},
    {name:"Monitor", price:15999, desc:"24 inch full HD monitor.", img:"https://via.placeholder.com/80"},
    {name:"Speaker", price:4999, desc:"Bluetooth speaker.", img:"https://via.placeholder.com/80"},
    {name:"Tablet", price:19999, desc:"10 inch tablet.", img:"https://via.placeholder.com/80"},
    {name:"Phone", price:25999, desc:"Latest smartphone.", img:"https://via.placeholder.com/80"},
    {name:"Charger", price:999, desc:"Fast charging adapter.", img:"https://via.placeholder.com/80"},
    {name:"Camera", price:45999, desc:"DSLR camera.", img:"https://via.placeholder.com/80"},
    {name:"Printer", price:8999, desc:"Wireless printer.", img:"https://via.placeholder.com/80"}
];

const rowsPerPage = 10;
let currentPage = 1;

function displayProducts() {
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedItems = products.slice(start, end);

    paginatedItems.forEach(p => {
        let row = `
            <tr>
                <td><img src="${p.img}" /></td>
                <td>${p.name}</td>
                <td>₹${p.price}</td>
                <td>${p.desc}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById("pageInfo").innerText =
        `Page ${currentPage} of ${Math.ceil(products.length / rowsPerPage)}`;
}

function nextPage() {
    if (currentPage < Math.ceil(products.length / rowsPerPage)) {
        currentPage++;
        displayProducts();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

displayProducts();