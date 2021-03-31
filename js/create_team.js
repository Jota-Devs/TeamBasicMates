const db = firebase.firestore();
const storageRef = firebase.storage().ref();

let userID;
const getUserID = () => {
    db.collection("Profiles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().username == firebase.auth().currentUser.email) {
                document.getElementById("welcome").innerHTML = "Welcome, " + doc.data().fullName + " ";
                userID = doc.id;
            };
        });
    });
};
getUserID();


const createTeam = () => {
    let foto = document.querySelector('#photo').files[0];
    uploadImage(foto).then((snapshot) => {
        showImage(foto);
    });
};

const update =  (url) => {
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    let date = getDate();
    db.collection("Teams").add({
            name: name,
            description: description,
            photo: url,
            owner: db.doc("Profiles/" + userID),
            created:date,
            teamMembers: firebase.firestore.FieldValue.arrayUnion(db.doc("Profiles/"+userID))

        })
        .then((docRef) => {
            alert("the team was created successfully"+ docRef);
            cleanInputs();
            addTeamToUser(docRef.id);
        })
        .catch((error) => {
            alert("Error creating team: ", error);
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

const getDate = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let todayString = today.toDateString();
    let month = todayString.slice(4, 7);
    let year = todayString.slice(11, 15);
    return month + ' ' + year;
};

const cleanInputs = ()=> {
    document.querySelector('#name').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#photo').value = '';
}

const addTeamToUser = (teamID) => {
    let userRef = db.collection("Profiles").doc(userID);
    userRef.update({
        teams: firebase.firestore.FieldValue.arrayUnion(db.doc("Teams/"+teamID))
    });
}