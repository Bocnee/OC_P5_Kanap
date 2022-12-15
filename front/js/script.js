
fetch("http://localhost:3000/api/products")
.then((res) => {
    if (res.ok) {
        return res.json();
    }
})
.then((data) => {
    displayProducts(data);
})

function displayProducts(products) {
    var section = document.getElementById("items");
    for (product of products) {
        
        section.innerHTML += `<a href="./product.html?id=42"><article><img src="${product.imageUrl}"alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article></a>`
    }
}