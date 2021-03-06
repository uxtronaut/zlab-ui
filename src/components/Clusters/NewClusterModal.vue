<template lang="pug">
b-modal(
  @shown="onShown"
  @hidden="() => { if (cluster) { setNew(undefined); } }"
  ref="modal"
  title="Deploy Cluster"
  cancel-variant="light"
  ok-title="Deploy"
  size="lg"
  :hide-footer="true"
)
  b-form(v-if="cluster")
    section
      h4 Details
      b-form-group(
        label="Name"
        horizontal
      )
        b-form-input(
          ref="nameField"
          type="text"
          v-model="cluster.name"
        )

      b-form-group(
        label="Domain"
        horizontal
      )
        b-form-input(
          type="text"
          v-model="cluster.domain"
        )

      b-form-group(
        label="Deploy Target"
        horizontal
      )
        b-form-select(
          :options="{ esxi: 'ESXi', digitalocean: 'Digital Ocean' }",
          v-model="cluster.deployTarget"
        )

      b-form-group(
        v-if="cluster.deployTarget === 'esxi'"
        label="Deploy Host"
        horizontal
      )
        b-form-select(
          :options="['stampede.aesop.io', 'trample.aesop.io']"
          v-model="cluster.deployHost"
        )

    section
      h4 Nodes

      b-form-group(
        label="Flynn Version"
        horizontal
      )
        b-form-select(
          :options="flynnReleases"
          v-model="cluster.nodeFlynnVersion"
        )

      b-form-group(
        label="Node Count"
        horizontal
      )
        b-form-input(
          type="number"
          v-model="cluster.nodeCount"
        )

      b-form-group(
        v-if="cluster.deployTarget === 'digitalocean'"
        label="Node Size"
        horizontal
      )
        b-form-input(
          type="text"
          v-model="cluster.nodeSize"
        )

      b-form-group(
        v-if="cluster.deployTarget === 'esxi'"
        label="CPU Count"
        horizontal
      )
        b-form-input(
          type="number"
          v-model="cluster.nodeCpus"
        )

      b-form-group(
        v-if="cluster.deployTarget === 'esxi'"
        label="Memory (GB)"
        horizontal
      )
        b-form-input(
          type="number"
          v-model="cluster.nodeMemoryGb"
        )

      b-form-group(
        label="ZPool (GB)"
        horizontal
      )
        b-form-input(
          type="number"
          v-model="cluster.nodeZpoolDriveSizeGb"
        )

    section
      h4 Blob Store

      b-form-group(
        label="AWS Secret Access Key"
        horizontal
      )
        b-form-input(
          type="text"
          v-model="cluster.blobStoreAwsSecretAccessKey"
        )

      b-form-group(
        label="AWS Access Key ID"
        horizontal
      )
        b-form-input(
          type="text"
          v-model="cluster.blobStoreAwsAccessKeyId"
        )

      b-form-group(
        label="AWS Region"
        horizontal
      )
        b-form-input(
          type="text"
          v-model="cluster.blobStoreAwsRegion"
        )

      b-form-group(
        label="AWS Bucket"
        horizontal
      )
        b-form-input(
          type="text"
          v-model="cluster.blobStoreAwsBucket"
        )

    .modal-footer(slot="modal-footer")
      b-button(variant="light" @click="() => setNew(undefined)") Cancel
      b-button(variant="primary" type="submit" @click="saveAndKeepOpen") Deploy
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';

import { RootState } from '@/store/types';
import { Cluster } from '@/store/clusters/types';
import ClustersConstants from '@/store/clusters/constants';

@Component
export default class NewClusterModal extends Vue {
  @State((state: RootState) => state.clusters.newCluster)
  private cluster!: Cluster;

  @State((state: RootState) => state.clusters.flynnReleases)
  private flynnReleases!: string[];

  @State((state: RootState) => state.jobs.newJobId)
  private newJobId!: string;

  @Action(ClustersConstants.actions.LIST_FLYNN_RELEASES)
  private listFlynnReleases!: () => void;

  @Action(ClustersConstants.actions.CREATE)
  private save!: (cluster: Cluster) => Promise<string>;

  @Mutation(ClustersConstants.mutations.SET_NEW)
  private setNew!: (cluster: undefined) => void;

  @Watch('cluster')
  onClusterChanged(value: Cluster | undefined) {
    if (value) {
      // @ts-ignore
      this.$refs.modal.show();
    } else {
      // @ts-ignore
      this.$refs.modal.hide();
    }
  }

  private created() {
    this.listFlynnReleases();
  }

  private onShown() {
    // @ts-ignore
    this.$refs.nameField.focus();

    [this.cluster.nodeFlynnVersion] = this.flynnReleases;
  }

  private async saveAndKeepOpen(event: Event) {
    event.preventDefault(); // Prevent modal from closing on OK

    if (!this.cluster) { return; }
    try {
      const jobId: string = await this.save(this.cluster);
      this.$router.push({ name: 'job', params: { jobId } });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped lang="sass">
section
  margin-bottom: 2rem

  &:last-child
    margin-bottom: 0

  fieldset:last-child
    margin-bottom: 0

.modal-footer
  padding: 0
</style>
