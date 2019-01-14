import { AxiosResponse } from 'axios';
import { get } from 'lodash';

import {
  ActionTree,
  MutationTree,
  GetterTree,
  Module,
} from 'vuex';

import api from '@/api/index';
import { removeNamespace } from '@/util';

import { RootState } from '../types';
import { SitesState, Site, Environment } from './types';

import { setError, setNotice } from '../alerts';
import SitesConstants from './constants';

const _consts = removeNamespace('sites/', SitesConstants);

const initialState: SitesState = {
  list: [],
  newSite: undefined,
  newEnvironment: undefined,
  currentSiteSlug: undefined,
};

const actions: ActionTree<SitesState, RootState> = {
  async [_consts.actions.LIST]({ commit, dispatch }) {
    let response: AxiosResponse;

    try {
      response = await api.sites.list();
    } catch (error) {
      setError(dispatch, 'list sites', error.message);
      return;
    }

    commit(_consts.mutations.SET, response.data.sites);
  },

  async [_consts.actions.FETCH]({ commit, dispatch }, siteSlug: string) {
    let response: AxiosResponse;

    try {
      response = await api.sites.fetch(siteSlug);
    } catch (error) {
      setError(dispatch, 'fetch site', error.message);
      return;
    }

    commit(_consts.mutations.SET, [response.data.site]);
  },

  async [_consts.actions.CREATE]({ commit, dispatch }, site: Site) {
    let response: AxiosResponse;

    try {
      response = await api.sites.create(site);
    } catch (error) {
      if (get(error, 'response.data.site.errors')) {
        commit(_consts.mutations.SET_NEW, error.response.data.site);
      } else {
        setError(dispatch, 'create site', error.message);
      }

      return;
    }

    commit(_consts.mutations.ADD, response.data.site);
    commit(_consts.mutations.SET_NEW, undefined);
    setNotice(dispatch, 'Site created');
  },

  async [_consts.actions.DESTROY]({ commit, dispatch }, siteSlug: string) {
    // Promise because we need to resolve and redirect home after site
    // is deleted, or reject and stay put after server/connection error
    return new Promise(async (resolve, reject) => {
      try {
        await api.sites.destroy(siteSlug);
      } catch (error) {
        setError(dispatch, 'delete site', error.message);
        return reject();
      }

      commit(_consts.mutations.REMOVE, siteSlug);
      setNotice(dispatch, 'Site deleted');
      return resolve();
    });
  },

  async [_consts.actions.CREATE_ENVIRONMENT](
    { commit, dispatch, state },
    environment: Environment,
  ) {
    if (!state.currentSiteSlug) {
      setError(dispatch, 'create environment', 'undefined currentSiteSlug');
      return;
    }

    let response: AxiosResponse;

    try {
      response = await api.sites.environments.create(state.currentSiteSlug, environment);
    } catch (error) {
      if (get(error, 'response.data.environment.errors')) {
        commit(_consts.mutations.SET_NEW_ENVIRONMENT, error.response.data.environment);
      } else {
        setError(dispatch, 'create environment', error.message);
      }

      return;
    }

    commit(_consts.mutations.ADD_ENVIRONMENT, response.data.environment);
    commit(_consts.mutations.SET_NEW_ENVIRONMENT, undefined);
    setNotice(dispatch, 'Environment created');
  },

  async [_consts.actions.DESTROY_ENVIRONMENT](
    { commit, dispatch, state },
    environmentSlug: string,
  ) {
    if (!state.currentSiteSlug) {
      setError(dispatch, 'create environment', 'undefined currentSiteSlug');
      return;
    }

    try {
      await api.sites.environments.destroy(state.currentSiteSlug, environmentSlug);
    } catch (error) {
      setError(dispatch, 'delete environment', error.message);
      return;
    }

    commit(_consts.mutations.REMOVE_ENVIRONMENT, environmentSlug);
    setNotice(dispatch, 'Environment deleted');
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

  [_consts.mutations.REMOVE_ENVIRONMENT](state: SitesState, environmentSlug: string) {
    state.list = state.list.map((site: Site) => {
      if (site.slug === state.currentSiteSlug) {
        return Object.assign(
          {},
          site,
          {
            environments: site.environments
              .filter((environment: Environment) => environment.slug !== environmentSlug),
          },
        );
      }
      return site;
    });
    return state;
  },
};

const getters: GetterTree<SitesState, RootState> = {
  [_consts.getters.getSite]: (state: SitesState) => (siteSlug: string): Site => state.list
    .filter((site: Site) => site.slug === siteSlug)[0],
};

const module: Module<SitesState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export default module;
