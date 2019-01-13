<template lang="pug">
.sites
  b-row(align-v="center")
    b-col
      h2 Sites
    b-col(cols="auto")
      b-button(
        variant="primary"
        @click="newSite({ name: '', domain: '' })"
      )
        | New Site

  b-list-group
    b-list-group-item(
      v-for="site in sites"
      :key="site._id"
      :to="{ name: 'sites', params: { siteSlug: site.slug } }"
    )
      | {{ site.name }}

  sites-form/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

import { RootState } from '@/store/types';
import { Site } from '@/store/sites/types';
import SitesConstants from '@/store/sites/constants';

import SitesForm from './NewSiteModal.vue';

@Component({ components: { 'sites-form': SitesForm } })
export default class SitesList extends Vue {
  @State((state: RootState) => state.sites.list) private sites!: Site[];

  @Mutation(SitesConstants.mutations.SET_NEW) private newSite!: void;
}
</script>
