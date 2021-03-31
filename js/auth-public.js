let emailCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            document.querySelector('.navbar-end').innerHTML =`<div class="navbar-item">
            <div class="buttons">
                <a class="button is-text has-text-white" href="/index.html">
                    Sign up
                </a>
                <p class="has-text-white"> | </p>
                <a class="button is-text has-text-white" href="/index.html">
                    Sign In
                </a>
            </div>
        </div>`
        } else {
            document.querySelector('.navbar-end').innerHTML = ` <div class="buttons">
            <h2 id='welcome' class="has-text-white"></h2>
            <p class="has-text-white"> | </p>
            <a class="button is-text has-text-white" onclick="logout()">
                Logout
            </a>`
            document.getElementById("welcome").innerHTML = "Welcome, " + emailCookie + " ";
        }
    });
};

const logout = () => {
    firebase.auth().signOut();
    document.cookie = "username= ''"
};