import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer(`ws://${process.env.VUE_APP_API_ROOT}/cable`);

cable.subscriptions.create('JobOutputChannel', {
  connected: () => {
    console.log('ayyyyy!!!');
  },

  disconnected: () => {
    console.log('awwww');
  },

  received: (message: any) => {
    console.log(message);
  },
});

export default cable;
