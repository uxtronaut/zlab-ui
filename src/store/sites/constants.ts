import { StoreConstants } from '../types';

const SitesConstants: StoreConstants = {
  actions: {
    FETCH: 'sites/FETCH',
    CREATE: 'sites/CREATE',
    DESTROY: 'sites/DESTROY',
  },
  mutations: {
    SET: 'sites/SET',
    SET_NEW: 'sites/SET_NEW',
    SET_CURRENT_SLUG: 'sites/SET_CURRENT_SLUG',
    ADD: 'sites/ADD',
  },
  getters: {
    getSite: 'sites/getSite',
  },
};

export default SitesConstants;
