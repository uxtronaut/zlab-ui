import { StoreConstants } from '../types';

const JobsConstants: StoreConstants = {
  actions: {
    LIST: 'jobs/LIST',
    FETCH: 'jobs/FETCH',
  },
  mutations: {
    SET: 'jobs/SET',
    SET_CURRENT_ID: 'jobs/SET_CURRENT_ID',
  },
  getters: {
    getJob: 'jobs/getJob',
  },
};

export default JobsConstants;
