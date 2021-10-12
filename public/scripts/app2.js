var vwatertoday;
var uemail;
var docid;

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      setupUI(user);
      load(user);
    } else {
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
  uemail = user.email;
  db.collection('users').where('email','==',user.email).get().then(snapshot => {
  //db.collection('users').get().then(snapshot => {
    
      snapshot.docs.forEach(doc => {
          docid = doc.id;
          document.getElementById("id").innerHTML = doc.data().Firstname;
          document.getElementById("bu").innerHTML = doc.data().group;
          vwatertoday = doc.data().watertoday;
          document.getElementById("Num").innerHTML = vwatertoday;
          
      });
      
});
}

var nbottles =   setInterval(bottles,100);
var count=-10;
function bottles() {
  
  if (vwatertoday>-1 && vwatertoday !== undefined)
  {
    document.getElementById("numtodaybottles").innerHTML=Math.abs(count*16*-1);
    document.getElementById("numbbubottles").innerHTML=Math.abs(count*26*-1);
    document.getElementById("numtotalbottles").innerHTML=Math.abs(count*235*-1);
        if (count == vwatertoday)
        {
            clearInterval(nbottles);
        }
    }
    count++;
 }

 function drink(){
  if (vwatertoday < 8)
   {
     vwatertoday = vwatertoday +1;
     document.getElementById("Num").innerHTML = vwatertoday;
     db.collection('users').doc(docid).update({watertoday : vwatertoday});
   } 
   nbottles =   setInterval(bottles,100);
   count=0;
}