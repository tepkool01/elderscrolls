import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	// Global state manager
	state: {
		loading: false, // for when API calls are made, this will toggle
	},
	getters: {
		currentLoadingStatus(state) {
			return state.loading;
		},
	},
	mutations: {
		SET_LOADING_STATUS(state, status) {
			state.loading = status;
		},
	},
	actions: {
		// the public interface to start the mutation
		setLoading({ commit }, status) {
			commit('SET_LOADING_STATUS', status);
		},
	},
	modules: {},
});
