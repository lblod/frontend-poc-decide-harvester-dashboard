import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ErrorsController extends Controller {
  sort = '-datetime';
  page = 0;
  size = 15;

  queryParams = [
    'logLevelId',
    'logSourceId',
    'logDateFrom',
    'logDateTo',
    'sort',
    'page',
    'size',
  ];

  @tracked logLevelId = null;
  @tracked logSourceId = null;
  @tracked logDateFrom = null;
  @tracked logDateTo = null;
  @tracked isLoading = false;

  get isFiltering() {
    return !!(
      this.logLevelId ||
      this.logSourceId ||
      this.logDateFrom ||
      this.logDateTo
    );
  }

  @action
  updateParam(name, value) {
    this[name] = value;
  }

  @action
  resetFilter() {
    this.queryParams.forEach((param) => {
      this[param] = null;
    });
  }
}
