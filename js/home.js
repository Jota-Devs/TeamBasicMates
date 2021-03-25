let userCookie = document.cookie.split(';');
let emailCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const db = firebase.firestore();

let user;
const getUser = () => {
    db.collection("Profiles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().username == emailCookie) {
                user = doc.data();
                document.getElementById("welcome").innerHTML = "Welcome, " + user.fullName;
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
                console.log(res.data()); 
                    element.innerHTML += "<a href ='/get_all_teams.html?id=" + res.id + " ' ><img src=" + res.data().photo + " class='images column'></a>"; 
            })
        });

}

const createTeam = () =>{
    window.location = '/create.html';
}


/*var data = firebase.database().ref('accounts/');

//obtengo team
function getTeams() {
    var team;
    data.orderByChild('username').equalTo(emailCookie).on('value', snapshot => {
        snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            team = value.teams.id;
            //obtengo el team
            var id = -1;
            var data2 = firebase.database().ref('teams/' + team);
            data2.on('value', function (snapshot) {
                id = snapshot.val();
                var element = document.createElement("div");
                document.getElementById('thumbnails').appendChild(element);
                element.innerHTML += "<a href ='http://127.0.0.1:5500/get_all_teams.html?id=" + team + " ' ><img src=" + id.photo + " class='images'></a>";
            });

        });
    });
}
getTeams();
*/