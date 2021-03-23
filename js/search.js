const searchTeam = () => {
    let team = document.querySelector('#team').value;
    var db = firebase.firestore();
    var docRef = db.doc('Teams/ge0S9HNBisdI1jpUAbOo');//db.collection("Teams").doc("ge0S9HNBisdI1jpUAbOo");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



}

const goToTeam = (id) => {
    location.href = 'http://127.0.0.1:5500/get_all_teams.html?id=' + id;
}