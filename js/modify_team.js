let userCookie = document.cookie.split(';');
let emailCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const db = firebase.firestore();
const storageRef = firebase.storage().ref();

let team;
const ul = document.querySelector("#list");
ul.className = 'menu-list';

const getTeam = () => {
    db.collection("Teams").doc(id).get().then((querySnapshot) => {
        team = querySnapshot;
        let doc = querySnapshot.data();
        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let image = document.querySelector('#label');
        //image.innerHTML = '<img src="' + doc.photo + 'for="photo">'
        image.innerHTML = `<label for="photo">
        <img src="${doc.photo}"
            for="photo">
        <input type="file" style="display:none;" id="photo" onchange="uploadPhoto()">
    </label>`;
        //image.addEventListener('click',changePhoto);
        name.value = doc.name;
        description.value = doc.description;
        ul.innerHTML ='';
        doc.teamMembers.forEach(element => {
            element.get().then(res => {
                createList(res);
            });
        });
    });
};

getTeam();
document.getElementById("welcome").innerHTML = "Welcome, " + emailCookie + " ";



const createList = (element) => {
    var id = element.id;
    let li = document.createElement('li');
    let deleteP = `<button class="delete is-small" ></button>`;
    li.innerHTML = element.data().fullName + deleteP;
    li.addEventListener('click', function () {
        removeThis(id)
    });
    ul.appendChild(li);
};

function removeThis(id) {

    db.collection("Teams").doc(team.id).update({
        teamMembers: firebase.firestore.FieldValue.arrayRemove(db.doc("Profiles/" + id))
    });
    db.collection("Profiles").doc(id).update({
        teams: firebase.firestore.FieldValue.arrayRemove(db.doc("Teams/" + team.id))
    })
    getTeam();
};

const editName = () => {
    let name = document.querySelector("#name").value;
    db.collection("Teams").doc(team.id).update({
        name: name
    });
};

const editDescription = () => {
    let description = document.querySelector("#description").value;
    db.collection("Teams").doc(team.id).update({
        description: description
    });
};

const uploadPhoto = () => {
    let photo = document.querySelector('#photo').files[0];
    uploadImage(photo).then((snapshot) => {
        showImage(photo);
    });
};

const uploadImage = async (file) => {
    let imagesRef = storageRef.child('images/' + file.name);
    let promise = new Promise((resolve, reject) => {
        imagesRef.put(file).then((snapshot) => {
            resolve(snapshot);
        }).catch((e) => {
            reject(e)
        });
    });
    return await (promise);
};

const showImage = async (file) => {
    storageRef.child('images/' + file.name).getDownloadURL()
        .then((url) => {
            update(url);
        });
};
const update = (url) => {
    db.collection("Teams").doc(team.id).update({
            photo: url,
        })
        .then((docRef) => {
            getTeam();
        })
        .catch((error) => {
            alert("Error creating team: ", error);
        });
};