import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library as iconLibrary } from '@fortawesome/fontawesome-svg-core';

import {
  faCheck,
  faTimes,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';
import store from './store';

iconLibrary.add(
  faCheck,
  faTimes,
  faSpinner,
);

Vue.component('Icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
