import Firebase from 'firebase';

var config = {

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



