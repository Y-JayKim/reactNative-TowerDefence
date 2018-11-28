import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAT4pk9ZQVbJh2kgkBicQ8jyTqOwcKcVqs",
    authDomain: "airplaneabove.firebaseapp.com",
    databaseURL: "https://airplaneabove.firebaseio.com",
    projectId: "airplaneabove",
    storageBucket: "airplaneabove.appspot.com",
    messagingSenderId: "112092324202"
 };

let app = Firebase.initializeApp(config);

export const db = app.database();



