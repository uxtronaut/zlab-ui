<template lang="pug">
b-list-group
  b-list-group-item(
    v-for="job in jobs"
    :key="job.id"
    :to="{ name: 'job', params: { jobId: job.id } }"
  )
    b-row
      b-col(cols="auto")
        Icon(v-if="job.erroredAt" icon="times" class="text-danger")
        Icon(v-if="job.finishedAt" icon="check" class="text-success")
        Icon(v-if="!job.erroredAt && !job.finishedAt" icon="spinner" spin)
      b-col
        | {{ job.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import JobsConstants from '@/store/jobs/constants';
import { RootState } from '@/store/types';
import { Job } from '@/store/jobs/types';

@Component
export default class JobsList extends Vue {
  @State((state: RootState) => state.jobs.list)
  private jobs!: Job[];
}
</script>

<style scoped lang="sass">
</style>
