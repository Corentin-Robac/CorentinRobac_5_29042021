main();

async function main() {
    let camera_localStorage = JSON.parse(localStorage.getItem("cameras"));
    const id_product = await getId();
    let objetCamera;
    objetCamera = getCamera(camera_localStorage,id_product);
    displayCamera(objetCamera);
}

function getCamera(camera_localStorage,id_product) {
    for (camera of camera_localStorage) {
        if(camera.id == id_product){
            objetCamera = {
                id: camera.id,
                name: camera.name,
                price: camera.price,
                image: camera.image,
                modeles: camera.modeles,
                description: camera.description
            };
        }
    }
    return objetCamera;
}

function displayCamera(objetCamera) {
    document.getElementById("cameraimage").innerHTML += '<img class="card-img-top img-fluid" src="'+objetCamera.image+'" alt="Image du produit">';
    document.getElementById("cameraname").innerHTML += objetCamera.name;
    let price = (objetCamera.price/100).toFixed(2);
    document.getElementById("cameraprice").innerHTML += price+'€';
    document.getElementById("cameradescription").innerHTML += objetCamera.description;
    modeles = objetCamera.modeles;
    for (modele of modeles){
        document.getElementById("inlineFormCustomSelect").innerHTML += '<option value="'+modele+'">'+modele+'</option>';
    }
}

function getId(){
    const url_id_product = window.location.search; //Récupère l'id avec "?"
    const id_product = url_id_product.slice(1); //Supprime "?"
    return id_product; //Retourne l'id
}


/*----------Ajouter au panier----------*/
function setLocalStorage(infosCamera) {
    let camera_localStorage = JSON.parse(localStorage.getItem("panier"));
    if(camera_localStorage){
        add_to_localStorage(infosCamera,camera_localStorage);
    }
    else{
        camera_localStorage = [];
        add_to_localStorage(infosCamera,camera_localStorage);
    }
}

function add_to_localStorage(infosCamera,camera_localStorage){
    let flag = 0;
    //si id et modele de infosCamera = id et modele d'un des objets de camera_localStorage alors quantité de cet objet += quantité infosCamera
    for (camera_in_local of camera_localStorage){
        if(camera_in_local.id == infosCamera.id && camera_in_local.modele == infosCamera.modele){
            let quantity_local = parseFloat(camera_in_local.quantity);
            let quantity_choosed = parseFloat(infosCamera.quantity);
            quantity_local += quantity_choosed;
            camera_in_local.quantity = quantity_local;
            flag = 1;
        }
    }
    if(flag == 0){
        camera_localStorage.push(infosCamera);
    }
    localStorage.setItem("panier", JSON.stringify(camera_localStorage));
}

let add_to_cart = document.querySelector("#button");
add_to_cart.addEventListener("click", async function() {
    modele_selected = document.querySelector("#inlineFormCustomSelect").value;
    quantity_selected = document.querySelector("#quantity").value;
    let camera_localStorage = JSON.parse(localStorage.getItem("cameras"));
    const id_product = await getId();
    const camera = await getCamera(camera_localStorage,id_product);
    infosCamera = {
        id: camera.id,
        name: camera.name,
        price: camera.price,
        image: camera.image,
        description: camera.description,
        modele: modele_selected,
        quantity: quantity_selected
    };
    setLocalStorage(infosCamera);
});
/*----------FIN Ajouter au panier----------*/


