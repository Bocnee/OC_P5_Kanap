
// call the local storage
var cart = JSON.parse(localStorage.getItem("product"));
// function if the cart is empty
var totalQuantity = 0
var totalPrice = 0
function emptyCart(products) {
    if (cart === null) {
        var emptyCart = document.querySelector("#cart__items");
        emptyCart.innerHTML += `<h2 style="text-align:center;">Aucun article à afficher dans le panier.<h2>`;
        return;
    }
};
// call the function "empyCart"
emptyCart();
// variable to stock the api elements
const productsApi = []
// loop in the cart, to find the id in the localstorage
for (let element of cart) {
    let apiId = element.id;
// use the api, and find the element with the id in the localstorage
    fetch ("http://localhost:3000/api/products/" + apiId)
    .then ((res) => { 
        if (res.ok) { 
            return res.json(); 
        }
    })
    .then ((productApi) => { 
        productsApi.push(productApi); 
        displayCartProduct(element, productApi);
    })
    .catch ((error) => { 
        window.alert("Une erreur s'estproduite, merci de rafraîchir la page.");
    });
}
// function to display the products in cart page
function displayCartProduct(cartElement, apiElement) {
    const title = document.querySelector("title");
    title.innerText = `Panier`
    const section = document.getElementById("cart__items");
    section.innerHTML += `
      <article class="cart__item" data-id="${apiElement._id}" data-color="${cartElement.color}">
        <div class="cart__item__img">
          <img src="${apiElement.imageUrl}" alt="${apiElement.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${apiElement.name}</h2>
            <p>${cartElement.color}</p>
            <p>${apiElement.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartElement.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `
const tQuantity = document.getElementById("totalQuantity");
const tPrice = document.getElementById("totalPrice");
totalQuantity += Number(cartElement.quantity);
totalPrice += Number(apiElement.price) * Number(cartElement.quantity); 
tQuantity.innerText = totalQuantity;
tPrice.innerText = totalPrice;
}