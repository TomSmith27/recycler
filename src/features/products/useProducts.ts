import { ref, onMounted, computed } from '@vue/composition-api';
import { Product } from './Product';
import ProductsService from './productsService';

export function useProducts() {
	const productService = new ProductsService();
	let products = ref<Product[]>([]);
	onMounted(async () => (products.value = await productService.getProducts()));
	const orderedProducts = computed(() => products.value.sort((a, b) => (a.name > b.name ? 1 : -1)));
	return { orderedProducts, products };
}
