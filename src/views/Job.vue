<template lang="pug">
b-container
  b-row(align-v="center")
    b-col
      h2 {{ job.name }}
  b-row
    b-col
      b-card
        code {{ job.log }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import{ RootState } from '@/store/types';
import JobsConstants from '@/store/jobs/constants';
import { Job } from '@/store/jobs/types';

@Component
export default class JobPage extends Vue {
  @Getter(JobsConstants.getters.getJob)
  private getJob!: (jobId: string) => Promise<Job>

  private get currentJobId() {
    return this.$router.currentRoute.params.jobId;
  }

  private get job() {
    return this.getJob(this.currentJobId);
  }

  created() {
    this.$store.commit(
      JobsConstants.mutations.SET_CURRENT_ID,
      this.currentJobId,
    );
  }
}
</script>

<style scoped lang="sass">
</style>
