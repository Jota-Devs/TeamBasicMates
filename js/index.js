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
  //////////////////////////////////////////////////////
  const auth = firebase.auth();


  //Create a User
  const signUp = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        alert("New Account : " + user.email);
        cleanText();
        window.location = 'http://127.0.0.1:5500/home.html?user=' + user.email + '';
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  //Login as an User
  const login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        alert("Account logued : " + user.email);
        cleanText();
        window.location = 'http://127.0.0.1:5500/home.html?user=' + user.email + '';
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  //recover password
  const recoveryPassword = () => {
    let email = document.getElementById("email").value;
    auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("A mail was send to :" + email)
      cleanText();
    })
    .catch((e) => {
      alert(e.message)
    });
  }
  //dispose text
  const cleanText = () => {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }
  

