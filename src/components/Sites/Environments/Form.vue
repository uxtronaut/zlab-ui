<template lang="pug">
b-form(v-if="environment" @submit="save")
  b-row
    b-col
      b-form-group(
        label="Name"
        :invalid-feedback="invalidFeedbackFor('name')"
        :state="stateFor('name')"
      )
        b-form-input(
          v-model="environment.name"
          ref="nameField"
          type="text"
          :state="stateFor('name')"
        )

    b-col
      b-form-group(
        label="Domain"
        :invalid-feedback="invalidFeedbackFor('domain')"
        :state="stateFor('domain')"
      )
        b-form-input(
          v-model="environment.domain"
          type="text"
          :state="stateFor('domain')"
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
import {
  Component,
  Vue,
  Watch,
  Mixins,
} from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';

import { RootState } from '@/store/types';
import { Site, Environment } from '@/store/sites/types';

import SitesConstants from '@/store/sites/constants';

import HasValidations from '../../HasValidations';

@Component
export default class EnvironmentForm extends Mixins(HasValidations) {
  @State((state: RootState) => state.sites.newEnvironment)
  private environment!: Environment;

  @Action(SitesConstants.actions.CREATE_ENVIRONMENT)
  private create!: (environment: Environment) => Promise<void>;

  @Mutation(SitesConstants.mutations.SET_NEW_ENVIRONMENT)
  private setNewEnvironment!: (environment: undefined) => void;

  @Watch('environment')
  onEnvironmentChanged(value: Environment, oldValue: Environment) {
    // @ts-ignore
    if (!oldValue) { this.$nextTick(() => { this.$refs.nameField.focus(); }); }
  }

  protected validationObjectName: string = 'environment';

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
