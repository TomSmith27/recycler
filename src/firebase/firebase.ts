import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyDtlqeARjKr9xAENfapfqSb3s7iDq2WYMQ',
	authDomain: 'recycler-99415.firebaseapp.com',
	databaseURL: 'https://recycler-99415.firebaseio.com',
	projectId: 'recycler-99415',
	storageBucket: 'recycler-99415.appspot.com',
	messagingSenderId: '475097617401',
	appId: '1:475097617401:web:39d109085b3c8c5291a328',
	measurementId: 'G-FYRZ1GWRX2'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();
