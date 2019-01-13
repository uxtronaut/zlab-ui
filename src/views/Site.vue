<template lang="pug">
b-container
  b-row(align-v="center")
    b-col
      h2
        router-link(:to="{ name: 'home' }")
          | Sites
        |
        | / {{ site && site.name }}

    b-col(cols="auto")
      b-button(variant="outline-danger" v-b-modal.confirm-delete)
        | Delete Site
      b-modal(
        id="confirm-delete"
        ref="confirmDelete"
        :title="site && 'Really delete ' + site.name + '?'"
        ok-variant="danger"
        ok-title="Delete"
        @ok="destroyAndRedirect"
      )
        | This action cannot be undone...

  b-row
    b-col
      b-card
        environments-list(:siteSlug="currentSiteSlug")/
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

import EnvironmentsList from '@/components/Sites/Environments/List.vue';

@Component({ components: { 'environments-list': EnvironmentsList } })
export default class Site extends Vue {
  @State((state: RootState) => state.sites.currentSiteSlug)
  private currentSiteSlug!: string;

  @Action(SitesConstants.actions.FETCH)
  private fetch!: (siteSlug: string) => Promise<void>;

  @Action(SitesConstants.actions.DESTROY)
  private destroy!: (siteSlug: string) => Promise<void>;

  @Mutation(SitesConstants.mutations.SET_CURRENT_SLUG)
  private setCurrentSlug!: (siteSlug: string) => void;

  @Getter(SitesConstants.getters.getSite)
  private getSite!: (siteSlug: string) => Site;

  private created(): void {
    const slug: string = this.$route.params.siteSlug;
    this.fetch(slug).then(() => this.setCurrentSlug(slug));
  }

  private async destroyAndRedirect(event: Event): Promise<void> {
    event.preventDefault();

    try {
      await this.destroy(this.currentSiteSlug);
      // @ts-ignore
      this.$refs.confirmDelete.hide();
      this.$router.push({ name: 'home' });
    } catch (error) {
      // @ts-ignore
      this.$refs.confirmDelete.hide();
    }
  }

  private get site(): Site {
    return this.getSite(this.currentSiteSlug);
  }
}
</script>
