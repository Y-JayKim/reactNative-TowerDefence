import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDCeQN9uPC6hFt4kjewt9nqhB14oueyHuI",
    authDomain: "airplaneaboveme.firebaseapp.com",
    databaseURL: "https://airplaneaboveme.firebaseio.com",
    projectId: "airplaneaboveme",
    storageBucket: "airplaneaboveme.appspot.com",
    messagingSenderId: "1022251621310"
};

let app = Firebase.initializeApp(config);

let itemsinDb = [];

app.database().ref('/users').on('value', (snapshot)=>{
	let data = snapshot.val();
	let items = Object.values(data);

	for(i in items){
		itemsinDb.push(items[i].name);
	};
});

export const db2 = itemsinDb;
export const db = app.database();



