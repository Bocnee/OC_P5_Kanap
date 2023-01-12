// extract the order id from the link
let url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
// put the orderId in the DOM
let spanOrderId = document.getElementById("orderId");
spanOrderId.innerText = `${orderId}`
// clear the local storage
localStorage.clear();