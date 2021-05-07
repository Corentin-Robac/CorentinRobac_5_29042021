main();

async function main() {
    displayCardProduct();
}

function displayCardProduct() {
    let cart_products = JSON.parse(localStorage.getItem("panier"));
    for (cart_product of cart_products){
        let price = (cart_product.price/100).toFixed(2);
        document.getElementById("template_cameras_card").innerHTML += '<div class="row shadow my-5"><div class="col-12 col-md-5 col-lg-4 px-0" id="cameraimage"><img class="card-img-top img-fluid" src="'+cart_product.image+'" alt="Image du produit"></div><div class="col-8 col-md-4 pl-3 mt-2"><p id="cameraname">'+cart_product.name+'</p><p id="cameraprice">'+price+' €</p><p id="cameramodele">Lentille : '+cart_product.modele+'</p><p id="cameraquantity">Quantité : '+cart_product.quantity+'</p></div><div class="col-4 col-md-3 col-lg-4"><div class="centered"><button id="'+cart_product.id+'" name="button" type="button" class="row btn btn-primary button">Supprimer</button></div></div></div>';
    }
}