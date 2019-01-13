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

      b-form-group(
        :invalid-feedback="invalidFeedbackFor('domain')"
        :state="stateFor('domain')"
      )
        b-form-input(
          type="text"
          v-model="site.domain"
          placeholder="Domain"
          :state="stateFor('domain')"
        )

      .modal-footer(slot="modal-footer")
        b-button(variant="light" @click="() => setNew(undefined)") Cancel
        b-button(variant="primary" type="submit" @click="saveAndKeepOpen") Save
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';

import { RootState } from '@/store/types';
import { Site } from '@/store/sites/types';
import SitesConstants from '@/store/sites/constants';
import AlertsConstants from '@/store/alerts/constants';

@Component
export default class SitesForm extends Vue {
  @State((state: RootState) => state.sites.newSite) private site: Site | undefined;

  @Action(SitesConstants.actions.CREATE) private save!: (site: Site) => Promise<void>;

  @Mutation(SitesConstants.mutations.SET_NEW) private setNew!: (site: Site) => void;

  @Mutation(AlertsConstants.mutations.SET_ERROR) private setError!: (message: string) => void;

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

  private invalidFeedbackFor(field: string): string {
    if (!this.site || !this.site.errors || !this.site.errors[field]) { return ''; }
    return this.site.errors[field][0];
  }

  private stateFor(field: string): boolean | undefined {
    if (!this.site || !this.site.errors || !this.site.errors[field]) { return undefined; }
    return this.site.errors[field].length === 0;
  }

  private async saveAndKeepOpen(event: Event) {
    event.preventDefault(); // Prevent modal from closing on OK

    if (!this.site) { return; }
    try {
      await this.save(this.site);
    } catch (error) {
      this.setError('There was a server error saving your site...');
    }
  }
}
</script>

<style scoped lang="sass">
.modal-footer
  padding: 0
</style>
