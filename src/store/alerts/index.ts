import {
  MutationTree,
  Module,
} from 'vuex';

import { removeNamespace } from '@/util';

import { RootState } from '../types';
import AlertsState from './types';

import AlertsConstants from './constants';

const _consts = removeNamespace('alerts/', AlertsConstants);

const initialState: AlertsState = {
  error: undefined,
  notice: undefined,
};

const mutations: MutationTree<AlertsState> = {
  [_consts.mutations.SET_ERROR](state: AlertsState, message: string) {
    state.error = message;
    return state;
  },

  [_consts.mutations.SET_NOTICE](state: AlertsState, message: string) {
    state.notice = message;
    return state;
  },
};

const module: Module<AlertsState, RootState> = {
  namespaced: true,
  state: initialState,
  mutations,
};

export default module;
