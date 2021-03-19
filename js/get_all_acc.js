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

function listOfData() {
    
    let list = firebase.database().ref('teams');
    let arr = [];
    list.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let data = childSnapshot.val();
            arr.push(data);
        });
        
        document.getElementById('lc').innerHTML='';
        arr.forEach(function (item) {
            let element = document.createElement("div");
            document.getElementById('lc').appendChild(element);;

            element.innerHTML += "<img src=" + item.photo + " class='images'>";
        });
        arr ='';
    }); 
}