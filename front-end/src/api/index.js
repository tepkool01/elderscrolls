import axios from 'axios';

const RESULTS_PER_PAGE = 20;
let nextLink; // register this in the global scope so other methods can access it

/**
 * Creating a 'private' function that the below api methods
 * can leverage to extract the next link for pagination
 * @param data
 * @returns {{endOfResults: boolean, url: String}}
 */
function getNextLink(data) {
	nextLink = {
		url: '',
		endOfResults: true,
	};
	if (Object.prototype.hasOwnProperty.call(data, '_links') && Object.prototype.hasOwnProperty.call(data['_links'], 'next')) {
		nextLink = {
			url: data['_links']['next'],
			endOfResults: false,
		};
	}
	return nextLink;
}

export default {
	/**
	 * Retrieves a set amount of results (JSON) as a promise to the requester
	 * @param name String
	 * @returns {Promise<Array>}
	 */
	getCards(name = '') {
		// Construct the query string for the URL; concatenate it if invoked with 'name' parameter
		let queryString = `pageSize=${RESULTS_PER_PAGE}`;
		if (name.length > 0) {
			queryString += `&name=${name}`;
		}

		// Wrap the promise with our own so we can intervene with the response and capture the next link
		return new Promise((resolve, reject) => {
			axios.get(`/v1/cards?${queryString}`).then((result) => {
				// Set the next link, which will be used by loadMore method to retrieve additional content
				nextLink = getNextLink(result.data);

				// Return or resolve the content to the view which renders the content
				resolve(result.data);
			}).catch((error) => reject(error));
		});
	},

	/**
	 * Loads more card data (if available) based on the nextUrl
	 * @returns {Promise<Array>}
	 */
	loadMore() {
		return new Promise((resolve, reject) => {
			// Only make a call if the next link has content
			if (nextLink.endOfResults === false) {
				// Invoke the API similar to how we did in getCards, but with the nextUrl
				axios.get(nextLink.url).then((result) => {
					nextLink = getNextLink(result.data);
					resolve(result.data);
				}).catch((error) => reject(error));
			} else {
				reject(new Error('No more content.'));
			}
		});
	},
};
