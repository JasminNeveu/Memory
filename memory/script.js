
var imgs   = [ "images/earth.jpg", "images/mars.jpg", "images/titan.jpg",
               "images/venus.jpg", "images/ceres.jpg", "images/jupiter.jpg",
               "images/enceladus.jpg", "images/europa.jpg", "images/grand_tour.jpg",
               "images/superearth.jpg", "images/trappist.jpg", "images/51pegasib.jpg",
               "images/kepler16b.jpg", "images/kepler186f.jpg", "images/55-cancri-e.jpg",
               "images/nightlife.jpg" ];
               
var placeholder = "images/placeholder.jpg";
var elems = document.getElementsByClassName("available");




function istrumpchecked(){
    var check_trump = document.querySelector('#check_trump');
    var card_trump = document.querySelector("#card_trump")
    if(check_trump.checked === true){
        card_trump.classList.remove('hide')
        return true
        
    }else{
        card_trump.classList.add('hide')
        return false
    }
    
}

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
var image_list;


function generateImageList(numberOfPair,card) {
    shuffle(imgs);
    image_list = []
    for (var i = 0; i < numberOfPair ; i+=1) {
        image_list.push(imgs[i]);
        image_list.push(imgs[i]);
    }
    
    if(istrumpchecked() == true){
        image_list.push(imgs[i+1])
    }    
    shuffle(image_list);
}

// contiendra la source de l'élément cliqué ---> permet comparaison des cartes
var elemcompare_list = [];

// stcok le this des elems cliqué, utilisé pour remettre la source placeholder quand cartes pas paire
var elemCollection_list = [];

//conteur qui s'incrémente quand paire trouvée, quand atteint 10 alors fin partie
var partie_fin = 0
var tour_joueur1 = true
var message_fin;
var score_joueur1 = 0
var score_joueur2 = 0

function init() {
    
    
    generateImageList(10)

    stopTheCount()

    choix_blitz()

    deuxjouer()

    score_joueur1 = 0
    score_joueur2 = 0
    score = 0
    min_format = 0
    sec_format = 0
    document.getElementById("nombre_coups").innerHTML =  score;
    document.querySelector('#score_1').innerHTML = 'Score joueur 1: '+ score_joueur1
    document.querySelector('#score_2').innerHTML = 'Score joueur 2: '+ score_joueur2

    
    // Remet toutes les cartes face cachée
    for(var carte of elems){
        carte.src = placeholder
        carte.style.border = 'none'
    }
    
    for (var i = 0; i < 21; i++) {
         
        elems[i].src = placeholder;
        // On utilise un attribut pour stocker le numéro de l'image à utiliser.
        elems[i].setAttribute("data-elemId", i);
        
        if(deuxjouer()){
            elems[i].onmouseover = function(){
                if(tour_joueur1 === true){
                    this.style.border='solid 3px #48c4e0'
                }else{
                    this.style.border='solid 3px #e04857'
                }
                
        
            }
    
        }else{
            
            elems[i].onmouseover = function(){
                console.log('Ici hover')
                this.style.border='solid 3px grey'
            }
            
        }

        elems[i].onmouseout = function(){
            this.style.border = 'none'
        }
        
        
        elems[i].onclick = function() {


            var elemId = this.getAttribute("data-elemId");
            this.src = image_list[elemId];

            elemCollection_list.push(this)
            elemcompare_list.push(image_list[elemId])

            

            if (elemcompare_list.length === 2){
                moveCounter()
                
                if(elemcompare_list[0] === elemcompare_list[1]){
                    paire()
                }else{
                    
                    setTimeout(paspaire, 2000); //setTimeout permet d'attendre 1000ms avant d'executer unpaire

                    

                }
            
            }

            if(partie_fin === 10){
                if(deuxjouer()){
                    if(score_joueur1 > score_joueur2){
                        message_fin = setTimeout(function(){ alert('Le Joueur 1 a gagné, son score est de '+ score_joueur1)}, 1000);
                    }else if(score_joueur1 < score_joueur2){
                        message_fin = setTimeout(function(){alert('Le Joueur 2 a gagné, son score est de  '+score_joueur2)},1000)
                    }else{
                        message_fin = setTimeout(function(){alert('Egalité')})
                    }
                }else{
                    message_fin = setTimeout(function(){ alert('Vous avez gagné en '+ score +' coups' )}, 1000);
                }
                
                partie_fin = 0
                score_joueur1 = 0
                score_joueur2 = 0
            }
        }

        
    }
}

function paire(){
    console.log('paire')


    if (deuxjouer()){
        console.log('ici')
        if(tour_joueur1 === true){
            console.log('paire 1')
            elemCollection_list[0].style.border = '2px #48c4e0 solid'
            elemCollection_list[1].style.border = '2px #48c4e0 solid'
            score_joueur1++
            document.querySelector('#score_1').innerHTML = 'Score joueur 1: '+ score_joueur1
        }else{
            console.log('paire 2')
            elemCollection_list[0].style.border = '2px #e04857 solid'
            elemCollection_list[1].style.border = '2px #e04857 solid'
            score_joueur2++
            document.querySelector('#score_2').innerHTML = 'Score joueur 2: '+ score_joueur2
        }
        
    }else{
        if (check_blitz1m10.checked === true){
            temps = temps + 10
        }
        elemCollection_list[0].style.border = '2px #48c4e0 solid'
        elemCollection_list[1].style.border = '2px #48c4e0 solid'

    }

    partie_fin ++

    elemCollection_list = [];
    elemcompare_list = [];
}

function paspaire(){
    console.log('pas paire')

    console.log(elemcompare_list[0])

    // remet placeholder comme source pour les deux cartes (retourne les cartes)
    for(var item of elemCollection_list){
        item.src = placeholder
    }


    // réinitialise les deux listes sinon elemcompare_list.length > 2 donc condition pour comparaison impossible
    elemCollection_list = [];
    elemcompare_list = [];
    if(tour_joueur1 === true){
        tour_joueur1 = false
    }else{
        tour_joueur1 = true
    }
}

var timeout;
function clock() {
    temps = temps -1;
    document.getElementById("nombre_temps").innerHTML =  'Temps : '+temps+ '  sec';
    if (temps == 0) {
        alert("Fin du temps disponible. Perdu.");
    } else {
        timeout = setTimeout(clock, 1000);
    }
    
    
}

function stopTheCount() {
    // Permet d'arrêter l'appel à la fonction clock().
    clearTimeout(timeout);
}

function moveCounter(){
    score ++
    document.getElementById("nombre_coups").innerHTML =  score;
    // acutalise counter
}

var min_format = 0
var sec_format = 0
function tempsreflexion(){
    

    sec_format ++
    if (sec_format === 60){
        sec_format = 0
        min_format = min_format + 1
    }
    document.getElementById("nombre_temps").innerHTML =  'Temps de reflexion: '+min_format+ '  min '+sec_format+ '  sec';

    timeout = setTimeout(tempsreflexion, 1000);
}

function choix_blitz(){
    var check_blitz = document.querySelector('#check_blitz')
    var check_blitz1m10 = document.querySelector('#check_blitz1m10')


    if(check_blitz.checked === true){
        check_blitz1m10.checked = false;
        clock(temps = 200)
    }else if (check_blitz1m10.checked ===  true){
        clock(temps = 100)
    }else if(check_blitz.checked === false && check_blitz1m10.checked === false){
        tempsreflexion()
    }

}



function deuxjouer(){
    var check_twoplayer = document.querySelector('#check_twoplayer')
    var score_1 = document.getElementById('score_1')
    var score_2 = document.getElementById('score_2')

    var label_coups = document.getElementById('coups')
    var label_temps = document.getElementById('nombre_temps')

    var label_blitz = document.getElementById('label_blitz')
    var label_blitz1m10 = document.getElementById('label_blitz1m10')
    


   if(check_twoplayer.checked === true){
       score_1.style.display='block'
       score_2.style.display='block'

       label_coups.style.display='none'
       label_temps.style.display = 'none'

       check_blitz.style.display = 'none'
       check_blitz1m10.style.display = 'none'

       label_blitz.style.display='none'
       label_blitz1m10.style.display='none'

       return true

   }else{
       score_1.style.display='none'
       score_2.style.display = 'none'

       label_coups.style.display='block'
       label_temps.style.display = 'block'

       check_blitz.style.display = 'block'
       check_blitz1m10.style.display = 'block'

       label_blitz.style.display = 'block'
       label_blitz1m10.style.display = 'block'


       return false

   }
   
}

