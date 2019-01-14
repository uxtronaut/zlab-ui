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
      delete-button(
        v-if="site"
        :name="site.name"
        resourceName="Site"
        variant="md"
        @ok="destroyAndRedirect($event)"
      )/

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
import DeleteButton from '@/components/DeleteButton.vue';

@Component({
  components: {
    'environments-list': EnvironmentsList,
    'delete-button': DeleteButton,
  },
})
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

  private async destroyAndRedirect(): Promise<void> {
    try {
      await this.destroy(this.currentSiteSlug);
    } catch (error) {
      return;
    }
    this.$router.push({ name: 'home' });
  }

  private get site(): Site {
    return this.getSite(this.currentSiteSlug);
  }
}
</script>
