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

        <!-- Tips to help guide the user's search -->
        <ul>
            <li>Search by name, i.e. 'guard'</li>
            <li>Search by list of names, i.e. guard,prophecy</li>
            <li>Search by list of names that are optional, i.e. guard|prophecy</li>
        </ul>

        <!-- Iterate over all the cards held in data and display them on the page -->
        <div class="cards" v-if="cards.length > 0">
            <Card v-for="card in cards"
                  :key="card.id"
                  :imgUrl="card.imageUrl"
                  :name="card.name"
                  :type="card.type"
                  :setName="card.set.name"
                  :description="card.text"
                  data-aos="fade-up"
            />
        </div>
        <div class="errorMsg">
            Could not find any matching cards.
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
			// Setting up a timer so that we don't blast the API with requests
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				this.retrieveCards(this.searchName);
			}, 400);
		},
		retrieveCards(searchName = '') {
			// Initial cards don't have a name, so we can can omit that param
			api.getCards(searchName).then((result) => {
				this.cards = result.cards;
			});
		},
	},
	// Seed the initial page load with 20 cards
	created() {
		this.retrieveCards();
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
