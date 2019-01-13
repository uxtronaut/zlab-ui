<template lang="pug">
.environments
  h3 Environments

  b-button(
    @click="setNewEnvironment({ name: '' })"
    variant="outline-primary"
    size="sm"
  )
    | Add Environment

  environment-form(:siteSlug="siteSlug")/

  p(v-for="env in site.environments" :key="env.slug")
    | {{ env.name }} {{ env.domain }}
    | delete

  p.text-muted(v-if="!newEnvironment && site && !site.environments.length")
    | No configured environments...
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Mutation, Getter } from 'vuex-class';

import SitesConstants from '@/store/sites/constants';

import { Site, Environment } from '@/store/sites/types';

import EnvironmentForm from './Form.vue';
import { RootState } from '@/store/types';

@Component({ components: { 'environment-form': EnvironmentForm } })
export default class EnvironmentsList extends Vue {
  @Prop(String) private siteSlug!: string;

  @State((state: RootState) => state.sites.newEnvironment)
  private newEnvironment!: Environment;

  @Mutation(SitesConstants.mutations.SET_NEW_ENVIRONMENT)
  private setNewEnvironment!: (environment: Environment) => void;

  @Getter(SitesConstants.getters.getSite) private getSite!: (siteSlug: string) => Site;

  private get site(): Site {
    return this.getSite(this.siteSlug);
  }
}
</script>

<style scoped lang="sass">
.btn.btn-outline-primary
  margin-bottom: 1rem
</style>
