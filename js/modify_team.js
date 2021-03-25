const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const db = firebase.firestore();

const getTeam = () => {
    db.collection("Teams").doc(id).get().then((querySnapshot) => {
        let doc = querySnapshot.data();
        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let image = document.querySelector('#image');
        image.innerHTML = '<img src="' + doc.photo + '" >'
        name.value = doc.name;
        description.value = doc.description;
        doc.teamMembers.forEach(element => {
            element.get().then(res => {
                createList(res);
            });
        });
    });
};
getTeam();
const ul = document.querySelector("#list");
ul.className = 'menu-list';

const createList = (element) => {
    console.log(element.id);
    let id = element.id;
    let li = document.createElement('li');
    li.innerHTML = element.data().fullName;
    ul.appendChild(li);
};

function removeThis(id) {
    console.log(id);
}