<template lang="pug">
b-container
  b-row(align-v="center")
    b-col
      h2 Jobs
      jobs-list/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import JobsList from '@/components/Jobs/List.vue';
import JobsConstants from '@/store/jobs/constants';

@Component({ components: { 'jobs-list': JobsList } })
export default class Jobs extends Vue {
  @Action(JobsConstants.actions.LIST)
  private listJobs!: () => Promise<void>;

  private created(): void {
    console.log('arrr');
    this.listJobs();
  }
}
</script>

<style scoped lang="sass">
</style>
