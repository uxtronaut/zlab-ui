import { SitesState } from './sites/types';
import AlertsState from './alerts/types';
import { ClustersState } from './clusters/types';

export interface StoreConstants {
  actions: { [key: string]: string };
  mutations: { [key: string]: string };
  getters: { [key: string]: string };
}

export interface RootState {
  sites: SitesState;
  clusters: ClustersState;
  alerts: AlertsState;
}
