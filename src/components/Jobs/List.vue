<template lang="pug">
b-list-group
  b-list-group-item(
    v-for="job in jobs"
    :key="job.id"
    :to="{ name: 'job', params: { jobId: job.id } }"
  )
    | {{ job.name }} {{ job.erroredAt }} {{ job.finishedAt }}
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