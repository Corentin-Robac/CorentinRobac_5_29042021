main();

async function main() {
    displayCardProduct();
}

function displayCardProduct() {
    let cart_products = JSON.parse(localStorage.getItem("panier"));
    if(!cart_products || cart_products.length == 0){
        displayEmptyCart();
    }
    else{
        deleteAndTotalCartProducts(cart_products);
        displayCartProducts(cart_products);
        displayForm();
    }
}

function add_orderId_to_localstorage(order_Id) {
    localStorage.setItem("order", JSON.stringify(order_Id));
}

function displayForm() {
    document.getElementById("template_cameras_card").innerHTML +="<div class='container my-5'> <p class='title'>Veuillez renseigner vos informations personnelles</p><p class='precisions'>Les champs marqués d'un astérisque (*) sont obligatoires.</p><form method='POST' class='col-12'><div class='form-row'><div class='form-group col-12 col-sm-6 col-lg-5'><label for='firstName'>Prénom*</label> <input id='firstName' name='firstName' placeholder='Votre prénom...' type='text' required='required' class='form-control'></div><div class='form-group col-12 col-sm-6 col-lg-5'><label for='lastName'>Nom*</label> <input id='lastName' name='lastName' placeholder='Votre nom...' type='text' class='form-control' required='required'></div></div><div class='form-row'><div class='form-group col-12 col-lg-6'><label for='address'>Adresse*</label> <input id='address' name='address' placeholder='Votre adresse...' type='text' class='form-control' required='required'></div><div class='form-group col-12 col-sm-6 col-lg-4'><label for='city'>Ville*</label> <input id='city' name='city' placeholder='Votre ville...' type='text' class='form-control' required='required'></div></div><div class='form-row'><div class='form-group col-12 col-lg-10'><label for='email'>Email*</label> <input id='email' name='email' placeholder='Votre email...' type='text' class='form-control' required='required'></div> </div><div class='form-group'><a name='submit' type='submit' class='btn btn-primary send_checkout'>Valider la commande</a></div></form></div>";
}

function displayEmptyCart() {
    document.getElementById("template_cameras_card").innerHTML +="<div class='container pl-3 mb-4 mt-5 title'><p>Votre panier est vide !</p><a href='index.html' class='btn btn-primary button'>Retour à la boutique</a></div>";
}

function displayCartProducts(cart_products) {
    for (cart_product of cart_products){
        let price = (cart_product.price/100).toFixed(2);
        document.getElementById("template_cameras_card").innerHTML += '<div class="row shadow my-5"><div class="col-12 col-md-5 col-lg-4 px-0" id="cameraimage"><a href="template_product.html?'+cart_product.id+'"><img class="card-img-top img-fluid" src="'+cart_product.image+'" alt="Image du produit"></a></div><div class="col-8 col-md-4 pl-3 mt-2"><a href="template_product.html?'+cart_product.id+'" id="cameraname">'+cart_product.name+'</a><p class="mt-2" id="cameraprice">'+price+' €</p><p id="cameramodele">Lentille : '+cart_product.modele+'</p><p id="cameraquantity">Quantité : '+cart_product.quantity+'</p></div><div class="col-4 col-md-3 col-lg-4"><div class="centered"><button href="#" id="'+cart_product.id+'&'+cart_product.modele+'" name="button" type="button" class="row btn btn-primary button">Supprimer</button></div></div></div>';
    }
}

function deleteAndTotalCartProducts(cart_products) {
    let totalCartPrice = 0;
    for (camera of cart_products) {
        let quantity = parseFloat(camera.quantity);
        let price = parseFloat(camera.price);
        totalCartPrice += quantity * price;
    }
    document.getElementById("template_cameras_card").innerHTML += "<div class='container my-5'><div class='row'><div class='col-6'><p class='title'>Total du panier : "+(totalCartPrice/100).toFixed(2)+"€</p></div><div class='col-6'><button id='deletecartProducts' class='btn btn-primary'>Vider le panier</button></div></div></div>";
}

let send_checkout = document.querySelector(".send_checkout");
send_checkout.addEventListener("click", async function() {
    let firstname_form = document.querySelector("#firstName").value;
    let lastName_form = document.querySelector("#lastName").value;
    let address_form = document.querySelector("#address").value;
    let city_form = document.querySelector("#city").value;
    let email_form = document.querySelector("#email").value;
    let products = [];
    let cart_products = JSON.parse(localStorage.getItem("panier"));

    for (cart_product of cart_products){
        products.push(cart_product.id);
    }

    let formData = {
        contact: {
            firstName: firstname_form,
            lastName: lastName_form,
            address: address_form,
            city: city_form,
            email: email_form
        },
        products: products
    }

    await fetch('http://localhost:3000/api/cameras/order', {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let order_Id = data.orderId;
        add_orderId_to_localstorage(order_Id);
        window.location.href = "checkout.html";
    })
    .catch(function(error) {
        console.log(error);
    });
});

let deleteAll = document.querySelector("#deletecartProducts");
deleteAll.addEventListener("click", async function() {
    localStorage.removeItem("panier");
    window.location.href= "panier.html";
});


let buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', async function() {
        let cart_products = JSON.parse(localStorage.getItem("panier"));
        let id_product = button.id.split('&');
        //1ere partie de l'id du bouton = id du produit
        let button_id_product = id_product[0];
        //2e partie de l'id du bouton = modele du produit
        let button_modele_product = id_product[1];
        for (i=0; i<cart_products.length; i++) {
            if(cart_products[i].id == button_id_product && cart_products[i].modele == button_modele_product) {
                cart_products.splice(i, 1);
            }
        }
        localStorage.removeItem("panier");
        localStorage.setItem("panier", JSON.stringify(cart_products));
        window.location.href="panier.html";
    });
}