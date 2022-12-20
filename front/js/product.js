// extract the id from the link
let url = new URL(window.location.href);
const productId = url.searchParams.get("id");
// use the api
fetch ("http://localhost:3000/api/products/" + productId)
.then ((res) => {
    if (res.ok) {
// return json if it works
        return res.json();
    }
})
// call the function
.then ((data) => {
    displayProductId(data);
})
// if error
.catch((error) => {
    window.alert("Une erreur s'est produite, merci de recharger la page.");
});

function displayProductId(product) {
// change the <title> of the page
    var title = document.querySelector("title");
    title.innerText = product.name;
// change the image
    var image = document.querySelector(".item__img");
    image.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
// change the title
    var titleProduct = document.querySelector("#title");
    titleProduct.innerText = product.name;
// change the price
    var price = document.querySelector("#price");
    price.innerText = product.price;
// change the description
    var description = document.querySelector("#description");
    description.innerText = product.description;
// change the color
    for (color = 0; color < product.colors.length; color++) {
    var colors = document.querySelector("#colors");
    colors.innerHTML += `<option value="${product.colors[color]}">${product.colors[color]}</option>`;
    };
};