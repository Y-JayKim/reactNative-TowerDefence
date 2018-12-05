import { db } from '../db';


let itemsinDb = [];
let data = '';

db.ref('/users').on('value', (snapshot)=>{
	data = snapshot.val();
	let items = Object.values(data);

	for(i in items){
		itemsinDb.push(items[i]);
	};

});

export const fetchItems = itemsinDb;

export const addItem = (item) => {
	db.ref('/users').push({
		accountInfo: item,
		collections: "null"
	});
}

export const addCollections = (name,  theLength,collections) => {
	console.log('IN')
	for(let key in data){
		if(data[key].accountInfo.username == name){
			db.ref('/users/'+String(key)+'/collections/'+theLength).update(collections);
			userInfo = data[key];
		}
	}
}

export const setCollections = (name, collections) => {
	for(let key in data){
		if(data[key].accountInfo.username == name){
			db.ref('/users/'+String(key)+'/collections/'+String(0)).set(collections);
			userInfo = data[key];
		}
	}
}