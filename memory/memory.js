
var imgs   = [ "images/earth.jpg", "images/mars.jpg", "images/titan.jpg",
               "images/venus.jpg", "images/ceres.jpg", "images/jupiter.jpg",
               "images/enceladus.jpg", "images/europa.jpg", "images/grand_tour.jpg",
               "images/superearth.jpg", "images/trappist.jpg", "images/51pegasib.jpg",
               "images/kepler16b.jpg", "images/kepler186f.jpg", "images/55-cancri-e.jpg",
               "images/nightlife.jpg" ];
               
var placeholder = "images/placeholder.jpg";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function shuffle(array) {
    // Durstenfeld' shuffle algorithm
    console.log('shuffle')
    for (var i = 0; i < array.length - 2; i+=1) {
        var j = getRandomInt(i, array.length);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Contiendra la liste des images utilisés dans la page.
var imageList;

function generateImageList(numberOfPair, trumpCard) {
    shuffle(imgs);
    imageList = []
    for (var i = 0; i < numberOfPair; i+=1) {
        imageList.push(imgs[i]);
        imageList.push(imgs[i]);
    }

    shuffle(imageList);
}

function init() {
    generateImageList(10, true);

    var elems = document.getElementsByTagName("img");
    for (var i = 0; i < 21; i++) {
        
        
        elems[i].src = placeholder;
        // On utilise un attribut pour stocker le numéro de l'image à utiliser.
        elems[i].setAttribute("data-elemId", i);
        
        elems[i].onclick = function() {
            var elemId = this.getAttribute("data-elemId");
            this.src = imageList[elemId];
        }
    }
}


