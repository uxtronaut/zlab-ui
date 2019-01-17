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
import { ClustersState, Cluster } from './types';

import { setError, setNotice } from '../alerts';
import ClustersConstants from './constants';

const _consts = removeNamespace('clusters/', ClustersConstants);

const initialState: ClustersState = {
  list: [],
  newCluster: undefined,
  currentClusterSlug: undefined,
  flynnReleases: [],
};

const actions: ActionTree<ClustersState, RootState> = {
  async [_consts.actions.LIST]({ commit, dispatch }) {
    let response: AxiosResponse;

    try {
      response = await api.clusters.list();
    } catch (error) {
      setError(dispatch, 'list clusters', error.message);
      return;
    }

    commit(_consts.mutations.SET, response.data.clusters);
  },

  async [_consts.actions.CREATE]({ commit, dispatch }, cluster: Cluster) {
    let response: AxiosResponse;

    return new Promise(async (resolve, reject) => {
      try {
        response = await api.clusters.create(cluster);
      } catch (error) {
        setError(dispatch, 'create cluster', error.message);
        return reject();
      }

      commit(_consts.mutations.ADD, response.data.cluster);
      setNotice(dispatch, 'Cluster deployment queued');
      return resolve(response.data.job_id);
    });
  },

  async [_consts.actions.LIST_FLYNN_RELEASES]({ commit, dispatch }) {
    let response: AxiosResponse;

    try {
      response = await api.flynn.releases();
    } catch (error) {
      setError(dispatch, 'list Flynn releases', error.message);
      return;
    }

    commit(
      _consts.mutations.SET_FLYNN_RELEASES,
      response.data.map((release: any) => release.name),
    );
  },
};

const mutations: MutationTree<ClustersState> = {
  [_consts.mutations.SET](state: ClustersState, clusters: Cluster[]) {
    state.list = clusters;
    return state;
  },

  [_consts.mutations.SET_NEW](state: ClustersState, cluster: Cluster) {
    state.newCluster = cluster;
    return state;
  },

  [_consts.mutations.SET_FLYNN_RELEASES](state: ClustersState, releases: string[]) {
    state.flynnReleases = releases;
    return state;
  },

  [_consts.mutations.ADD](state: ClustersState, cluster: Cluster) {
    state.list = [cluster, ...state.list];
    return state;
  },
};

const getters: GetterTree<ClustersState, RootState> = {

};

const module: Module<ClustersState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export default module;
