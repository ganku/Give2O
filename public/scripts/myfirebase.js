// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxl3Xj9rNvbhwuBf1qVCXWJhTh5Vj2_bc",
    authDomain: "help2o.firebaseapp.com",
    projectId: "help2o",
    storageBucket: "help2o.appspot.com",
    messagingSenderId: "909907423872",
    appId: "1:909907423872:web:b83b4433b19d34b0f7ec65",
    measurementId: "G-2RH40GDDH9"
};
firebase.initializeApp(config);
const db = firebase.firestore();

//make auth constant
const auth = firebase.auth();

//Update firestore setting
db.settings({ timestampsInSnapshots: true }); 