import firebase from '@/firebase/firebase';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';

export default class ShopsService {
	shopsCollection: CollectionReference<DocumentData>;

	constructor() {
		this.shopsCollection = firebase.collection('places');
	}
	async get() {
		return (await this.shopsCollection.get()).docs.map((d) => {
			return { id: d.id, ...d.data() };
		});
	}
	async getById(id: string) {
		return { id: id, ...await (await this.shopsCollection.doc(id).get()).data() };
	}

	async add(shop: any) {
		await this.shopsCollection.add(shop);
	}

	async update(id: string, shop: any) {
		await this.shopsCollection.doc(id).update(shop);
	}
}
