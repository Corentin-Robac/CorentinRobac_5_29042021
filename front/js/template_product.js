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
    document.getElementById("cameraimage").innerHTML += '<img class="card-img-top img-fluid" src="'+camera.imageUrl+'" alt="Image du produit">';
    document.getElementById("cameraname").innerHTML += camera.name;
    let price = (camera.price/100).toFixed(2);
    document.getElementById("cameraprice").innerHTML += price+'€';
    document.getElementById("cameradescription").innerHTML += camera.description;

    modeles = camera.lenses;
    //console.log(modeles[0]);
    for (modele of modeles){
        document.getElementById("inlineFormCustomSelect").innerHTML += '<option value="'+modele+'">'+modele+'</option>';
    }
}

function getId(){
    const url_id_product = window.location.search; //Récupère l'id avec "?"
    const id_product = url_id_product.slice(1); //Supprime "?"
    return id_product; //Retourne l'id
}