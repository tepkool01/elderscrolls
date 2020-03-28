import axios from "axios";
import { mount } from '@vue/test-utils';
import Home from '../../src/views/Home.vue';
import Card from '../../src/components/Card.vue';
import { EventBus } from "../../src/eventBus";

jest.mock('axios');

// Test data
const cards_20 = [{"name":"Raise Dead","rarity":"Legendary","type":"Action","cost":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":false,"text":"Summon a random creature from each discard pile.","attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/raise_dead.png","id":"ce7be2e72d6b06a52e50bed01952801ca4ecfade"},{"name":"Reachman Shaman","rarity":"Common","type":"Creature","subtypes":["Reachman"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"At the start of your turn, give another random friendly creature +1/+1.","attributes":["Neutral"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/reachman_shaman.png","id":"15d9c10821d4033fb045ed2cb4599ac76288ac67"},{"name":"Redoran Enforcer","rarity":"Common","type":"Creature","subtypes":["Dark Elf"],"cost":2,"power":2,"health":3,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/redoran_enforcer.png","id":"ebbd44e57df2df1c46f7eaeb7e7847d3c1b2ed46"},{"name":"Rift Thane","rarity":"Epic","type":"Creature","subtypes":["Nord"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Summon: If you have less health than your opponent, +0/+2 and Guard. Otherwise, +2/+0 and Breakthrough.","attributes":["Strength","Willpower"],"keywords":["Breakthrough","Guard"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/rift_thane.png","id":"b3a743a36b1e0139954cc57c06ceae18b8d89f19"},{"name":"Rihad Horseman","rarity":"Common","type":"Creature","subtypes":["Redguard"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Rihad Horseman has +3/+0 and Breakthrough while equipped with an item.","attributes":["Strength"],"keywords":["Breakthrough"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/rihad_horseman.png","id":"958e2558d186c971bc1ced6071090498215e0449"},{"name":"Rihad Nomad","rarity":"Common","type":"Creature","subtypes":["Redguard"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/rihad_nomad.png","id":"c5ba5c67decffee9c3ddc1f8a4ab908498ea05c7"},{"name":"Shimmerene Peddler","rarity":"Epic","type":"Creature","subtypes":["High Elf"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"At the end of each turn, if you played two actions, draw a card.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/shimmerene_peddler.png","id":"ef8bc11591df723e127b9f825055ca4eab319f86"},{"name":"Priest of the Moons","rarity":"Common","type":"Creature","subtypes":["Khajiit"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Prophecy. Summon: Gain 2 health.","attributes":["Willpower"],"keywords":["Prophecy"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/priest_of_the_moons.png","id":"326d90bb4cfce93a5502b38f74e1f6e23c271d01"},{"name":"Protective Spider","rarity":"Common","type":"Creature","subtypes":["Spider"],"cost":2,"power":1,"health":1,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":false,"text":"Guard|","attributes":["Agility"],"keywords":["Guard"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/protective_spider.png","id":"1b41e4e0529947c755b77849510fe2c713e71c5d"},{"name":"Imperial Camp","rarity":"Rare","type":"Support","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Ongoing. Summon: Put a 1/2 Septim Guardsman with Guard into your hand. Friendly Guards have +1/+0.","attributes":["Willpower"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/imperial_camp.png","id":"dbdea0cbfd2cb85b11dffbd2febc8e9c3d4ac702"},{"name":"J'zargo","rarity":"Legendary","type":"Creature","subtypes":["Khajiit"],"cost":4,"power":3,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Summon: Put an Experimental Scroll into your hand.","attributes":["Intelligence"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/jzargo.png","id":"adbf6c7782e052098f479f774ff715f86a35565f"},{"name":"Lay Down Arms","rarity":"Rare","type":"Action","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Set a creature's power and health to 1.","attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/lay_down_arms.png","id":"7df7b329639d62a22dbc186a23a6e622ae388d76"},{"name":"Legate Rikke","rarity":"Legendary","type":"Creature","subtypes":["Nord"],"cost":4,"power":3,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"When you summon an Imperial, summon a 1/1 Imperial Grunt in the other lane.","attributes":["Willpower"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/legate_rikke.png","id":"d6a7f917460de639b0493925f098bf82e9b31b83"},{"name":"Mistveil Enchanter","rarity":"Common","type":"Creature","subtypes":["Breton"],"cost":4,"power":2,"health":2,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Ward. Summon: +2/+0 if you have another creature with Ward.","attributes":["Intelligence"],"keywords":["Ward"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/mistveil_enchanter.png","id":"127a19dfe9f70e21c2174d2cc6adf8eb6d5ea7f9"},{"name":"Monk's Strike","rarity":"Rare","type":"Action","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Move a friendly creature and give it +3/+0 and Drain this turn.","attributes":["Willpower","Agility"],"keywords":["Drain"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/monks_strike.png","id":"70293afa570c18ef788bae9dd9e2b70b31f96363"},{"name":"Mystic Dragon","rarity":"Common","type":"Creature","subtypes":["Dragon"],"cost":4,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Prophecy","attributes":["Intelligence"],"keywords":["Prophecy"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/mystic_dragon.png","id":"a6d5da4720701e467e8750448ca336aea7b0f9ba"},{"name":"Brilliant Experiment","rarity":"Epic","type":"Action","cost":3,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Draw a copy of a friendly creature.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/brilliant_experiment.png","id":"ec73615dd8a14e480a0cf8f13067cb2c5c6e2fca"},{"name":"High Hrothgar","rarity":"Legendary","type":"Support","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Ongoing. When you summon a creature, its power becomes equal to its health.","attributes":["Endurance"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/high_hrothgar.png","id":"ff56c7b72d949e90dedf333f82eba98e3c45940f"},{"name":"Hit and Run","rarity":"Epic","type":"Action","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Draw five cards. Discard your hand at the end of the turn.","attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/hit_and_run.png","id":"86f829c80e6a6a4988aef2a9812314894def060d"},{"name":"Mages Guild Retreat","rarity":"Epic","type":"Support","cost":7,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"At the end of each turn, if you played two actions, summon a random Atronach.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/mages_guild_retreat.png","id":"5fe78c87fc4c52b7ab914924d0a6f23707267b8c"}];
const cards_20_2 = [{"name":"Sightless Skulk","rarity":"Common","type":"Creature","subtypes":["Falmer"],"cost":4,"power":4,"health":3,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Summon: Draw a card if you have two other (agility) creatures.","attributes":["Agility"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/sightless_skulk.png","id":"c230e52b99e10acdaa8210d836bee60456a03092"},{"name":"Stormcloak Avenger","rarity":"Epic","type":"Creature","subtypes":["Nord"],"cost":4,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"At the end of your turn, if three or more friendly creatures died this turn, summon a 2/2 Rallying Stormcloak.","attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/stormcloak_avenger.png","id":"f0e6768dddb45792a387de3eb69ddc5d5ecb12c1"},{"name":"Stormcloak Battalion","rarity":"Common","type":"Creature","subtypes":["Nord"],"cost":4,"power":5,"health":5,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":false,"attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/stormcloak_battalion.png","id":"1901fe0c721f4e9f61adaf6270254a7beb9d8fb0"},{"name":"Ulfric's Zealot","rarity":"Common","type":"Creature","subtypes":["Nord"],"cost":4,"power":5,"health":2,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Last Gasp: Put a Heavy Battleaxe into your hand.","attributes":["Strength"],"keywords":["Last Gasp"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/ulfrics_zealot.png","id":"562440f9a4ceed7f2d213fa9cd75e6b0e956ea26"},{"name":"Barbas","rarity":"Legendary","type":"Creature","subtypes":["Daedra","Beast"],"cost":5,"power":3,"health":3,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Summon: Choose one: -Stay: Gains +1/+1 and Guard. Fetch: Put a random Daedra into your hand. Roll Over: Gains Charge.","attributes":["Neutral"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/barbas.png","id":"7c8e08acfb7d417044e27fa97a3567cc30f32d48"},{"name":"Battlefield Scrounger","rarity":"Rare","type":"Creature","subtypes":["Redguard"],"cost":5,"power":3,"health":3,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Charge. Slay: Put a random item into your hand.","attributes":["Strength"],"keywords":["Charge","Slay"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/battlefield_scrounger.png","id":"e2f4743ecd7799bf76b7ad5e8a249b8e4b619e79"},{"name":"Brynjolf","rarity":"Legendary","type":"Creature","subtypes":["Nord"],"cost":5,"power":4,"health":5,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Drain, When a friendly creature Pilfers or Drain, gain +1 magicka this turn.","attributes":["Agility"],"keywords":["Drain","Pilfer"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/brynjolf.png","id":"42299da08ed0f5a170bbf57512b7d196b5630535"},{"name":"Revered Guardian","rarity":"Common","type":"Creature","subtypes":["Dragon"],"cost":4,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Guard","attributes":["Willpower"],"keywords":["Guard"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/revered_guardian.png","id":"e389f0cee1c76d66adc53dab029224a511f733f3"},{"name":"Serpentine Stalker","rarity":"Legendary","type":"Creature","subtypes":["Dragon"],"cost":4,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Slay: +2/+0. May move to attack creatures in the other lane.","attributes":["Agility"],"keywords":["Slay"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/serpentine_stalker.png","id":"66780fce9d6852c1a4eef92857aec8f20118a55c"},{"name":"Swims-at-Night","rarity":"Legendary","type":"Creature","subtypes":["Argonian"],"cost":4,"power":2,"health":2,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Summon: Put a random 0-cost card into your hand. After you play a 0-cost card, Swims-at-Night gains +1/+1.","attributes":["Agility"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/swims-at-night.png","id":"18caa8b415f23fd5b151cf82b74f505f671b3415"},{"name":"Court Wizard","rarity":"Common","type":"Creature","subtypes":["Breton"],"cost":5,"power":3,"health":5,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Summon: Draw a card if you have two other  creatures.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/court_wizard.png","id":"c0de6f6787a6f3490dab8e84992def9e7b754aee"},{"name":"Hulking Draugr","rarity":"Common","type":"Creature","subtypes":["Skeleton"],"cost":5,"power":5,"health":5,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":false,"attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/hulking_draugr.png","id":"b29d6c29c17bf02733738d33b3de1043a0de289d"},{"name":"Insightful Scholar","rarity":"Rare","type":"Creature","subtypes":["High Elf"],"cost":5,"power":2,"health":3,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Prophecy. Summon: Draw a card for each card your opponent drew this turn.","attributes":["Intelligence"],"keywords":["Prophecy"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/insightful_scholar.png","id":"4d50d646a0822d625d304952f1204e94634060d4"},{"name":"Karthspire Scourge","rarity":"Rare","type":"Creature","subtypes":["Dragon"],"cost":5,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Summon: Give all enemy creatures in this lane -1/-0.","attributes":["Willpower"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/karthspire_scourge.png","id":"91aa65f60755ccefb38922a808f6223a528670b8"},{"name":"Lydia","rarity":"Legendary","type":"Creature","subtypes":["Nord"],"cost":5,"power":3,"health":8,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Guard. Lydia guards both lanes.","attributes":["Willpower"],"keywords":["Guard"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/lydia.png","id":"25b72160c5991ce8283ea9d326c500c793359a4a"},{"name":"Prized Chicken","rarity":"Epic","type":"Creature","subtypes":["Beast"],"cost":5,"power":0,"health":1,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Last Gasp: Fill this lane with 1/1 Angry Villagers.","attributes":["Neutral"],"keywords":["Last Gasp"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/prized_chicken.png","id":"4176515cea1b75cbcbcb1d3ce02a7d2f616f08cb"},{"name":"Snowhawk detachment","rarity":"Common","type":"Creature","subtypes":["Imperial"],"cost":5,"power":3,"health":5,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Guard. Summon: +1/+1 if you have another creature with Guard.","attributes":["Willpower"],"keywords":["Guard"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/snowhawk_detachment.png","id":"5caaa2a0a392fce9ce49451ce856798e34136387"},{"name":"Stoutheart Giant","rarity":"Common","type":"Creature","subtypes":["Giant"],"cost":5,"power":6,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/stoutheart_giant.png","id":"2cf353edf241ffafe7a20efa3a3b3544d70e761e"},{"name":"Thief of Dreams","rarity":"Epic","type":"Creature","subtypes":["Khajiit"],"cost":5,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Summon: See a vision of two of your opponent's cards. Guess which one is in their hand. If you're right, draw a copy of it.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/thief_of_dreams.png","id":"79d13bad4d0ef4232c43b9b6e401a1a31e7cbb4d"},{"name":"Cave Bear","rarity":"Common","type":"Creature","subtypes":["Beast"],"cost":5,"power":5,"health":6,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/cave_bear.png","id":"4ce2dcfb9559e5bfee37bfb72bac55d45c95e7a8"}];
const cards_1 = [{"name":"Raise Dead","rarity":"Legendary","type":"Action","cost":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":false,"text":"Summon a random creature from each discard pile.","attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/raise_dead.png","id":"ce7be2e72d6b06a52e50bed01952801ca4ecfade"}];

describe('Home.vue', () => {
	test('renders 20 cards when given valid data', async () => {
		const wrapper = mount(Home, {
			data() {
				return {
					cards: cards_20,
					searchName: '',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.findAll(Card).length).toBe(20);
	});

	test('retrieves 20 cards from API upon page load', async () => {
		axios.get.mockImplementation(() =>
			Promise.resolve({
				"data": {
					"cards": cards_20,
					"_links":{
						"next":"https://api.elderscrollslegends.io/v1/cards?page=2"
					},
					"_pageSize":20,
					"_totalCount":1212
				},
				"status": 200,
			})
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});

		await wrapper.vm.$nextTick();
		await new Promise((r) => setTimeout(r, 500));
		expect(wrapper.findAll(Card).length).toBe(20);
	});

	test('search is invoked after keypress', async () => {
		axios.get.mockImplementation(() =>
			Promise.resolve({
				"data": {
					"cards": cards_1,
					"_links":{
						"next":"https://api.elderscrollslegends.io/v1/cards?page=2"
					},
					"_pageSize":20,
					"_totalCount":1212
				},
				"status": 200,
			})
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: 'a',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});

		await wrapper.vm.$nextTick();

		wrapper.find('#search').trigger('keyup', {
			key: 'a'
		});
		await new Promise((r) => setTimeout(r, 500));
		expect(axios.get).toHaveBeenCalledWith('/v1/cards?pageSize=20&name=a');
	});

	test('load more retrieves 20 additional results', async () => {
		axios.get.mockImplementation((url) => {
				switch (url) {
					case '/v1/cards?pageSize=20':
						return Promise.resolve({
							"data": {
								"cards": cards_20,
								"_links": {
									"next": "https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=20"
								},
								"_pageSize": 20,
								"_totalCount": 1212
							},
							"status": 200,
						});
					case 'https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=20':
						return Promise.resolve({
							"data": {
								"cards": cards_20_2,
								"_links": {
									"next": "https://api.elderscrollslegends.io/v1/cards?page=3&pageSize=20"
								},
								"_pageSize": 20,
								"_totalCount": 1212
							},
							"status": 200,
						});
				}
			}
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});
		await wrapper.vm.$nextTick();

		await new Promise((r) => setTimeout(r, 1000));
		window.dispatchEvent(new CustomEvent('scroll', {detail: 10000}));

		await new Promise((r) => setTimeout(r, 1000));
		expect(wrapper.findAll(Card).length).toBe(40);
	});

	test('search is invoked after keypress with 2 letters', async () => {
		axios.get.mockImplementation(() =>
			Promise.resolve({
				"data": {
					"cards": cards_1,
					"_links":{
						"next":"https://api.elderscrollslegends.io/v1/cards?page=2"
					},
					"_pageSize":20,
					"_totalCount":1212
				},
				"status": 200,
			})
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: 'ab',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});

		await wrapper.vm.$nextTick();

		wrapper.find('#search').trigger('keyup', {
			key: 'a'
		});
		await new Promise((r) => setTimeout(r, 50));
		wrapper.find('#search').trigger('keyup', {
			key: 'b'
		});
		await new Promise((r) => setTimeout(r, 500));
		expect(axios.get).toHaveBeenCalledWith('/v1/cards?pageSize=20&name=ab');
	});

	test('error on initial load', async () => {
		jest.spyOn(EventBus, 'setAlert');
		axios.get.mockImplementation(() => {
			return Promise.reject({
				"status": 500,
				"error": "Ran out invokes."
			});
			}
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});
		await wrapper.vm.$nextTick();

		await new Promise((r) => setTimeout(r, 1000));
		expect(EventBus.setAlert).toHaveBeenCalled()
	});

	test('load more reaches the end', async () => {
		jest.spyOn(EventBus, 'setAlert');
		axios.get.mockImplementation((url) => {
				switch (url) {
					case '/v1/cards?pageSize=20':
						return Promise.resolve({
							"data": {
								"cards": cards_20,
								"_pageSize": 20,
								"_totalCount": 1212
							},
							"status": 200,
						});
					case 'https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=20':
					case '/v1/cards?page=2&pageSize=20':
						return Promise.reject({
							"status": 500,
							"error": "Ran out invokes."
						});
				}
			}
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});
		await wrapper.vm.$nextTick();

		await new Promise((r) => setTimeout(r, 1000));
		window.dispatchEvent(new CustomEvent('scroll', {detail: 20000}));

		await new Promise((r) => setTimeout(r, 1000));
		expect(EventBus.setAlert).toHaveBeenCalled();
	});

	test('load more while loading skips', async () => {
		axios.get.mockImplementation((url) => {
				switch (url) {
					case '/v1/cards?pageSize=20':
						return Promise.resolve({
							"data": {
								"cards": cards_20,
								"_pageSize": 20,
								"_totalCount": 1212
							},
							"status": 200,
						});
					case 'https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=20':
					case '/v1/cards?page=2&pageSize=20':
						return Promise.reject({
							"status": 500,
							"error": "Ran out invokes."
						});
				}
			}
		);
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return true;
					}
				}
			}
		});
		await wrapper.vm.$nextTick();

		await new Promise((r) => setTimeout(r, 1000));
		window.dispatchEvent(new CustomEvent('scroll', {detail: 20000}));

		await new Promise((r) => setTimeout(r, 1000));
		expect(axios.get).not.toHaveBeenCalledWith('/v1/cards?page=2&pageSize=20');
	});

	test('dirty search term', async () => {
		jest.spyOn(EventBus, 'setAlert');
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '--',
				}
			},
			computed: {
				currentLoadingStatus: {
					get() {
						return false;
					}
				}
			}
		});

		await wrapper.vm.$nextTick();

		wrapper.find('#search').trigger('keyup', {
			key: '--'
		});

		await new Promise((r) => setTimeout(r, 1000));
		expect(EventBus.setAlert).toHaveBeenCalled();
	});
});
