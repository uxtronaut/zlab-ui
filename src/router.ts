import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Sites from './views/Sites.vue';
import Site from './views/Site.vue';
import Clusters from './views/Clusters.vue';
import Jobs from './views/Jobs.vue';
import Job from './views/Job.vue';

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
      path: '/sites',
      name: 'sites',
      component: Sites,
    },
    {
      path: '/sites/:siteSlug',
      name: 'site',
      component: Site,
    },
    {
      path: '/clusters',
      name: 'clusters',
      component: Clusters,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs,
    },
    {
      path: '/jobs/:jobId',
      name: 'job',
      component: Job,
    },
  ],
});
