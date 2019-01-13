import { SitesState } from './sites/types';
import AlertsState from './alerts/types';

export interface StoreConstants {
  actions: { [key: string]: string },
  mutations: { [key: string]: string },
  getters: { [key: string]: string },
}

export interface RootState {
  sites: SitesState,
  alerts: AlertsState,
}
