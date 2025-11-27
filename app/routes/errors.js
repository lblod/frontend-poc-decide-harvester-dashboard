import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ErrorsRoute extends Route {
  @service session;
  @service store;

  queryParams = {
    logLevelId: { refreshModel: true },
    logSourceId: { refreshModel: true },
    logDateFrom: { refreshModel: true },
    logDateTo: { refreshModel: true },
    filter: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  model(params) {
    const query = {
      include: ['log-level', 'log-source'].join(','),
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    };

    if (params.logLevelId) query['filter[log-level][id]'] = params.logLevelId;

    if (params.logSourceId)
      query['filter[log-source][id]'] = params.logSourceId;

    if (params.logDateFrom) query['filter[:gte:datetime]'] = params.logDateFrom;

    if (params.logDateTo) query['filter[:lte:datetime]'] = params.logDateTo;

    return this.store.query('log-entry', query);
  }

  @action
  loading(transition) {
    if (!transition.from || transition.from.name !== this.routeName) {
      // We want the default loading screen if it's the initial page load or when we come from a different route
      return true;
    }

    // eslint-disable-next-line ember/no-controller-access-in-routes
    const controller = this.controller;
    controller.isLoading = true;
    transition.promise.finally(function () {
      controller.isLoading = false;
    });
  }
}
