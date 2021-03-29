window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location = '/index.html';
        } 
    });
};