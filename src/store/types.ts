import { SitesState } from './sites/types';

export interface StoreConstants {
  actions: { [key: string]: string },
  mutations: { [key: string]: string },
  getters: { [key: string]: string },
}

export interface RootState {
  sites: SitesState,
}
