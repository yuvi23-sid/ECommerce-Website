document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products");
    const categoryFilter = document.getElementById("category-filter");
    const sortBy = document.getElementById("sort-by");

    let productsData = []; // To store fetched products data

    // Fetch data from API
    function fetchAndDisplay(){
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            productsData = data;
            
            renderProducts(productsData);
        })
        .catch(error => console.error("Error fetching data:", error));
    }

    fetchAndDisplay()
    

    // Render products on the page
    function renderProducts(products) {
        productsContainer.innerHTML = ""; // Clear previous products

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    // Filter products by category  
    categoryFilter.addEventListener("change", function() {
        const category = categoryFilter.value.toLowerCase();
        console.log(category);
        let filteredProducts = productsData;
        if (category !== "all") {
            filteredProducts = productsData.filter(product => product.category === category);
            console.log(filteredProducts)
        }   
        renderProducts(filteredProducts);
    });

    // Sort products by price
    sortBy.addEventListener("change", function() {
        const sortOrder = sortBy.value;
        let sortedProducts = [...productsData];
        if (sortOrder === "asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        renderProducts(sortedProducts);
    });
});

