import Vue from 'vue';
import AOS from 'aos'; // Infinite scroll library
import 'aos/dist/aos.css'; // Infinite scroll css effects
import axios from 'axios'; // Our request library
import NProgress from 'nprogress'; // For the progress bar at the top
import 'nprogress/nprogress.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Setting defaults for all requests
axios.defaults.baseURL = 'https://api.elderscrollslegends.io/';

// Adding interceptors to show loading bar during HTTP requests
axios.interceptors.request.use((config) => {
	NProgress.start();
	return config;
});

// Stops the loading bar once the request is resolved
axios.interceptors.response.use((response) => {
	NProgress.done();
	return response;
});

new Vue({
	created() {
		AOS.init();
	},
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
