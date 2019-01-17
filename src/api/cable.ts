import ActionCable from 'actioncable';
import { camelizeKeys } from 'humps';
import store from '@/store';
import JobsConstants from '@/store/jobs/constants';

const cable = ActionCable.createConsumer(`ws://${process.env.VUE_APP_API_ROOT}/cable`);

cable.subscriptions.create('JobOutputChannel', {
  connected: () => {
  },

  disconnected: () => {
  },

  received: (rawMessage: any) => {
    const message = camelizeKeys(rawMessage);
    store.dispatch(JobsConstants.actions.UPDATE_LOG, message);
  },
});

export default cable;
