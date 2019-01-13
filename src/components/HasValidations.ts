import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { Site } from '@/store/sites/types';

import { RootState } from '@/store/types';

@Component
class HasValidations extends Vue {
  protected get validationObject() {
    // @ts-ignore
    return this[this.validationObjectName];
  }

  protected invalidFeedbackFor(field: string): string {
    // @ts-ignore
    if (
      !this.validationObject
      || !this.validationObject.errors
      || !this.validationObject.errors[field]
    ) {
      return '';
    }
    return this.validationObject.errors[field][0];
  }

  protected stateFor(field: string): boolean | undefined {
    if (
      !this.validationObject
      || !this.validationObject.errors
      || !this.validationObject.errors[field]
    ) { return undefined; }
    return this.validationObject.errors[field].length === 0;
  }
}

export default HasValidations;
