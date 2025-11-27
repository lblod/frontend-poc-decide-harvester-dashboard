import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class JobsIndexRoute extends Route {
  @service intl;
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  beforeModel() {
    // Simply accessing the service works around this issue: https://github.com/ember-intl/ember-intl/issues/1826
    // We do it in the engine code, so apps aren't forced to do it when they might not even be using ember-intl.
    // TODO: remove this once the issue is fixed upstream
    this.intl;
  }

  model(params) {
    const query = {
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    };

    if (params.creatorValue) {
      query['filter[creator]'] = params.creatorValue;
    }

    if (params.operationValue) {
      query['filter[operation]'] = params.operationValue;
    }

    return this.store.query('job', query);
  }
}
