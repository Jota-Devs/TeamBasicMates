var db = firebase.firestore();
let photoURL;

const createTeam = () => {
    let foto = document.querySelector('#photo').files[0];
    console.log(foto);

};

const update = ()=> {
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    db.collection("Teams").doc().set({
            name: name,
            description: description,
            photo: photoURL
        })
        .then(docRef => {
            console.log("Document successfully written!" + docRef.id);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

const upload = (up) => {
    const storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + up.name).put(up);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                photoURL = downloadURL;

            });
        }
    );
};












/*var data = firebase.database().ref('teams/');

function getAll() {
    let arr = [];
    data.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let data = childSnapshot.val();
            arr.push(data);
        });
        console.log(arr);
    });
}
//ultimo num
let autoId = 0;
data.orderByKey().limitToLast(1).on('value', snapshot => {
    autoId = Object.keys(snapshot.val())[0];
});
//need fix the async
function createTeam() {
    let name = document.getElementById("name").value;
    let up = document.getElementById('photo').files[0];
    let photo = upload(up);
    data.child(parseInt(autoId) + 1).set({
        username: name,
        photo: "https://firebasestorage.googleapis.com/v0/b/teammatejd.appspot.com/o/images%2Fman.jpg?alt=media&token=b838aded-2747-4eed-898f-6b8cbf0f14c6"
    });
};

function upload(up) {
    const storageRef = firebase.storage().ref();
    let imagesRef = storageRef.child('images/' + up.name);
    let url = up.name;
    imagesRef.put(up)
        .then((snapshot) => {
            let ret = addpicture(url);
            return ret;
        });
};

function addpicture(file) {
    var pathReference = firebase.storage().ref('images/' + file);
    pathReference.getDownloadURL().then((url) => {
        return url;
    });
};

function deleteTeam() {
    let id = document.getElementById('idTeam').value;
    if (id != '') {
        firebase.database().ref('teams/' + id).remove();
        alert('the team was removed successfully');
    };
};

function updateTeam() {
    let name = document.getElementById('name').value;
    let id = document.getElementById('idTeam').value;

    if (id != '' && name != '') {
        firebase.database().ref('teams/' + id).update({
            username: name
        });
        alert('the team was updated successfully');
    };
};*/