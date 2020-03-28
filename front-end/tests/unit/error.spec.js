import {mount} from '@vue/test-utils';
import Error from '../../src/components/Error.vue';

describe('Error.vue', () => {
	test('renders an error block when passed valid data', async () => {
		const wrapper = mount(Error, {
			propsData: {
				msg: 'Test',
				severity: 1,
				type: 'Error',
			}
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.err-msg').text()).toBe('Test');
		expect(wrapper.find('.severity').text()).toBe('1');
		expect(wrapper.find('.type').text()).toBe('Error');
	});
	test('renders error defaults when no data is passed', async () => {
		const wrapper = mount(Error);
		await wrapper.vm.$nextTick();

		expect(wrapper.find('.err-msg').text()).toBe('There has been an error, please refresh the page.');
		expect(wrapper.find('.severity').text()).toBe('1');
		expect(wrapper.find('.type').text()).toBe('Error');
	});
});
