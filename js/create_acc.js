var data = firebase.database().ref('accounts/');

let autoId = 0;
data.orderByKey().limitToLast(1).on('value', snapshot => {
    autoId = Object.keys(snapshot.val())[0];
});


function createAcc(){
    let email = document.getElementById('email').value;
    let teamId = document.getElementById('team').value;
    let status = document.getElementById('status').value;
    let photo = document.getElementById('photo').files[0];
    data.child(parseInt(autoId) +1).set({
        username:email,
        teams:{
            id:parseInt(teamId)
        },
        status: status,
        photo:"https://firebasestorage.googleapis.com/v0/b/teammatejd.appspot.com/o/images%2Fman.jpg?alt=media&token=b838aded-2747-4eed-898f-6b8cbf0f14c6"
    });
    alert('the account was created');
};

function deleteAcc(){
    let id = document.getElementById('accId').value;
    if (id != '') {
        firebase.database().ref('accounts/' + id).remove();
        alert('the team was removed successfully');
    };
}