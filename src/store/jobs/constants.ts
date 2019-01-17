import { StoreConstants } from '../types';

const JobsConstants: StoreConstants = {
  actions: {
    LIST: 'jobs/LIST',
    FETCH: 'jobs/FETCH',
    UPDATE_LOG: 'jobs/UPDATE_LOG',
  },
  mutations: {
    SET: 'jobs/SET',
    SET_CURRENT_ID: 'jobs/SET_CURRENT_ID',
    APPEND_LOG: 'jobs/APPEND_LOG',
  },
  getters: {
    getJob: 'jobs/getJob',
  },
};

export default JobsConstants;
