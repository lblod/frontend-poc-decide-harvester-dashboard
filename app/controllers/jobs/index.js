import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, restartableTask, timeout } from 'ember-concurrency';
import { service } from '@ember/service';

export default class JobsIndexController extends Controller {
  @service store;

  size = 15;

  @tracked sort = '-created';
  @tracked page = 0;
  @tracked creatorValue = '';
  @tracked operationValue = '';

  queryParams = ['creatorValue', 'operationValue', 'page', 'size', 'sort'];

  get isFiltering() {
    return !!(this.creatorValue !== '' || this.operationValue !== '');
  }

  @action
  resetFilter() {
    this.creatorValue = '';
    this.operationValue = '';
    this.sort = '-created';
    this.page = 0;
    this.updateSearch.perform();
  }

  @action
  handleCreatorChange(value) {
    this.creatorValue = value;

    this.updateSearch.perform();
  }

  @action
  handleOperationChange(value) {
    this.operationValue = value;

    this.updateSearch.perform();
  }

  @task
  *queryStore() {
    const filter = {};

    if (this.creatorValue) filter.creator = this.creatorValue;
    if (this.operationValue) filter.operation = this.operationValue;

    const jobs = yield this.store.query('job', {
      page: { size: this.size, number: this.page },
      filter: filter,
      sort: this.sort,
    });
    return jobs;
  }

  @restartableTask
  *updateSearch() {
    yield timeout(500);
    this.page = 0;
    const model = yield this.queryStore.perform();
    this.model = model;
  }
}
