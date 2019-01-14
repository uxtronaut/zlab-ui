<template lang="pug">
div
  b-button(
    @click="confirm"
    variant="outline-danger"
    size="sm"
  )
    | Delete {{ resourceName }}

  b-modal(
    ref="confirmation"
    :title="name && 'Really delete ' + name + '?'"
    ok-variant="danger"
    ok-title="Delete"
    cancel-variant="light"
    @ok="confirmed"
  )
    | This action cannot be undone...
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import SitesConstants from '@/store/sites/constants';

@Component
export default class DeleteButton extends Vue {
  @Prop(String) private name!: string;

  @Prop(String) private resourceName!: string;

  private confirm() {
    // @ts-ignore
    this.$refs.confirmation.show();
  }

  private confirmed(event: Event) {
    event.preventDefault();
    // @ts-ignore
    this.$refs.confirmation.hide();
    setTimeout(() => this.$emit('ok'), 333);
  }
}
</script>
