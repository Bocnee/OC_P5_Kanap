// extract the id from the link
let str = window.location.href;
let url = new URL(str);
const productId = url.searchParams.get("id");
// use the api
fetch ("http://localhost:3000/api/products/" + productId)
.then ((res) => {
    if (res.ok) {
// return json if it works
        return res.json(),
    }
})
// call the function
.then ((data) => {
    displayProduct(data);
})
// if error
.catch((error) => {
    windows.alert("Une erreur s'est produite, merci de recharger la page.");
});