// use the api
fetch("http://localhost:3000/api/products")
.then((res) => {
// return json if it works
    if (res.ok) {
        return res.json();
    }
})
// call the function
.then((data) => {
    displayProducts(data);
})
// if error
.catch((error) => {
    window.alert("Une erreur s'est produite, merci de recharger la page.");
});
// function to reclaim data from the api
function displayProducts(products) {
    var section = document.getElementById("items");
// separates elements from the array, and add them to the chosen id
    for (product of products) {
        section.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}"alt="${product.altTxt}"><h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `
    }
}

