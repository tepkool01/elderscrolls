<template>
    <div id="app">
        <!-- Simple error component, could do a lot with this -->
        <Error v-if="Object.keys(alertObj).length !== 0"
               :msg="alertObj.message"
               :severity="alertObj.severity"
               :type="alertObj.type"
        />

        <!-- May need this for future scalability -->
        <router-view/>
    </div>
</template>

<script>
import { EventBus } from './eventBus';
import Error from './components/Error.vue';

export default {
	name: 'App',
	components: {
		Error,
	},
	data() {
		return {
			alertObj: {},
			alertTimeout: null,
		};
	},
	watch: {
		// Close out alert component after 8 seconds
		alertObj(val) {
			if (val.message !== undefined) {
				clearTimeout(this.alertTimeout);
				this.alertTimeout = setTimeout(() => {
					this.alertObj = {};
				}, 8000);
			}
		},
	},
	created() {
		// Message bus across all components/views that handles all of the error information
		EventBus.$on('alert', (alertObj) => {
			this.alertObj = alertObj;
		});
	},
};
</script>

<style lang="scss">
$grey-100: #f4f5f7;

html {
	font-size: 16px;
}

body {
	background: $grey-100;
	padding: 1rem;
}

#app {
	font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
@media screen and (max-width: 480px) {

	body {
		padding: 1rem 0;
		width: 100%;
		margin: 0;
	}
}
</style>
