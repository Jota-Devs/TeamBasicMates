let teams;
let thumbnails;
let exit = document.querySelector('#close');
exit.addEventListener('click', closeCard);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//list of team
const db = firebase.firestore();
let membersList = []
let imag;
const listTeamMembers = () => {
    db.doc('Teams/' + id).get().then((doc) => {
        doc.data().teamMembers.forEach(res => {
            res.get().then(x => {
                membersList.push(x.data())
            });
        });
        imag = doc.data().photo;
    });
    console.log(membersList);
    calculateImageSize();
};

listTeamMembers();
setTimeout(() => {
    calculateImageSize();
}, 2500);
setTimeout(() => {
    populateLogo();
}, 2500);



function getDivisibles() {
    let imgQty = membersList.length;
    let divisible = [];

    // Busco los numeros divisibles de la cantidad de imagenes
    for (var i = 1; i <= imgQty; i++) {
        if (imgQty % i == 0) {
            divisible.push(i);
        }
    }
    return divisible;
}

function checkPrimes() {

    let imgQty = membersList.length;
    let divisible = getDivisibles();

    if (divisible.length == 2 && imgQty > 3) {
        // Es numero primo
        membersList.push(membersList[0])
    }

    return getDivisibles();
}


function calculateImageSize() {
    let x = 1;
    let y = 1;
    let imgQty = membersList.length;
    let divisible = checkPrimes();
    document.getElementById('lc').innerHTML = ''; //borrar


    let medio = divisible[Math.round((divisible.length - 1) / 2)];
    x = medio
    y = imgQty / medio
    let screenWidth = document.querySelector('#lc').offsetWidth;
    let screenHeight = window.innerHeight - document.querySelector('.navbar-brand').offsetHeight;
    if (screenWidth >= screenHeight) {
        columns = Math.max(x, y);
        rows = Math.min(x, y);
        imageWidth = (screenWidth / columns);
        imageHeight = (screenHeight / rows);

        console.log('img width: ', imageWidth, 'img height: ',
            imageHeight, 'columns: ', columns, 'rows: ', rows);
    } else {
        columns = Math.min(x, y);
        rows = Math.max(x, y);
        imageWidth = (screenWidth / columns);
        imageHeight = (screenHeight / rows);

        console.log('img width: ', imageWidth, 'img height: ',
            imageHeight, 'columns: ', columns, 'rows: ', rows);
    }
    membersList.forEach(item => {
        populate(item, Math.floor(imageWidth), Math.floor(imageHeight));
    });

}

function populateLogo() {
    let logo = document.createElement("div");
    document.getElementById('lc').appendChild(logo);;
    logo.innerHTML += "<img src=" + imag + " class='logo'>"
}

function populate(x, imageWidth, imageHeight) {
    let element = document.createElement("div");
    document.getElementById('lc').appendChild(element);
    element.dataset.account = x.username;
    element.className = "thumbnails";
    console.log(imageHeight, imageWidth)
    //fix
    thumbnails = document.querySelectorAll('.thumbnails');
    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener('click', openCard);
    });
    if (x.status == "enabled") {
        element.innerHTML += "<img src=" + x.photo + " class='images '> ";
        element.style = "width:" + imageWidth + 'px; height:' + imageHeight + 'px;'
    } else {
        element.innerHTML += "<img src=" + x.photo + " class='images  " + x.status + "'>";
        element.style = "width:" + imageWidth + 'px; height:' + imageHeight + 'px;'
    }
}
window.addEventListener('resize', calculateImageSize, false);
window.addEventListener('resize', populateLogo, false);

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
}
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