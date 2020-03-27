import {mount} from '@vue/test-utils';
import Home from '../../src/views/Home.vue';
import Card from '../../src/components/Card.vue';
import axios from 'axios';

describe('Home.vue', () => {
	test('renders 20 cards when given valid data', async () => {
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [{"name":"Raise Dead","rarity":"Legendary","type":"Action","cost":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":false,"text":"Summon a random creature from each discard pile.","attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/raise_dead.png","id":"ce7be2e72d6b06a52e50bed01952801ca4ecfade"},{"name":"Reachman Shaman","rarity":"Common","type":"Creature","subtypes":["Reachman"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"At the start of your turn, give another random friendly creature +1/+1.","attributes":["Neutral"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/reachman_shaman.png","id":"15d9c10821d4033fb045ed2cb4599ac76288ac67"},{"name":"Redoran Enforcer","rarity":"Common","type":"Creature","subtypes":["Dark Elf"],"cost":2,"power":2,"health":3,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/redoran_enforcer.png","id":"ebbd44e57df2df1c46f7eaeb7e7847d3c1b2ed46"},{"name":"Rift Thane","rarity":"Epic","type":"Creature","subtypes":["Nord"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Summon: If you have less health than your opponent, +0/+2 and Guard. Otherwise, +2/+0 and Breakthrough.","attributes":["Strength","Willpower"],"keywords":["Breakthrough","Guard"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/rift_thane.png","id":"b3a743a36b1e0139954cc57c06ceae18b8d89f19"},{"name":"Rihad Horseman","rarity":"Common","type":"Creature","subtypes":["Redguard"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Rihad Horseman has +3/+0 and Breakthrough while equipped with an item.","attributes":["Strength"],"keywords":["Breakthrough"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/rihad_horseman.png","id":"958e2558d186c971bc1ced6071090498215e0449"},{"name":"Rihad Nomad","rarity":"Common","type":"Creature","subtypes":["Redguard"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/rihad_nomad.png","id":"c5ba5c67decffee9c3ddc1f8a4ab908498ea05c7"},{"name":"Shimmerene Peddler","rarity":"Epic","type":"Creature","subtypes":["High Elf"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"At the end of each turn, if you played two actions, draw a card.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/shimmerene_peddler.png","id":"ef8bc11591df723e127b9f825055ca4eab319f86"},{"name":"Priest of the Moons","rarity":"Common","type":"Creature","subtypes":["Khajiit"],"cost":2,"power":2,"health":2,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Prophecy. Summon: Gain 2 health.","attributes":["Willpower"],"keywords":["Prophecy"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/priest_of_the_moons.png","id":"326d90bb4cfce93a5502b38f74e1f6e23c271d01"},{"name":"Protective Spider","rarity":"Common","type":"Creature","subtypes":["Spider"],"cost":2,"power":1,"health":1,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":false,"text":"Guard|","attributes":["Agility"],"keywords":["Guard"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/protective_spider.png","id":"1b41e4e0529947c755b77849510fe2c713e71c5d"},{"name":"Imperial Camp","rarity":"Rare","type":"Support","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Ongoing. Summon: Put a 1/2 Septim Guardsman with Guard into your hand. Friendly Guards have +1/+0.","attributes":["Willpower"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/imperial_camp.png","id":"dbdea0cbfd2cb85b11dffbd2febc8e9c3d4ac702"},{"name":"J'zargo","rarity":"Legendary","type":"Creature","subtypes":["Khajiit"],"cost":4,"power":3,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Summon: Put an Experimental Scroll into your hand.","attributes":["Intelligence"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/jzargo.png","id":"adbf6c7782e052098f479f774ff715f86a35565f"},{"name":"Lay Down Arms","rarity":"Rare","type":"Action","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Set a creature's power and health to 1.","attributes":["Endurance"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/lay_down_arms.png","id":"7df7b329639d62a22dbc186a23a6e622ae388d76"},{"name":"Legate Rikke","rarity":"Legendary","type":"Creature","subtypes":["Nord"],"cost":4,"power":3,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"When you summon an Imperial, summon a 1/1 Imperial Grunt in the other lane.","attributes":["Willpower"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/legate_rikke.png","id":"d6a7f917460de639b0493925f098bf82e9b31b83"},{"name":"Mistveil Enchanter","rarity":"Common","type":"Creature","subtypes":["Breton"],"cost":4,"power":2,"health":2,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Ward. Summon: +2/+0 if you have another creature with Ward.","attributes":["Intelligence"],"keywords":["Ward"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/mistveil_enchanter.png","id":"127a19dfe9f70e21c2174d2cc6adf8eb6d5ea7f9"},{"name":"Monk's Strike","rarity":"Rare","type":"Action","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":100,"soulTrap":20,"text":"Move a friendly creature and give it +3/+0 and Drain this turn.","attributes":["Willpower","Agility"],"keywords":["Drain"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/monks_strike.png","id":"70293afa570c18ef788bae9dd9e2b70b31f96363"},{"name":"Mystic Dragon","rarity":"Common","type":"Creature","subtypes":["Dragon"],"cost":4,"power":4,"health":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":50,"soulTrap":5,"text":"Prophecy","attributes":["Intelligence"],"keywords":["Prophecy"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/mystic_dragon.png","id":"a6d5da4720701e467e8750448ca336aea7b0f9ba"},{"name":"Brilliant Experiment","rarity":"Epic","type":"Action","cost":3,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Draw a copy of a friendly creature.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/brilliant_experiment.png","id":"ec73615dd8a14e480a0cf8f13067cb2c5c6e2fca"},{"name":"High Hrothgar","rarity":"Legendary","type":"Support","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":1200,"soulTrap":400,"text":"Ongoing. When you summon a creature, its power becomes equal to its health.","attributes":["Endurance"],"unique":true,"imageUrl":"https://images.elderscrollslegends.io/hos/high_hrothgar.png","id":"ff56c7b72d949e90dedf333f82eba98e3c45940f"},{"name":"Hit and Run","rarity":"Epic","type":"Action","cost":4,"set":{"id":"hos","name":"Heroes of Skyrim","_self":"https://api.elderscrollslegends.io/v1/sets/hos"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"Draw five cards. Discard your hand at the end of the turn.","attributes":["Strength"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/hos/hit_and_run.png","id":"86f829c80e6a6a4988aef2a9812314894def060d"},{"name":"Mages Guild Retreat","rarity":"Epic","type":"Support","cost":7,"set":{"id":"cs","name":"Core Set","_self":"https://api.elderscrollslegends.io/v1/sets/cs"},"collectible":true,"soulSummon":400,"soulTrap":100,"text":"At the end of each turn, if you played two actions, summon a random Atronach.","attributes":["Intelligence"],"unique":false,"imageUrl":"https://images.elderscrollslegends.io/cs/mages_guild_retreat.png","id":"5fe78c87fc4c52b7ab914924d0a6f23707267b8c"}],
					searchName: '',
					loading: false,
					reachedEnd: false,
				}
			}
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.findAll(Card).length).toBe(20);
	});

	test('retrieves 20 cards from API upon page load', async () => {
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
					loading: false,
					reachedEnd: false,
				}
			}
		});

		setTimeout(() => {
			expect(wrapper.findAll(Card).length).toBe(20);
		},1000);
	});

	test('renders error message when no cards are in the array', async () => {
		jest.mock('axios', () => ({
			getCards: jest.fn(() => Promise.resolve({cards: []}))
		}));
		const wrapper = mount(Home, {
			data() {
				return {
					cards: [],
					searchName: '',
					loading: false,
					reachedEnd: false,
				}
			}
		});
		await wrapper.vm.$nextTick();

		setTimeout(() => {
			expect(wrapper.find('.errorMsg').text()).toBe('Could not find any matching cards.');
		}, 1000);
	});
});
