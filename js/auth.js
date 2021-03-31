window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location = '/index.html';
        } 
    });
};

const logout = () => {
    firebase.auth().signOut();
    document.cookie = "username= ''"
};