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

// create the local storage
function storeInLocal() {
    var addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", () => {
// colors.value & quantity.value
        var colorV = document.querySelector("#colors").value;
        var quantityV = document.querySelector("#quantity").value;
// check if the color & quantity are chosen 
        if (colorV === "" && quantityV < 1 || quantityV > 100) {
            window.alert("Merci de séléctionner une couleur et une quantité.");
// check if the color is chosen
        } else if (colorV === "") {
            window.alert("Merci de choisir une couleur.");
            return;
// check if a quantity is chosen
        } else if (quantityV === 0) {
            window.alert("Merci de choisir une quantité.");
            return;
// check if the quantity isn't negative
        } else if (quantityV < 0) {
            window.alert("La quantité ne peut pas être négative.");
            return;
// check if the quantity isn't more than 100
        } else if (quantityV > 100) {
            window.alert("La quantité maximale est de 100, merci de choisir une quantité inférieure.");
            return;
//  then, an array with the customer's selection
        } else {
            var customSelect = {
                id: productId,
                color: colorV,
                quantity: quantityV,
            };
    })
};

storeInLocal();