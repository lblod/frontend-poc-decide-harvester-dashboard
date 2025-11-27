import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CreatorFilterComponent extends Component {
  @action
  onChange(event) {
    this.args.onChange(event.target.value);
  }
}
