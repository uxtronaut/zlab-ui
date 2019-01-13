<template lang="pug">
.environments
  h3 Environments

  b-list-group(v-if="site")
    b-list-group-item(
      v-for="env in site.environments"
      :key="env.slug"
    )
      b-row
        b-col
          h4 {{ env.name }}
        b-col(cols="auto")
          delete-button(:slug="env.slug" :name="env.name")/

      code {{ env.domain }}

  p.text-muted(v-if="!newEnvironment && site && !site.environments.length")
    | No configured environments...

  environment-form(:siteSlug="siteSlug")/

  b-button(
    @click="setNewEnvironment({ name: '' })"
    variant="outline-primary"
    size="sm"
  )
    | Add Environment
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State,
  Mutation,
  Getter,
} from 'vuex-class';

import { RootState } from '@/store/types';
import { Site, Environment } from '@/store/sites/types';

import SitesConstants from '@/store/sites/constants';

import EnvironmentForm from './Form.vue';
import DeleteButton from './DeleteButton.vue';

@Component({
  components: {
    'environment-form': EnvironmentForm,
    'delete-button': DeleteButton,
  },
})
export default class EnvironmentsList extends Vue {
  @Prop(String) private siteSlug!: string;

  @State((state: RootState) => state.sites.newEnvironment)
  private newEnvironment!: Environment;

  @Mutation(SitesConstants.mutations.SET_NEW_ENVIRONMENT)
  private setNewEnvironment!: (environment: Environment) => void;

  @Getter(SitesConstants.getters.getSite) private getSite!: (siteSlug: string) => Site;

  private get site(): Site { return this.getSite(this.siteSlug); }
}
</script>

<style scoped lang="sass">
.btn.btn-outline-primary
  margin-bottom: 1rem
</style>
