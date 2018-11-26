// import { db } from '../db';

// export const addItem = (item) => {
// 	db.ref('/users').push({
// 		"1": "{name: 'air canada',image: 'https://pixabay.com/get/ed6a99fd0a76647_1280.jpg',date_collected: '2018-11-20',location: 'here'}"
// 	});
// // }
// import { db } from '../db';

// export const fetchItem = () => {
// 	db.ref('/users').on('value', (snapshot)=>{
// 		let data = snapshot.val();
// 		let items = Object.values(data);
		
// 		console.log(items);
// 		return items;
// 	});
// }

// export const addItem = (item) => {
// 	db.ref('/items').push({
// 		name: item
// 	});
// }