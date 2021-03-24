let teams =[];
var db = firebase.firestore();
let team;
const getAllTeams = async () =>{
    db.collection("Teams").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            team = doc.data();
            teams.push(team);
            let div = document.querySelector('#cards');
            //div.innerHTML ='';
            div.innerHTML += `<div class="notification block">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img
                            src="${team.photo}">
                    </figure>
                </div>
                <div class="content column">
                    <p>
                        <strong>${team.name}</strong>
                        <br>
                        ${team.description}<br>
                        Created: ${team.created}<br>
                        Total Members: ${team.totalMembers}
                    </p>
                </div>
                <div class="media-right">
                    <button class="button is-success" id="${doc.id}" style="width: 100px;"
                        onclick="goToTeam(this.id)">GO</button>
                </div>
            </div>
        </div>`
        
        });
    });
};
getAllTeams();



const searchTeam = () => {

    let team = document.querySelector('#team').value;
    let div = document.querySelector('#cards');
    div.innerHTML ='';
    teams.forEach(item =>{
        if(item.name.toUpperCase().startsWith(team.toUpperCase())){
            div.innerHTML += `<div class="notification block">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img
                            src="${item.photo}">
                    </figure>
                </div>
                <div class="content column">
                    <p>
                        <strong>${item.name}</strong>
                        <br>
                        ${item.description}<br>
                        Created: ${item.created}<br>
                        Total Members: ${item.totalMembers}
                    </p>
                </div>
                <div class="media-right">
                    <button class="button is-success" id="${item.id}" style="width: 100px;"
                        onclick="goToTeam(this.id)">GO</button>
                </div>
            </div>
        </div>`
        }
    });
};

//boton go
const goToTeam = (id) => {
    location.href = 'http://127.0.0.1:5500/get_all_teams.html?id=' + id;
}