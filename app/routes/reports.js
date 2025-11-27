import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ReportsRoute extends Route {
  @service session;
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  beforeModel(transition) {
    this.session.requireAuthentication(transition);
  }

  model(params) {
    const query = {
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    };

    // TODO: sending an empty filter param to backend returns []
    if (params.filter) {
      query['filter'] = params.filter;
    }

    return this.store.query('report', query);
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
