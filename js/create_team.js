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

var data = firebase.database().ref('teams/');


let arr = [];
data.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        arr.push(data);
    });
console.log(arr);
});
//ultimo num
var autoId = 0;
data.orderByKey().limitToLast(1).on('value', snapshot => {
    autoId = Object.keys(snapshot.val())[0];
});
//need fix the async
 function createTeam(){
    let name = document.getElementById("name").value;
    let up = document.getElementById('photo').files[0];
    let photo =  upload(up);
    data.child(parseInt(autoId) + 1).set({
        username: name,
        photo: "https://firebasestorage.googleapis.com/v0/b/teammatejd.appspot.com/o/images%2Fman.jpg?alt=media&token=b838aded-2747-4eed-898f-6b8cbf0f14c6"
    });
}

  function upload(up) {
    var storageRef = firebase.storage().ref();
    //: if request.auth != null
    var mountainImagesRef = storageRef.child('images/' + up.name);
    let url = up.name;
    mountainImagesRef.put(up)
        .then((snapshot) => {
            
            let ret =   addpicture(url);

            return ret;
        });
}

 function addpicture(file) {
    var pathReference = firebase.storage().ref('images/' + file);
    pathReference.getDownloadURL().then((url) => {
        return url;
    })
}