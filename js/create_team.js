const db = firebase.firestore();
const storageRef = firebase.storage().ref();

const createTeam = () => {
    let foto = document.querySelector('#photo').files[0];
    uploadImage(foto).then((snapshot) => {
        showImage(foto);
    });
};

const update = async (url) => {
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    db.collection("Teams").doc().set({
            name: name,
            description: description,
            photo: url
        })
        .then(docRef => {
            alert("the team was updated successfully");
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