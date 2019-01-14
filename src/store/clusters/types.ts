export interface Cluster {
  id: string;
  slug: string;
  name: string;
  domain: string;
  deployTarget?: string;
  deployHost: string,
  nodeCount: number;
  nodeSize?: string;
  nodeCpus?: number;
  nodeMemoryGb?: number;
  nodeZpoolDriveSizeGb?: number;
  nodeFlynnVersion: string;
  tlsPin?: string;
  privateKey?: string;
  controllerUrl?: string;
  gitPushUrl?: string;
  dockerPushUrl?: string;
  dashboardPin?: string;
  blobStoreAwsSecretAccessKey: string;
  blobStoreAwsAccessKeyId: string;
  blobStoreAwsRegion: string;
  blobStoreAwsBucket: string;
}

export interface ClustersState {
  list: Cluster[];
  newCluster: Cluster | undefined;
  currentClusterSlug: string | undefined;
  flynnReleases: string[];
}
