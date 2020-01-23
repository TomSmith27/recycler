import firebase from '@/firebase/firebase';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';

export default class ProductsService {
	productsCollection: CollectionReference<DocumentData>;

	constructor() {
		this.productsCollection = firebase.collection('products');
	}
	async getProducts() {
		return (await this.productsCollection.get()).docs.map((d) => {
			return { id: d.id, ...d.data() };
		});
	}
}
