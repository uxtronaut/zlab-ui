<template lang="pug">
.clusters
  b-row(align-v="center")
    b-col
      h2 Clusters
    b-col(cols="auto")
      b-button(
        variant="primary"
        @click="setNew(newCluster)"
      )
        | Deploy Cluster
  b-list-group
    b-list-group-item(
      v-for="cluster in clusters"
      :key="cluster.id"
    )
      | {{ cluster.name }}
  new-cluster-modal/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

import { RootState } from '@/store/types';
import { Cluster } from '@/store/clusters/types';

import ClustersConstants from '@/store/clusters/constants';

import NewClusterModal from './NewClusterModal.vue';

@Component({ components: { 'new-cluster-modal': NewClusterModal } })
export default class ClustersList extends Vue {
  @State((state: RootState) => state.clusters.list)
  private clusters!: Cluster[];

  @Mutation(ClustersConstants.mutations.SET_NEW)
  private setNew!: (cluster: Cluster) => Promise<void>;

  private newCluster: Cluster = {
    id: '',
    name: '',
    slug: '',
    domain: '',
    deployTarget: 'digitalocean',
    deployHost: 'trample.aesop.io',
    nodeFlynnVersion: '',
    nodeCount: 3,
    nodeSize: '8gb',
    nodeCpus: 4,
    nodeMemoryGb: 8,
    nodeZpoolDriveSizeGb: 50,
    blobStoreAwsSecretAccessKey: '',
    blobStoreAwsAccessKeyId: '',
    blobStoreAwsRegion: 'us-west-2',
    blobStoreAwsBucket: '',
  };
}
</script>

<style scoped lang="sass">
</style>
