import { Component, Vue } from 'vue-property-decorator';
import { get } from 'lodash';

@Component
class HasValidations extends Vue {
  protected get validationObject(): { errors: { [index: string]: string[] } } {
    // @ts-ignore
    return get(this, this.validationObjectName);
  }

  protected invalidFeedbackFor(field: string): string | undefined {
    if (get(this, `validationObject.errors.${field}`)) {
      return this.validationObject.errors[field].join(', ');
    }

    return undefined;
  }

  protected stateFor(field: string): boolean | undefined {
    if (get(this, `validationObject.errors.${field}`)) {
      return this.validationObject.errors[field].length === 0;
    }

    return undefined;
  }
}

export default HasValidations;
