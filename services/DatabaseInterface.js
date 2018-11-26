import { db } from '../db';


let itemsinDb = [];

db.ref('/users').on('value', (snapshot)=>{
	let data = snapshot.val();
	let items = Object.values(data);

	for(i in items){
		itemsinDb.push(items[i].name);
	};
});

export const fetchItems = itemsinDb;

export const addItem = (item) => {
	db.ref('/users').push({
		name: item
	});
}