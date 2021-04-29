main();

async function main() {
    const cameras = await getCameras();
    for (camera of cameras) {
        displayCamera(camera);
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
    let price = (camera.price/100).toFixed(2);
    document.getElementById("card-display-shop").innerHTML += '<a href="template_product.html?'+camera._id+'"<div class="col-xs-12 col-md-6 col-lg-4 mt-4 card-camera" ><div class="card shadow"><img class="card-img-top" src="'+camera.imageUrl+'" alt="Card image cap"><div class="card-body"><p class="card-title" id="cameraname">'+camera.name+'</p><p class="card-text">'+camera.description+'</p><p id="cameraprice">'+price+' €'+'</p></div></div></div></a>';

}