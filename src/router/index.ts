// @ts-nocheck
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import ProductAdmin from '../views/ProductAdmin.vue';

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
