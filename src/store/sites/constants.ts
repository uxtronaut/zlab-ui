import { StoreConstants } from '../types';

const SitesConstants: StoreConstants = {
  actions: {
    LIST: 'sites/LIST',
    FETCH: 'sites/FETCH',
    CREATE: 'sites/CREATE',
    DESTROY: 'sites/DESTROY',

    CREATE_ENVIRONMENT: 'sites/CREATE_ENVIRONMENT',
    UPDATE_ENVIRONMENT: 'sites/UPDATE_ENVIRONMENT',
    DESTROY_ENVIRONMENT: 'sites/DESTROY_ENVIRONMENT',
  },
  mutations: {
    SET: 'sites/SET',
    SET_NEW: 'sites/SET_NEW',
    SET_CURRENT_SLUG: 'sites/SET_CURRENT_SLUG',
    ADD: 'sites/ADD',
    REMOVE: 'sites/REMOVE',

    SET_NEW_ENVIRONMENT: 'sites/SET_NEW_ENVIRONMENT',
    ADD_ENVIRONMENT: 'sites/ADD_ENVIRONMENT',
    REPLACE_ENVIRONMENT: 'sites/REPLACE_ENVIRONMENT',
    REMOVE_ENVIRONMENT: 'sites/REMOVE_ENVIRONMENT',
  },
  getters: {
    getSite: 'sites/getSite',
  },
};

export default SitesConstants;
