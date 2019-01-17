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
import { JobsState, Job, JobOutputMessage } from './types';

import { setError, setNotice } from '../alerts';
import JobsConstants from './constants';

const _consts = removeNamespace('jobs/', JobsConstants);

const initialState: JobsState = {
  list: [],
  currentJobId: undefined,
  newJobId: undefined,
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

  async [_consts.actions.FETCH]({ commit, dispatch }, jobId: string) {
    let response: AxiosResponse;

    try {
      response = await api.jobs.fetch(jobId);
    } catch (error) {
      setError(dispatch, 'fetch job', error.message);
      return;
    }

    commit(_consts.mutations.SET, [response.data.job]);
  },

  [_consts.actions.UPDATE_LOG]({ commit, dispatch, getters }, message: JobOutputMessage) {
    commit(_consts.mutations.APPEND_LOG, message);
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

  [_consts.mutations.APPEND_LOG](state: JobsState, message: JobOutputMessage) {
    state.newJobId = message.jobId;

    state.list = state.list.map((job: Job) => {
      if (job.id === message.jobId) {
        return Object.assign({}, job, { log: [message.content, ...job.log] });
      }
      return job;
    });

    return state;
  },
};

const getters: GetterTree<JobsState, RootState> = {
  [_consts.getters.getJob]: (state: JobsState) => (jobId: string) => {
    if (!state.list) { return undefined; }

    return state.list.filter((job: Job) => job.id === jobId)[0];
  },
};

const module: Module<JobsState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

export default module;
