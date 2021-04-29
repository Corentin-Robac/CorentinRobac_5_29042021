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
    document.getElementById("card-display-shop").innerHTML += '<div class="col-xs-12 col-md-6 col-lg-4 mt-4" ><div class="card shadow"><img class="card-img-top" src="'+camera.imageUrl+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+camera.name+'</h5><p class="card-text">'+camera.description+'</p><p>'+camera.price+' €'+'</p><a href="template_product.html?'+camera._id+'" class="btn btn-primary">Consulter la fiche</a></div></div></div>';
}