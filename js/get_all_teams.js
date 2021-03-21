const firebaseConfig = {
    apiKey: "AIzaSyDJAMhgO6h-3pFQhu76vdGIEvDdM-sJq7Y",
    authDomain: "teammatejd.firebaseapp.com",
    databaseURL: "https://teammatejd-default-rtdb.firebaseio.com/",
    projectId: "teammatejd",
    storageBucket: "teammatejd.appspot.com",
    messagingSenderId: "121773687334",
    appId: "1:121773687334:web:02d6512e0ab9cb7c2f5ce7"
};

firebase.initializeApp(firebaseConfig);
/////////////////////////
let tarjeta;
let exit = document.querySelector('#close');
exit.addEventListener('click', closeCard);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//list of team
let list = firebase.database().ref('accounts');
let arr = [];
list.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        if (data.teams.id == id)
            arr.push(data);
    });
    document.getElementById('lc').innerHTML = '';

    arr.forEach(function (item) {
        let element = document.createElement("div");
        document.getElementById('lc').appendChild(element);
        
        element.dataset.account = item.username;
        element.className = "thumbnails";
        if (item.status == "enabled") {
            element.innerHTML += "<img src=" + item.photo + " class='images '>";
        } else {
            element.innerHTML += "<img src=" + item.photo + " class='images  " + item.status + "'>";
        }
    });

    let logoImage = firebase.database().ref('teams/' + id);
    logoImage.on("value", function (snapshot) {

        var imag = snapshot.val().photo;
        let logo = document.createElement("div");
        document.getElementById('lc').appendChild(logo);;

        logo.innerHTML += "<img src=" + imag + " class='logo'>";
    });
    tarjeta = document.querySelector('.thumbnails');
    tarjeta.addEventListener('click',openCard);

});

function openCard(e){
    let card = document.querySelector('.tarjeta');
    card.classList.add('activa');
   
}

function closeCard(e){
    let card = document.querySelector('.tarjeta');
    card.classList.remove('activa');
}

/* to fix this all the acc
function listOfData() {
    
    let list = firebase.database().ref('teams');
    let arr = [];
    list.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let data = childSnapshot.val();
            arr.push(data);
        });
        
        document.getElementById('lc').innerHTML='';
        arr.forEach(function (item) {
            let element = document.createElement("div");
            document.getElementById('lc').appendChild(element);;

            element.innerHTML += "<img src=" + item.photo + " class='images'>";
        });
        arr ='';
        let logo = document.createElement("div");
        document.getElementById('lc').appendChild(logo);;
        var link = "https://firebasestorage.googleapis.com/v0/b/teammatejd.appspot.com/o/images%2Fhumana.png?alt=media&token=8c370835-5f67-4c1c-b419-a2f0fd9a5981";
        logo.innerHTML += "<img src=" + link + " class='logo'>";
    }); 
}*/