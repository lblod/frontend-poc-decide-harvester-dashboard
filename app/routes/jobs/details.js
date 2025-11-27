import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class JobsDetailsRoute extends Route {
  @service intl;
  @service store;

  beforeModel() {
    // Simply accessing the service works around this issue: https://github.com/ember-intl/ember-intl/issues/1826
    // We do it in the engine code, so apps aren't forced to do it when they might not even be using ember-intl.
    // TODO: remove this once the issue is fixed upstream
    this.intl;
  }

  model(param) {
    return this.store.findRecord('job', param.id);
  }
}
