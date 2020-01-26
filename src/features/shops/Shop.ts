import { OpeningTimes } from './OpeningHours';

export interface Shop {
	id?: string;
	name: string;
	address: string;
	products: string[];
	shopType: string;
	openingTimes: OpeningTimes[];
}
