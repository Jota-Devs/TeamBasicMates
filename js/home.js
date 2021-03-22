
let userCookie = document.cookie.split(';');
let emailCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//saludo
document.getElementById("welcome").innerHTML = "Welcome to your Home Page " + emailCookie;

var data = firebase.database().ref('accounts/');

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