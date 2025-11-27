import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class JobsDetailsIndexRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  async beforeModel() {
    this.job = await this.modelFor('jobs.details').id;
  }

  model(params) {
    return this.store.query('task', {
      include: 'job',
      'filter[job][:id:]': this.job,
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    });
  }
}
