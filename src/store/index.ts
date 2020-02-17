import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			email: ''
		}
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		}
	},
	actions: {
		LOGIN({ commit }) {
			window.localStorage.setItem('recycle-user', 'poppy');
			commit('setUser', {
				email: 'poppy'
			});
		},
		LOGOUT({ commit }) {
			window.localStorage.removeItem('recycle-user');
			commit('setUser', {
				email: ''
			});
		}
	},
	modules: {},
	getters: {
		isLoggedIn(state) {
			return state.user.email.length > 0;
		},
		user(state) {
			return state.user;
		}
	}
});
