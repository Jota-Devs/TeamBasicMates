let teams;
let thumbnails;
let exit = document.querySelector('#close');
exit.addEventListener('click', closeCard);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//list of team
let list = firebase.database().ref('accounts');
let arr = [];
const data = firebase.database().ref('accounts/');

list.on("value", function (snapshot) {
    let logoImage = firebase.database().ref('teams/' + id);
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
    logoImage.on("value", function (snapshot) {

        var imag = snapshot.val().photo;
        let logo = document.createElement("div");
        document.getElementById('lc').appendChild(logo);;

        logo.innerHTML += "<img src=" + imag + " class='logo'>";
    });
    thumbnails = document.querySelectorAll('.thumbnails');

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener('click', openCard);
    });
});

function openCard(e) {
    const card = document.querySelector('.tarjeta');
    const email = e.target.parentElement.dataset.account;
    card.classList.add('activa');

    data.orderByChild('username').equalTo(email).on('value', snapshot => {
        snapshot.forEach(function (childSnapshot) {
            var value = childSnapshot.val();
            addContentToCard(value);
        });
    });
}

function closeCard(e) {
    let card = document.querySelector('.tarjeta');
    let contenido = document.querySelector("#tarjeta-contenido");
    card.classList.remove('activa');
    contenido.innerHTML = '';
}

function addContentToCard(user) {
    console.log(user);
    let contenido = document.querySelector("#tarjeta-contenido");
    contenido.innerHTML = ' <div class="card"> <img src=' + user.photo + ' class="cardPhoto" > <div>' + user.username + '</div> </div>';
    let social = document.querySelector("#social");
    social.innerHTML = `<ul>
    <li><a href="http://facebook.com/"><i class="fa fa-facebook"></i></a></li>
    <li><a href="http://linkedin.com/"><i class="fa fa-linkedin"></i></a></li>
    <li><a href="http://twitter.com/"><i class="fa fa-twitter"></i></a></li>
    </ul>`;
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