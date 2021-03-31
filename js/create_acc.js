const db = firebase.firestore();
const storageRef = firebase.storage().ref();


const createAcc = () => {

    let photo = document.querySelector('#photo').files[0];
    uploadImage(photo).then((snapshot) => {
        showImage(photo);
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

const update = (url) => {
    let status = document.querySelector('#status').value;
    let fullName = document.querySelector('#fullName').value;
    db.collection("Profiles").add({
            fullName: fullName,
            photo: url,
            status: status,
            username: firebase.auth().currentUser.email
        })
        .then((docRef) => {
            alert("the team was profile successfully");
            document.cookie = "username=" + fullName;
            window.location = '/home.html';

        })
        .catch((error) => {
            alert("Error creating team: ", error);
        });
};