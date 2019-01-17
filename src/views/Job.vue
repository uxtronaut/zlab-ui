<template lang="pug">
b-container
  b-row(align-v="center")
    b-col
      h2 {{ job && job.name }}
  b-row
    b-col
      b-card
        pre {{ job && job.log }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { RootState } from '@/store/types';
import JobsConstants from '@/store/jobs/constants';
import { Job } from '@/store/jobs/types';

@Component
export default class JobPage extends Vue {
  @Action(JobsConstants.actions.FETCH)
  private fetchJob!: (jobId: string) => Promise<Job>;

  @Getter(JobsConstants.getters.getJob)
  private getJob!: (jobId: string) => Promise<Job>;

  private get currentJobId() {
    return this.$router.currentRoute.params.jobId;
  }

  private get job() {
    return this.getJob(this.currentJobId);
  }

  async created() {
    await this.fetchJob(this.currentJobId);
    this.$store.commit(
      JobsConstants.mutations.SET_CURRENT_ID,
      this.currentJobId,
    );
  }
}
</script>

<style scoped lang="sass">
.card, pre
  background-color: black
  color: white
</style>
