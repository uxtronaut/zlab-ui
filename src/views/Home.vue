<template lang="pug">
b-container
  b-row
    b-col
      sites-list/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';

import SitesConstants from '@/store/sites/constants';

import SitesList from '@/components/Sites/List.vue';

@Component({ components: { 'sites-list': SitesList } })
export default class Home extends Vue {
  @Action(SitesConstants.actions.FETCH)
  private fetchSites!: () => void;

  @Mutation(SitesConstants.mutations.SET_CURRENT_SLUG)
  private setCurrentSlug!: (siteSlug: undefined) => void;

  private created(): void {
    this.setCurrentSlug(undefined);
    this.fetchSites();
  }
}
</script>
