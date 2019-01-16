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
import { JobsState, Job } from './types';

import { setError, setNotice } from '../alerts';
import JobsConstants from './constants';

const _consts = removeNamespace('jobs/', JobsConstants);

const initialState: JobsState = {
  list: [],
  currentJobId: undefined,
};

const actions: ActionTree<JobsState, RootState> = {
  async [_consts.actions.LIST]({ commit, dispatch }) {
    let response: AxiosResponse;

    try {
      response = await api.jobs.list();
    } catch (error) {
      setError(dispatch, 'list jobs', error.message);
      return;
    }

    commit(_consts.mutations.SET, response.data.jobs);
  },
};

const mutations: MutationTree<JobsState> = {
  [_consts.mutations.SET](state: JobsState, jobs) {
    state.list = jobs;
    return state;
  },

  [_consts.mutations.SET_CURRENT_ID](state: JobsState, jobId: string) {
    state.currentJobId = jobId;
    return state;
  },
};

const getters: GetterTree<JobsState, RootState> = {
  [_consts.getters.getJob]: (state: JobsState) => (jobId: string) => state.list
    .filter((job: Job) => job.id === jobId)[0],
};

const module: Module<JobsState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export default module;
