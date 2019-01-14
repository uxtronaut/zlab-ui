<template lang="pug">
.alerts
  b-alert(v-if="error" show variant="danger")
    .container
      .row
        .col
          | {{ error }}
  b-alert(v-if="notice" show variant="success")
    .container
      .row
        .col
          | {{ notice }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { RootState } from '@/store/types';

@Component
export default class Alerts extends Vue {
  @State((state: RootState) => state.alerts.error) error!: string | undefined;

  @State((state: RootState) => state.alerts.notice) notice!: string | undefined;
}
</script>

<style scoped lang="sass">
.alerts
  position: absolute
  width: 100%
  bottom: 0
  z-index: 2

  .alert
    margin-bottom: 0
</style>
