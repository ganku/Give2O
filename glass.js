var num = 0;
function drink(){
    num = num +1;
    if (num < 9)
    {
        document.getElementById("Num").innerHTML = num;
    }
}

function getGlass(){

// getting data
db.collection('users').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        document.getElementById("Num").innerHTML = doc.data().watertoday;
    });
});
        
}

function load(){

   // getting data
    db.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            document.getElementById("id").innerHTML = doc.id;
            document.getElementById("Num").innerHTML = doc.data().watertoday;
        });
});
}

