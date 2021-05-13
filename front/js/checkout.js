main();

function main() {
    
    let orderId = JSON.parse(localStorage.getItem("order"));
    if(!orderId){
        window.location.href = "panier.html";
    }
    else{
        displayOrder(orderId);
        deleteCart();
    }
}

function displayOrder(orderId) {
    let totalPrice = (getTotalPrice()/100).toFixed(2);
    if(orderId){
        document.getElementById("id_order").innerHTML += "<h1>Merci d'avoir passer commande sur Orinoco !</h1><br><p>Votre numéro de commande est le <span id='cameraname'>"+orderId+"</span></p>";
        document.getElementById("total").innerHTML += "<p>Total de la commande : <span id='cameraname'>"+totalPrice+"€</span></p>";
        document.getElementById("buton_to_cart").innerHTML += "<a href='index.html' class='btn btn-primary button'>Retour à la boutique</a>";
    }
    localStorage.removeItem("order");
}

function getTotalPrice() {
    let panier = JSON.parse(localStorage.getItem("panier"));
    let totalPanier = 0;
    for (camera of panier) {
        let quantity = parseFloat(camera.quantity);
        let price = parseFloat(camera.price);
        totalPanier += quantity * price;
    }
    return totalPanier;
}

function deleteCart() {
    localStorage.removeItem("panier");
}