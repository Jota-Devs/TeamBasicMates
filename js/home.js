//consigo mail del parametro
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('user')
//saludo
document.getElementById("welcome").innerHTML = "Welcome to your Home Page " + email;

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
var data = firebase.database().ref('accounts/');

//obtengo team
var team;
data.orderByChild('username').equalTo(email).on('value', snapshot => {
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
            element.innerHTML += "<a href ='http://127.0.0.1:5500/get_all_teams.html?id="+ team+" ' ><img src=" + id.photo + " class='images'></a>";
        });

    });
});