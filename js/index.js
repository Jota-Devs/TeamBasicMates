  const auth = firebase.auth();
  //Create a User
  const signUp = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        //alert("New Account : " + user.email);
        cleanText();
        document.cookie = "username=" + email;
        window.location = '/home.html';
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  //Login as an User
  const login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        //alert("Account logued : " + user.email);
        cleanText();
        document.cookie = "username=" + email;
        window.location = '/home.html';
      }).catch((e) => {
        alert(e.message);
      });
  };

  //recover password
  const recoveryPassword = () => {
    let email = document.getElementById("emailPassword").value;
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

  //modal call
  const callModal = ()=>{
    let modal = document.querySelector('#recPass');
    modal.className ='modal is-active';
  }

  //close modal
  const closeModal = ()=>{
    let modal = document.querySelector('#recPass');
    let input = document.querySelector('#emailPassword');
    input.value ='';
    modal.className ='modal';
  }