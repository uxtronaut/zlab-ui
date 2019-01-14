import { StoreConstants } from '../types';

const ClustersConstants: StoreConstants = {
  actions: {
    LIST: 'clusters/LIST',
    LIST_FLYNN_RELEASES: 'clusters/LIST_FLYNN_RELEASES',
    FETCH: 'clusters/FETCH',
    CREATE: 'clusters/CREATE',
    DESTROY: 'clusters/DESTROY',
  },
  mutations: {
    SET: 'clusters/SET',
    SET_NEW: 'clusters/SET_NEW',
    SET_FLYNN_RELEASES: 'clusters/SET_FLYNN_RELEASES',
    SET_CURRENT_SLUG: 'clusters/SET_CURRENT_SLUG',
    ADD: 'clusters/ADD',
    REMOVE: 'clusters/REMOVE',
  },
  getters: {
    getCluster: 'clusters/getCluster',
  },
};

export default ClustersConstants;
