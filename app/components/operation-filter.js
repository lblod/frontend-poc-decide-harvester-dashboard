import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class OperationFilterComponent extends Component {
  @action
  onChange(event) {
    this.args.onChange(event.target.value);
  }
}
