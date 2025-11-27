import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class JobsTaskResultRoute extends Route {
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
    return this.store.query('file', {
      'filter[data-container][result-from-tasks][:id:]': this.taskId,
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    });
  }
}
