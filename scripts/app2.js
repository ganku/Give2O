var num = 0;
var watertoday;

function drink(){
    num = num +1;
    if (num < 9)
    {
        document.getElementById("Num").innerHTML = num;
    }
}

var nbottles =   setInterval(bottles,100);
let count=1;

function bottles() {
  count++;
  if (watertoday !== undefined)
  {
    document.getElementById("numtodaybottles").innerHTML=count;
    document.getElementById("numbbubottles").innerHTML=count*26;
    document.getElementById("numtotalbottles").innerHTML=count*235;
        if (count == watertoday)
        {
            clearInterval(nbottles);
        }
    }
}

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user.email);
      setupUI(user);
      load(user);
    } else {
      console.log('user logged out');
      setupUI();
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

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("index.html");
});

function load(user){
  db.collection('users').where('email','==',user.email).get().then(snapshot => {
  //db.collection('users').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
          document.getElementById("id").innerHTML = doc.data().Firstname;
          document.getElementById("bu").innerHTML = doc.data().group;
          watertoday = doc.data().watertoday;
          document.getElementById("Num").innerHTML = watertoday;
          document.getElementById("Num").innerHTML = watertoday;
      });
      
});
}