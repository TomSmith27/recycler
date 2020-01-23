import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './theme.scss';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
