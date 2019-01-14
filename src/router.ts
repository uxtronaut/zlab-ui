import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Site from './views/Site.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sites/:siteSlug',
      name: 'sites',
      component: Site,
    },
  ],
});
