// @ts-nocheck
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '@/features/products/Products.vue';
import ProductAdmin from '@/features/products/ProductAdmin.vue';
import ShopAdmin from '../views/ShopAdmin.vue';
import EditShop from '../views/EditShop.vue';
import Shops from '@/features/shops/Shops.vue';
import Bins from '../views/Bins.vue';
import DidYouKnow from '../views/DidYouKnow.vue';
import CreateShop from '../features/shops/AddShop.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/products',
		name: 'products',
		component: Products
	},
	{
		path: '/products/admin',
		name: 'product-admin',
		component: ProductAdmin
	},
	{
		path: '/shops/admin',
		name: 'shop-admin',
		component: ShopAdmin
	},
	{
		path: '/shops/create',
		name: 'shop-create',
		component: CreateShop
	},
	{
		path: '/locations',
		name: 'shops',
		component: Shops
	},
	{
		path: '/bins',
		name: 'bins',
		component: Bins
	},
	{
		path: '/did-you-know',
		name: 'did-you-know',
		component: DidYouKnow
	},
	{
		path: '/shops/admin/:id',
		name: 'shop-admin-edit',
		component: EditShop,
		props: (route: any) => ({ id: route.params.id })
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
];

// @ts-ignore
const router = new VueRouter({
	routes
});

export default router;
