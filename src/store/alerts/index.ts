import {
  MutationTree,
  Module,
  ActionTree,
  Dispatch,
} from 'vuex';

import { removeNamespace } from '@/util';

import { RootState } from '../types';
import AlertsState from './types';

import AlertsConstants from './constants';

const ERROR_TIMEOUT: number = 1000 * 2;
const NOTICE_TIMEOUT: number = 1000 * 2;

const _consts = removeNamespace('alerts/', AlertsConstants);

const initialState: AlertsState = {
  error: undefined,
  notice: undefined,
};

const actions: ActionTree<AlertsState, RootState> = {
  [_consts.actions.ERROR]({ commit }, message: string) {
    commit(_consts.mutations.SET_ERROR, message);

    setTimeout(
      () => { commit(_consts.mutations.SET_ERROR, undefined); },
      ERROR_TIMEOUT,
    );
  },

  [_consts.actions.NOTICE]({ commit }, message: string) {
    commit(_consts.mutations.SET_NOTICE, message);

    setTimeout(
      () => { commit(_consts.mutations.SET_NOTICE, undefined); },
      NOTICE_TIMEOUT,
    );
  },
};

const mutations: MutationTree<AlertsState> = {
  [_consts.mutations.SET_ERROR](state: AlertsState, message: string | undefined) {
    state.error = message;
    return state;
  },

  [_consts.mutations.SET_NOTICE](state: AlertsState, message: string | undefined) {
    state.notice = message;
    return state;
  },
};

export const module: Module<AlertsState, RootState> = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
};

export const setError = (dispatch: Dispatch, action: string, error: string): void => {
  dispatch(
    AlertsConstants.actions.ERROR,
    `Failed to ${action}. (${error})`,
    { root: true },
  );
};

export const setNotice = (dispatch: Dispatch, message: string): void => {
  dispatch(AlertsConstants.actions.NOTICE, message, { root: true });
};
