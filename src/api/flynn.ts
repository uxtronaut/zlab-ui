import axios, { AxiosResponse } from 'axios';

const TAGS_URL: string = 'https://api.github.com/repos/flynn/flynn/tags';

export default {
  releases() {
    return axios.get(TAGS_URL);
  },
};
