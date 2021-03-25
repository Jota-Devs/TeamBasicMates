const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const db = firebase.firestore();

let team;

const getTeam = () => {
    db.collection("Teams").doc(id).get().then((querySnapshot) => {
        team = querySnapshot;
        let doc = querySnapshot.data();
        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let image = document.querySelector('#image');
        image.innerHTML = '<img src="' + doc.photo + ' type="file"">'
        image.addEventListener('click',changePhoto);
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
    let id = element.id;
    let li = document.createElement('li');
    li.innerHTML = element.data().fullName;
    li.addEventListener('click',function(){removeThis(id)});
    ul.appendChild(li);
};

function removeThis(id) {
    let members = team.data().teamMembers;
    console.log(members);
    members.forEach(item => console.log(item.id));
    members = members.filter(function(item) {
        return item.id !== id
    });
    console.log(members);
    db.collection("Teams").doc(team.id).update({
        teamMembers: members
    });
    
};



const changePhoto = () =>{
    console.log('here')
    //todo
};


const editName = () =>{
    let name = document.querySelector("#name").value;
    db.collection("Teams").doc(team.id).update({
        name: name
    });
};

const editDescription = () =>{
    let description = document.querySelector("#description").value;
    db.collection("Teams").doc(team.id).update({
        description: description
    });
};