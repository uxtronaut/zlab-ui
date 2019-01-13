import { AxiosResponse } from 'axios';
import { get } from 'lodash';

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
import { SitesState, Site, Environment } from './types';

import AlertsConstants from '../alerts/constants';
import SitesConstants from './constants';


const _consts = removeNamespace('sites/', SitesConstants);

const initialState: SitesState = {
  list: [],
  newSite: undefined,
  newEnvironment: undefined,
  currentSiteSlug: undefined,
};

const setError = (commit: Commit, action: string, error: string): void => {
  commit(
    AlertsConstants.mutations.SET_ERROR,
    `Failed to ${action}. (${error})`,
    { root: true },
  );
};

const actions: ActionTree<SitesState, RootState> = {
  async [_consts.actions.LIST]({ commit }: { commit: Commit }) {
    let response: AxiosResponse;

    try {
      response = await api.sites.list();
    } catch (error) {
      setError(commit, 'list sites', error.message);
      return;
    }

    commit(_consts.mutations.SET, response.data.sites);
  },

  async [_consts.actions.FETCH]({ commit }: { commit: Commit }, siteSlug: string) {
    let response: AxiosResponse;

    try {
      response = await api.sites.fetch(siteSlug);
    } catch (error) {
      setError(commit, 'fetch site', error.message);
      return;
    }

    commit(_consts.mutations.SET, [response.data.site]);
  },

  async [_consts.actions.CREATE]({ commit }: { commit: Commit }, site: Site) {
    let response: AxiosResponse;

    try {
      response = await api.sites.create(site);
    } catch (error) {
      if (get(error, 'response.data.site.errors')) {
        commit(_consts.mutations.SET_NEW, error.response.data.site);
      } else {
        setError(commit, 'create site', error.message);
      }

      return;
    }

    commit(_consts.mutations.ADD, response.data.site);
    commit(_consts.mutations.SET_NEW, undefined);
  },

  async [_consts.actions.DESTROY]({ commit }: { commit: Commit }, siteSlug: string) {
    // Promise because we need to resolve and redirect home after site
    // is deleted, or reject and stay put after server/connection error
    return new Promise(async (resolve, reject) => {
      let response: AxiosResponse;

      try {
        response = await api.sites.destroy(siteSlug);
      } catch (error) {
        setError(commit, 'delete site', error.message);
        reject();
      }

      commit(_consts.mutations.REMOVE, siteSlug);
      resolve();
    });
  },

  async [_consts.actions.CREATE_ENVIRONMENT](
    { commit, state }: { commit: Commit, state: SitesState },
    environment: Environment,
  ) {
    if (!state.currentSiteSlug) {
      setError(commit, 'create environment', 'undefined currentSiteSlug');
      return;
    }

    let response: AxiosResponse;

    try {
      response = await api.sites.environments.create(state.currentSiteSlug, environment);
    } catch (error) {
      if (get(error, 'response.data.environment.errors')) {
        commit(_consts.mutations.SET_NEW_ENVIRONMENT, error.response.data.environment);
      } else {
        setError(commit, 'create environment', error.message);
      }

      return;
    }

    commit(_consts.mutations.ADD_ENVIRONMENT, response.data.environment);
    commit(_consts.mutations.SET_NEW_ENVIRONMENT, undefined);
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

  [_consts.mutations.SET_NEW_ENVIRONMENT](state: SitesState, environment: Environment) {
    state.newEnvironment = environment;
    return state;
  },

  [_consts.mutations.ADD_ENVIRONMENT](state: SitesState, environment: Environment) {
    state.list = state.list.map((site: Site) => {
      if (site.slug === state.currentSiteSlug) {
        return Object.assign({}, site, { environments: [environment, ...site.environments] });
      }
      return site;
    });
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
