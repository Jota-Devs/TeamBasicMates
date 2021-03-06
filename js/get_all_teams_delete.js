let teams;
let thumbnails;
let exit = document.querySelector('#close');
exit.addEventListener('click', closeCard);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//list of team
const db = firebase.firestore();
document.querySelector('#lc').innerHTML = '';

const listTeamMembers = () => {
    db.doc('Teams/' + id).get().then((doc) => {
        doc.data().teamMembers.forEach(res => {
            res.get().then(x => {
                let element = document.createElement("div");
                document.getElementById('lc').appendChild(element);
                element.dataset.account = x.data().username;
                element.className = "thumbnails";
                //fix
                thumbnails = document.querySelectorAll('.thumbnails');
                thumbnails.forEach(function (thumbnail) {
                    thumbnail.addEventListener('click', openCard);
                });
                if (x.data().status == "enabled") {
                    element.innerHTML += "<img src=" + x.data().photo + " class='images '>";
                } else {
                    element.innerHTML += "<img src=" + x.data().photo + " class='images  " + x.data().status + "'>";
                }
            });
        });
        var imag = doc.data().photo;
        let logo = document.createElement("div");
        document.getElementById('lc').appendChild(logo);;
        
        logo.innerHTML += "<img src=" + imag + " class='logo'>"    
    });
};


/*const populatePage = () => {

   
    arr.forEach(item => {
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
    /*logoImage.on("value", function (snapshot) {
    
        var imag = snapshot.val().photo;
        let logo = document.createElement("div");
        document.getElementById('lc').appendChild(logo);;
    
        logo.innerHTML += "<img src=" + imag + " class='logo'>";
    });
    thumbnails = document.querySelectorAll('.thumbnails');

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener('click', openCard);
    });*/


/*let list = firebase.database().ref('accounts');
const data = firebase.database().ref('accounts/');

list.on("value", function (snapshot) {
    let logoImage = firebase.database().ref('teams/' + id);
    snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        if (data.teams.id == id)
            arr.push(data);
    });

});*/

function openCard(e) {
    const card = document.querySelector('.tarjeta');
    const email = e.target.parentElement.dataset.account;
    card.classList.add('activa');
    db.collection("Profiles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().username == email) {
                user = doc.data();
                addContentToCard(user);
            }
        });
    });


   /* data.orderByChild('username').equalTo(email).on('value', snapshot => {
        snapshot.forEach(function (childSnapshot) {
            var value = childSnapshot.val();
            addContentToCard(value);
        });
    });*/
};

function closeCard(e) {
    let card = document.querySelector('.tarjeta');
    let contenido = document.querySelector("#tarjeta-contenido");
    card.classList.remove('activa');
    contenido.innerHTML = '';
};

function addContentToCard(user) {
    let contenido = document.querySelector("#tarjeta-contenido");
    contenido.innerHTML = ' <div class="card"> <img src=' + user.photo + ' class="cardPhoto" > <div>' + user.username + '</div> </div>';
    let social = document.querySelector("#social");
    social.innerHTML = `<ul>
    <li><a href="http://facebook.com/"><i class="fa fa-facebook"></i></a></li>
    <li><a href="http://linkedin.com/"><i class="fa fa-linkedin"></i></a></li>
    <li><a href="http://twitter.com/"><i class="fa fa-twitter"></i></a></li>
    </ul>`;
};