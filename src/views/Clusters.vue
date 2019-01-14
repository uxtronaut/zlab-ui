<template lang="pug">
b-container
  b-row(align-v="center")
    b-col
      clusters-list/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import ClustersList from '@/components/Clusters/List.vue';
import ClustersConstants from '@/store/clusters/constants';

@Component({
  components: {
    'clusters-list': ClustersList,
  },
})
export default class Clusters extends Vue {
  @Action(ClustersConstants.actions.LIST)
  private listClusters!: () => void;

  private created() {
    this.listClusters();
  }
}
</script>

<style scoped lang="sass">
</style>
