import { AxiosResponse } from 'axios';

import {
  ActionTree,
  MutationTree,
  GetterTree,
  Module,
  Commit,
} from 'vuex';

import api from '@/api/index';
import { removeNamespace } from '@/util';

import { RootState } from '../types';
import { SitesState, Site } from './types';

import AlertsConstants from '../alerts/constants';
import SitesConstants from './constants';


const _consts = removeNamespace('sites/', SitesConstants);

const initialState: SitesState = {
  list: [],
  newSite: undefined,
  currentSiteSlug: undefined,
};

const actions: ActionTree<SitesState, RootState> = {
  async [_consts.actions.FETCH](
    { commit }: { commit: Commit },
    siteSlug: string,
  ) {
    let response: AxiosResponse;
    try {
      if (siteSlug) {
        response = await api.sites.fetch(siteSlug);
        commit(_consts.mutations.SET, [response.data.site]);
      } else {
        response = await api.sites.fetch();
        commit(_consts.mutations.SET, response.data.sites);
      }
    } catch (error) {
      commit(AlertsConstants.mutations.SET_ERROR, 'Failed to fetch sites...', { root: true });
    }
  },

  async [_consts.actions.CREATE](
    { commit }: { commit: Commit },
    site: Site,
  ) {
    try {
      const response: AxiosResponse = await api.sites.create(site);
      commit(_consts.mutations.ADD, response.data.site);
      commit(_consts.mutations.SET_NEW, undefined);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.site) {
        commit(_consts.mutations.SET_NEW, error.response.data.site);
      } else {
        commit(AlertsConstants.mutations.SET_ERROR, 'Failed to save site...', { root: true });
      }
    }
  },

  async [_consts.actions.DESTROY](
    { commit }: { commit: Commit },
    siteSlug: string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse = await api.sites.destroy(siteSlug);
        commit(_consts.mutations.REMOVE, siteSlug);
        resolve();
      } catch (error) {
        commit(AlertsConstants.mutations.SET_ERROR, 'Failed to delete site...', { root: true });
        reject();
      }
    });
  },
};

const mutations: MutationTree<SitesState> = {
  [_consts.mutations.SET](state: SitesState, sites: Site[]): SitesState {
    state.list = sites;
    return state;
  },

  [_consts.mutations.SET_NEW](state: SitesState, site: Site): SitesState {
    state.newSite = site;
    return state;
  },

  [_consts.mutations.SET_CURRENT_SLUG](state: SitesState, siteSlug: string): SitesState {
    state.currentSiteSlug = siteSlug;
    return state;
  },

  [_consts.mutations.ADD](state: SitesState, site: Site): SitesState {
    state.list = [site, ...state.list];
    return state;
  },

  [_consts.mutations.REMOVE](state: SitesState, siteSlug: string): SitesState {
    state.list = state.list.filter((site: Site) => site.slug !== siteSlug);
    return state;
  },
};

const getters: GetterTree<SitesState, RootState> = {
  [_consts.getters.getSite]: (state: SitesState) => (siteSlug: string): Site => state
    .list.filter((site: Site) => site.slug === siteSlug)[0],
};

const module: Module<SitesState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export default module;
