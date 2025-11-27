import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class LogLevelSelectComponent extends Component {
  @service store;

  @tracked options;

  constructor() {
    super(...arguments);

    this.loadOptions.perform();
  }

  get selected() {
    if (this.args.value) {
      return this.store.findRecord('log-level', this.args.value);
    } else {
      return [];
    }
  }

  loadOptions = task(async () => {
    this.options = await this.store.query('log-level', {
      sort: 'label',
    });
  });

  @task *search(term) {
    yield timeout(600);
    return this.store.query('log-level', {
      sort: 'label',
      filter: { label: term },
    });
  }

  @action
  changeSelected(selected) {
    this.args.onChange('logLevelId', selected && selected.id);
  }
}
