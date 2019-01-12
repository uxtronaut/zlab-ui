import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { Site } from '@/store/sites/types';

const http: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformResponse: [
    // @ts-ignore
    ...axios.defaults.transformResponse,
    (data: any) => camelizeKeys(data),
  ],
  transformRequest: [
    (data: any) => decamelizeKeys(data),
    // @ts-ignore
    ...axios.defaults.transformRequest,
  ],
});

export default {
  sites: {
    fetch(siteSlug?: string): Promise<AxiosResponse> {
      if (arguments.length === 0) { return http.get('/sites'); }
      return http.get(`/sites/${siteSlug}`);
    },
    create(site: Site): Promise<AxiosResponse> {
      return http.post('/sites', site);
    },
  },
};
