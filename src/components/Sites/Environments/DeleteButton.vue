<template lang="pug">
div
  b-button(
    @click="confirmDelete"
    variant="outline-danger"
    size="sm"
  )
    | Delete Environment

  b-modal(
    ref="confirmDelete"
    :title="name && 'Really delete ' + name + '?'"
    ok-variant="danger"
    ok-title="Delete"
    @ok="() => { destroy(slug) }"
  )
    | This action cannot be undone...
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import SitesConstants from '@/store/sites/constants';

@Component
export default class DeleteSiteButton extends Vue {
  @Prop(String) private slug!: string;

  @Prop(String) private name!: string;

  @Action(SitesConstants.actions.DESTROY_ENVIRONMENT)
  private destroy!: (environmentSlug: string) => void;

  private confirmDelete(event: Event) {
    event.preventDefault();

    // @ts-ignore
    this.$refs.confirmDelete.show();
  }
}
</script>
