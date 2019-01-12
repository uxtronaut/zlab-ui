import Vue from 'vue';
import Vuex from 'vuex';

import sites from './sites';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sites,
  },
});
