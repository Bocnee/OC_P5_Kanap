
// call the local storage
let cart = JSON.parse(localStorage.getItem("product"));
// variables for the total quantity & total price
let totalQuantity = 0
let totalPrice = 0
// function if the cart is empty
function emptyCart(products) {
    if (cart === null || cart == 0) {
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
// change the title of the page
    const title = document.querySelector("title");
    title.innerText = `Panier`
// display the products in the cart
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

// find the quantity and price in the DOM
  const tQuantity = document.getElementById("totalQuantity");
  const tPrice = document.getElementById("totalPrice");
// calculation to display total item quantity and total price
  totalQuantity += Number(cartElement.quantity);
  totalPrice += Number(apiElement.price) * Number(cartElement.quantity);
// add them to the DOM 
  tQuantity.innerText = totalQuantity;
  tPrice.innerText = totalPrice;

// function to change the quantity
  function changeQuantity () {
    let inputQuantity = document.getElementsByClassName("itemQuantity");
// loop to find the value for each product
    for (let q = 0; q < inputQuantity.length; q++) {
// when the value is changed ...
      inputQuantity[q].addEventListener("change", (event) => {
        event.preventDefault();
// if the value isn't between 1 and 100
        if (inputQuantity[q].value < 1 || inputQuantity[q].value > 100) {
          window.alert("Merci de choisir une quantité comprise entre 1 et 100.");
          return;
// else, upload the local storage + reload the page
        } else {
          cart[q].quantity = Number(inputQuantity[q].value);
          localStorage.setItem("product", JSON.stringify(cart));
          window.location.reload();
        }
      });
    }
  }
// call the function
  changeQuantity();
// function to delet a product
  function deleteProduct() {
    let inputDelete = document.querySelectorAll(".deleteItem");
// loop to activate each button
    for (let i = 0; i < inputDelete.length; i++) {
      inputDelete[i].addEventListener("click", (event) => {
        let cartColor = cart[i].color;
        let cartId = cart[i].id;
// find all the different products of the selection, and create a new array for them
        cart = cart.filter(find => find.id !== cartId || find.color !== cartColor);
        localStorage.setItem("product", JSON.stringify(cart));
        window.location.reload();
      })
    }
  }
// call the function
  deleteProduct();
}
// for the form
// checks the form entries when they are being written
// for the first name
let firstName = document.getElementById("firstName");
firstName.addEventListener("input", firstNameTrue)
function firstNameTrue() {
  if (/^[A-Za-zÀ-Ùà-ù'-\s]{2,60}$/.test(firstName.value) == false) {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.innerText = `Merci de rentrer un prénom valide.`;
    return false;
  } else {
    firstNameErrorMsg.innerText = ``;
    return true;
  }
}
// for the last name
let lastName = document.getElementById("lastName");
lastName.addEventListener("input", lastNameTrue)
function lastNameTrue() {
  if (/^[A-Za-zÀ-Ùà-ù'-\s]{2,60}$/.test(lastName.value) == false) {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.innerText = `Merci de rentrer un nom valide.`;
    return false;
  } else {
    lastNameErrorMsg.innerText = ``;
    return true;
  }
}
// for the address
let address = document.getElementById("address");
address.addEventListener("input", addressTrue)
function addressTrue() {
  if (/^[A-Za-zÀ-Ùà-ù0-9'-\s]{2,60}$/.test(address.value) == false) {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.innerText = `Merci de rentrer une adresse valide.`;
    return false;
  } else {
    addressErrorMsg.innerText = ``;
    return true;
  }
}
// for the city
let city = document.getElementById("city");
city.addEventListener("input", cityTrue)
function cityTrue() {
  if (/^[A-Za-zÀ-Ùà-ù'-\s]{2,60}$/.test(city.value) == false) {
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.innerText = `Merci de rentrer une ville valide.`
    return false;
  } else {
    cityErrorMsg.innerText = ``
    return true;
  }
}
// for the email
let email = document.getElementById("email");
email.addEventListener("input", emailTrue)
function emailTrue() {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value) == false) {
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    emailErrorMsg.innerText = `Merci de rentrer une adresse mail valide.`
    return false;
  } else {
    emailErrorMsg.innerText = ``
    return true;
  }
}

// listen to the order button
let order = document.getElementById("order");
order.addEventListener("click", (e) => {
// create the contact object
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
  };  
  e.preventDefault();
// if the cart  is empty, create a window alert
  if (cart === null || cart == 0) {
    window.alert("Votre panier est vide")
    return;
// check if the form is okay
  } else if (firstNameTrue()
  && lastNameTrue()
  && addressTrue()
  && cityTrue()
  && emailTrue()) {
// create an array, and then push the cart in it with a loop in the local storage
    let products = [];
    for (element of cart) {
      products.push(element.id);
    }
    fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({contact, products})
    })
    .then ((res) => { 
      if (res.ok) { 
          return res.json(); 
      }
    })
    .then ((data) => {
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
    })
    .catch ((error) => { 
      window.alert("Une erreur s'estproduite, merci de rafraîchir la page.");
  });

// else, if the form isn't complete create a window alert
  } else {
    window.alert("Veuillez vérifier les informations du formulaire.")
  }
})