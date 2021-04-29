main();

async function main() {
    const cameras = await getCameras();
    const id_product = await getId();
    for (camera of cameras) {
        if(camera._id == id_product){
        displayCamera(camera);
        }
    }
}

function getCameras() {
    return fetch("http://localhost:3000/api/cameras")
    .then(function(resultBody) {
        return resultBody.json();
    })
    .catch(function(error) {
        alert(error);
    })
}

function displayCamera(camera) {
    document.getElementById("display_product_template").innerHTML += '<div class="col-12 col-md-6"><img class="p-3 img-fluid" src="'+camera.imageUrl+'"></div><div class="col-6"><p class="row">'+camera.name+'</p><p class="row">'+camera.price+' €'+'</p><p class="row">'+camera.description+'</p><form><div class="form-row align-items-center"><div class="col-auto my-1"><label for="inlineFormCustomSelect">Modèle</label><select id="inlineFormCustomSelect"><option selected>Choix</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></div></div><div class="row"><label for="quantity">Quantité: </label><input id="quantity" name="quantity" type="number" value="1" min="1" placeholder="1" step="1"></div><button type="button" class="add-to-cart row btn btn-primary" data-id="" data-name="" data-price="" data-quantity="" data-modele="" data-url="">Ajouter au panier</button></form></div>';
}

function getId(){
    const url_id_product = window.location.search; //Récupère l'id avec "?"
    const id_product = url_id_product.slice(1); //Supprime "?"
    return id_product; //Retourne l'id
}