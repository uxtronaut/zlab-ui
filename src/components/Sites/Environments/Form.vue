<template lang="pug">
b-form(v-if="environment" @submit="save")
  b-row
    b-col
      b-form-group(label="Name")
        b-form-input(
          v-model="environment.name"
          ref="nameField"
          type="text"
        )

    b-col
      b-form-group(label="Domain")
        b-form-input(
          v-model="environment.domain"
          type="text"
        )

    b-col(cols="auto")
      .actions
        b-button(
          variant="light"
          @click="setNewEnvironment(undefined)"
        )
          | Cancel
        b-button(
          @click="save"
          variant="primary"
        )
          | Save
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';

import { RootState } from '@/store/types';
import { Site, Environment } from '@/store/sites/types';

import SitesConstants from '@/store/sites/constants';

@Component
export default class EnvironmentForm extends Vue {
  @State((state: RootState) => state.sites.newEnvironment)
  private environment!: Environment;

  @Mutation(SitesConstants.mutations.SET_NEW_ENVIRONMENT)
  private setNewEnvironment!: (environment: undefined) => void;

  @Action(SitesConstants.actions.CREATE_ENVIRONMENT)
  private create!: (environment: Environment) => Promise<void>;

  @Watch('environment')
  onEnvironmentChanged(value: Environment) {
    // @ts-ignore
    if (value) { this.$nextTick(() => { this.$refs.nameField.focus(); }); }
  }

  private save(event: Event): void {
    event.preventDefault();
    this.create(this.environment);
  }
}
</script>

<style scoped lang="sass">
.actions
  margin-top: 30.3px

  .btn.btn-primary
    margin-left: 1rem
</style>
