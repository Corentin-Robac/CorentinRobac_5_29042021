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
    for (modele of modeles){
        document.getElementById("inlineFormCustomSelect").innerHTML += '<option value="'+modele+'">'+modele+'</option>';
    }
}

function getId(){
    const url_id_product = window.location.search; //Récupère l'id avec "?"
    const id_product = url_id_product.slice(1); //Supprime "?"
    return id_product; //Retourne l'id
}

function setLocalStorage(infosCamera) {
    let camera_localStorage = JSON.parse(localStorage.getItem("camera"));
    if(camera_localStorage){
        add_to_localStorage(infosCamera,camera_localStorage);
    }
    else{
        camera_localStorage = [];
        add_to_localStorage(infosCamera,camera_localStorage);
    }
}

function add_to_localStorage(infosCamera,camera_localStorage){
    camera_localStorage.push(infosCamera);
    localStorage.setItem("camera", JSON.stringify(camera_localStorage));
}

let add_to_cart = document.querySelector("#button");
add_to_cart.addEventListener("click", async function() {
    modele_selected = document.querySelector("#inlineFormCustomSelect").value;
    quantity_selected = document.querySelector("#quantity").value;
    const cameras = await getCameras();
    const id_product = await getId();
    for (camera of cameras) {
        if(camera._id == id_product){
            infosCamera = {
                id: camera._id,
                name: camera.name,
                price: camera.price,
                image: camera.imageUrl,
                description: camera.description,
                modele: modele_selected,
                quantity: quantity_selected
            };
        }
    }
    setLocalStorage(infosCamera);
});

