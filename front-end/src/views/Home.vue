<template>
    <div class="home">
        <label for="search">Search</label>
        <!-- Search box that will update the below DOM elements -->
        <input @keyup="searchByName"
               v-model="searchName"
               type="text"
               id="search"
               placeholder="Some name, i.e. Redoran Enforcer"
        />
        <span>
            Search by name or sets of names, i.e. bob|karen
            (matching one or the other) or bob,karen (matching 2 names)
        </span>

        <!-- Iterate over all the cards held in data and display them on the page -->
        <div class="cards">
            <Card v-for="card in cards"
                  :key="card.id"
                  :data="card"
                  data-aos="fade-up"
            />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue';
import api from '../api';

export default {
	name: 'Home',
	// Include a sub-component called 'Card' which will be the container/holder for our Elder cards
	components: {
		Card,
	},
	// Need an array to hold our retrieved card data, and a loading boolean to indicate processing
	data() {
		return {
			cards: [],
			searchName: '',
			loading: false,
			reachedEnd: false,
		};
	},
	methods: {
		loadMore() {
			console.debug('>>loadMore()');
			window.onscroll = () => {
				const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight;
				const closeToBottom = document.documentElement.offsetHeight * 0.95;
				// First check if it is currently loading new DOM elements so multiple calls aren't
				// Issued, then see if we are at the end of the screen (95%)
				if (this.loading === false && bottomOfWindow >= closeToBottom) {
					this.loading = true;
					api.loadMore()
						.then((result) => {
							this.cards = this.cards.concat(result.cards);
						})
						.catch(() => {
							this.reachedEnd = true;
						})
						.finally(() => {
							this.loading = false;
						});
				}
			};
		},
		searchByName() {
			console.debug('>>searchByName(})');

			// Setting up a timer so that we don't blast the API with requests
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				api.getCards(this.searchName).then((result) => {
					this.cards = result.cards;
				}).catch((error) => console.error('Discovered an error', error));
			}, 400);
		},
		retrieveInitialCards() {
			console.debug('>>retrieveInitialCards()');
			// Initial cards don't have a name, so we can can omit that param
			api.getCards().then((result) => {
				this.cards = result.cards;
			}).catch((error) => console.error('Discovered an error', error));
		},
	},
	// Seed the initial page load with 20 cards
	created() {
		this.retrieveInitialCards();
	},
	mounted() {
		this.loadMore();
	},
};
</script>

<style lang="scss" scoped>
.cards {
    max-width: 1920px;
    margin: 0 auto;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
