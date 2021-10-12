// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user.email);
      setupUI(user);
      //Once authenticated direct to app
      window.location.replace("app.html");
    } else {
      setupUI();
      //window.location.replace("index.html");
    }
  })

//Set up UI - Logged in and out
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

// signup User
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const bu = signupForm['bu'].value;
  
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
  //Add user to DB
  setupUser();
  
});

//setupUser First time
function setupUser()
{
  const signupForm = document.querySelector('#signup-form');
  db.collection('users').add(
    {
      Firstname : signupForm['fname'].value,
      email : signupForm['signup-email'].value,
      group : signupForm['bu'].value,
      watertoday :0,
      watertotal : 0
    }
  ).then((docref) => { }).catch(err => {console.log(err.message);
  });
}

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    //Once authenticated direct to app
    window.location.replace("app.html");
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

}); 

