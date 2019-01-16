import Vue from 'vue';
import Vuex from 'vuex';

import sites from './sites';
import clusters from './clusters';
import { module as alerts } from './alerts';
import jobs from './jobs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sites,
    clusters,
    alerts,
    jobs,
  },
});
