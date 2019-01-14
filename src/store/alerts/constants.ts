import { StoreConstants } from '../types';

const AlertsConstants: StoreConstants = {
  actions: {
    ERROR: 'alerts/ERROR',
    NOTICE: 'alerts/NOTICE',
  },
  mutations: {
    SET_ERROR: 'alerts/SET_ERROR',
    SET_NOTICE: 'alerts/SET_NOTICE',
  },
  getters: {},
};

export default AlertsConstants;
