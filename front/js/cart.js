// call the api
fetch ("http://localhost:3000/api/products/")
.then ((res) => {
    if (res.ok) {
        return res.json();
    }
})
.then ((data) => {
    emptyCart(data);
})
.catch((error) => {
    window.alert("Une erreur s'est produite, merci de recharger la page.");
});
// call the local storage
var cart = JSON.parse(localStorage.getItem("product"));

// function if the cart is empty
function emptyCart(products) {
    if (cart === null) {
        var emptyCart = document.querySelector("#cart__items");
        emptyCart.innerHTML += `<h2 style="text-align:center;">Aucun article à afficher dans le panier.<h2>`;
        return;
    }
};


