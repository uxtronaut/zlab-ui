<template lang="pug">
b-container
  b-row
    b-col
      h2
        router-link(:to="{ name: 'home' }")
          | Sites
        |
        | / {{ site.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  State,
  Action,
  Mutation,
  Getter,
} from 'vuex-class';

import SitesConstants from '@/store/sites/constants';
import { RootState } from '@/store/types';

@Component
export default class Site extends Vue {
  @State((state: RootState) => state.sites.currentSiteSlug)
  private currentSiteSlug!: string;

  @Action(SitesConstants.actions.FETCH)
  private fetch!: (siteSlug: string) => Promise<void>;

  @Mutation(SitesConstants.mutations.SET_CURRENT_SLUG)
  private setCurrentSlug!: (siteSlug: string) => void;

  @Getter(SitesConstants.getters.getSite)
  private getSite!: (siteSlug: string) => Site;

  created(): void {
    const slug: string = this.$route.params.siteSlug;
    this.fetch(slug).then(() => this.setCurrentSlug(slug));
  }

  private get site(): Site {
    return this.getSite(this.currentSiteSlug);
  }
}
</script>
