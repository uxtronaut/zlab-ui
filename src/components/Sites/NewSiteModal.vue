<template lang="pug">
div
  b-modal(
    @shown="() => { $refs.siteNameField.focus(); }"
    @hidden="() => { if (site) { setNew(undefined) } }"
    :hide-footer="true"
    title="New Site"
    ref="modal"
  )
    b-form(v-if="site" @submit="saveAndKeepOpen")
      b-form-group(
        :invalid-feedback="invalidFeedbackFor('name')"
        :state="stateFor('name')"
      )
        b-form-input(
          ref="siteNameField"
          type="text"
          v-model="site.name"
          placeholder="Name"
          :state="stateFor('name')"
        )

      .modal-footer(slot="modal-footer")
        b-button(variant="light" @click="() => setNew(undefined)") Cancel
        b-button(variant="primary" type="submit" @click="saveAndKeepOpen") Save
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
import { Site } from '@/store/sites/types';

import SitesConstants from '@/store/sites/constants';
import AlertsConstants from '@/store/alerts/constants';

import HasValidations from '../HasValidations';

@Component
export default class NewSiteModal extends Mixins(HasValidations) {
  @State((state: RootState) => state.sites.newSite) protected site: Site | undefined;

  @Action(SitesConstants.actions.CREATE) private save!: (site: Site) => Promise<void>;

  @Mutation(SitesConstants.mutations.SET_NEW) private setNew!: (site: Site) => void;

  @Watch('site')
  onSiteChanged(value: Site) {
    if (value) {
      // @ts-ignore
      this.$refs.modal.show();
    } else {
      // @ts-ignore
      this.$refs.modal.hide();
    }
  }

  protected validationObjectName: string = 'site';

  private async saveAndKeepOpen(event: Event) {
    event.preventDefault(); // Prevent modal from closing on OK

    if (!this.site) { return; }
    await this.save(this.site);
  }
}
</script>

<style scoped lang="sass">
.modal-footer
  padding: 0
</style>
