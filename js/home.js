//let userCookie = document.cookie.split(';');
//let emailCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const db = firebase.firestore();

window.onload =  (event) => {
    console.log('DOM fully loaded and parsed');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          
          // ...
        } else {
          // User is signed out
          // ...
          window.location = '/index.html';
        }
      });
};
//firebase.auth().signOut()

let user;
const getUser = () => {
    db.collection("Profiles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().username == firebase.auth().currentUser.email) {
                user = doc.data();
                document.getElementById("welcome").innerHTML = "Welcome, " + user.fullName + " ";
                getTeamsIOwn(user);
                getTeamsIPartOf(user);
            }; 
        });
    });
};
getUser();

const getTeamsIOwn = (user) => {
    var element = document.createElement("div");
    document.getElementById('thumbnails').appendChild(element);
    element.className='columns'

    db.collection("Teams").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().owner.get().then(res => {
                if (res.data().username == user.username) {
                    element.innerHTML += "<a href ='/modify_team.html?id=" + doc.id + " ' ><img src=" + doc.data().photo + " class='images column'></a>";
                }
            });
        });
    });
};

const getTeamsIPartOf = (user) =>{
    var element = document.createElement("div");
        document.getElementById('thumbnails2').appendChild(element);
        element.className='columns'
        user.teams.forEach((doc) => {
            doc.get().then(res =>{
                    element.innerHTML += "<a href ='/get_all_teams.html?id=" + res.id + " ' ><img src=" + res.data().photo + " class='images column'></a>"; 
            })
        });

};

const createTeam = () =>{
    window.location = '/create.html';
};

const logout = () =>{
    firebase.auth().signOut();
};