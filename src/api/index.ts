import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

import flynn from './flynn';
import cable from './cable';

import { Site, Environment } from '@/store/sites/types';
import { Cluster } from '@/store/clusters/types';

const http: AxiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_PROTOCOL}://${process.env.VUE_APP_API_ROOT}/api`,
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
  flynn,
  cable,
  sites: {
    list(): Promise<AxiosResponse> {
      return http.get('/sites');
    },
    fetch(siteSlug: string): Promise<AxiosResponse> {
      return http.get(`/sites/${siteSlug}`);
    },
    create(site: Site): Promise<AxiosResponse> {
      return http.post('/sites', { site });
    },
    destroy(siteSlug: string): Promise<AxiosResponse> {
      return http.delete(`/sites/${siteSlug}`);
    },
    environments: {
      create(siteSlug: string, environment: Environment): Promise<AxiosResponse> {
        return http.post(`/sites/${siteSlug}/environments`, { environment });
      },
      destroy(siteSlug: string, environmentSlug: string): Promise<AxiosResponse> {
        return http.delete(`/sites/${siteSlug}/environments/${environmentSlug}`);
      },
    },
  },
  clusters: {
    list(): Promise<AxiosResponse> {
      return http.get('/clusters');
    },
    fetch(clusterSlug: string): Promise<AxiosResponse> {
      return http.get(`/clusters/${clusterSlug}`);
    },
    create(cluster: Cluster): Promise<AxiosResponse> {
      return http.post('/clusters', { cluster });
    },
    update(cluster: Cluster): Promise<AxiosResponse> {
      return http.put(`/clusters/${cluster.slug}`, { cluster });
    },
    destroy(clusterSlug: string): Promise<AxiosResponse> {
      return http.delete(`/clusters/${clusterSlug}`);
    },
  },
  jobs: {
    list(): Promise<AxiosResponse> {
      return http.get('/jobs');
    },
  },
};
