import {mount} from '@vue/test-utils';
import Card from '../../src/components/Card.vue';

describe('Card.vue', () => {
	test('renders a card when passed valid data', async () => {
		const wrapper = mount(Card, {
			propsData: {
				name: 'Adoring Fan',
				imgUrl: 'https://images.elderscrollslegends.io/cs/adoring_fan.png',
				type: 'Creature',
				setName: 'Core Set',
				description: 'Prophecy, Guard. Last Gasp: Adoring Fan will return. Adoring Fan is immune to Silence.',
			}
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.title').text()).toBe('Adoring Fan');
		expect(wrapper.find('.img').attributes('src')).toBe('https://images.elderscrollslegends.io/cs/adoring_fan.png');
		expect(wrapper.find('.type').text()).toBe('Creature');
		expect(wrapper.find('.set').text()).toBe('Core Set');
		expect(wrapper.find('.description').text()).toBe('Prophecy, Guard. Last Gasp: Adoring Fan will return. Adoring Fan is immune to Silence.');
	});
	test('renders defaults when no data is passed', async () => {
		const wrapper = mount(Card);
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.title').text()).toBe('N/A');
		expect(wrapper.find('.img').text()).toBe('');
		expect(wrapper.find('.type').text()).toBe('N/A');
		expect(wrapper.find('.set').text()).toBe('N/A');
		expect(wrapper.find('.description').text()).toBe('N/A');
	});
});
