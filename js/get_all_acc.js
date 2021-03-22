
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
listOfData();