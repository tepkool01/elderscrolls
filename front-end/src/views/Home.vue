<template>
    <div class="home">
        <!-- Search box that will update the below DOM elements -->
        <div class="search-container">
            <input @keyup="searchByName"
                   v-model="searchName"
                   type="text"
                   id="search"
                   placeholder="Some name, i.e. Redoran Enforcer"
                   autocomplete="off"
            />
        </div>

        <!-- Iterate over all the cards held in data and display them on the page -->
        <div class="cards">
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
        <div v-if="currentLoadingStatus === false && cards.length === 0" class="errorMessage">
            Could not find any matching cards.
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '../components/Card.vue';
import api from '../api';

export default {
	name: 'Home',
	// Include a sub-component called 'Card' which will be the container/holder for our Elder cards
	components: {
		Card,
	},
	// Need an array to hold our retrieved card data, and search input box
	data() {
		return {
			cards: [],
			searchName: '',
		};
	},
	computed: mapGetters(['currentLoadingStatus']),
	methods: {
		loadMore() {
			window.onscroll = () => {
				const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight;
				const closeToBottom = document.documentElement.offsetHeight * 0.95;
				// First check if it is currently loading new DOM elements so multiple calls aren't
				// Issued, then see if we are at the end of the screen (95%)
				if (this.currentLoadingStatus === false && bottomOfWindow >= closeToBottom) {
					api.loadMore()
						.then((result) => {
							this.cards = this.cards.concat(result.cards);
						})
						.catch((error) => {
							// HTTP Status Failure or reached the end of content (expected behavior)
							if (error.response) {
								console.error(error.response);
							}
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
			api.getCards(searchName)
				.then((result) => {
					this.cards = result.cards;
				})
				.catch((error) => {
					if (error.response) {
						console.error(error.response);
					}
				});
		},
	},
	// Seed the initial page load with 20 cards
	created() {
		this.retrieveCards();
	},
	// Create the listener for seeing where they are on the page, which will load more
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
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
input[type=text] {
    width: 350px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-image: url('../assets/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

input[type=text]:focus {
    width: 100%;
}
.search-container {
    max-width: 1000px;
    margin: 10px auto 20px;
}
.search-tips {
    text-align: left;
}
</style>
