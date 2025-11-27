import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class JobsTaskResultsContainersGraphRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  async beforeModel() {
    this.taskId = await this.modelFor('jobs.task').id;
  }

  model(params) {
    return this.store.query('data-container', {
      'filter[result-from-tasks][:id:]': this.taskId,
      //this is a little hack
      // we can't use :has: filter oon property in mu-resource
      // Eventually this will be cleaned up if we have inheritance in mu-resource
      'filter[has-graph]': 'http://',
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    });
  }
}
