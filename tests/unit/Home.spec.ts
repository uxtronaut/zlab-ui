import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue'

import { shallowMount } from '@vue/test-utils';

import Home from '@/views/Home.vue';

Vue.use(BootstrapVue);

describe('Home.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch('Home');
  });
});
