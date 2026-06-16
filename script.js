const API_URL = "https://e-commerce-website-d28h.onrender.com";

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        const products = await response.json();

        const container = document.getElementById("products");

        if (!container) return;

        container.innerHTML = "";

        products.forEach(product => {
            container.innerHTML += `
                <div class="card">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>₹${product.price}</p>

                    <button onclick="addToCart('${product._id}')">
                        Add To Cart
                    </button>

                    <br><br>

                    <a href="product.html?id=${product._id}">
                        View Details
                    </a>
                </div>
            `;
        });

    } catch (error) {
        console.log(error);
        alert("Failed to load products");
    }
}

async function addToCart(productId) {
    try {
        const response = await fetch(`${API_URL}/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: productId,
                quantity: 1
            })
        });

        if (response.ok) {
            alert("Added To Cart");
        } else {
            alert("Failed to add to cart");
        }

    } catch (error) {
        console.log(error);
        alert("Server error");
    }
}

loadProducts();
