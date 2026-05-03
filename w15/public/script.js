fetch('/api/products')
    .then(res => res.json())
    .then(data => {
        let container = document.getElementById('productList');

        data.forEach(product => {
            let card = `
                <div class="card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                    <button>Add to Cart</button>
                </div>
            `;
            container.innerHTML += card;
        });
    })
    .catch(err => console.log(err));