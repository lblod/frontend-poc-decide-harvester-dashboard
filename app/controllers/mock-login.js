import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { task, restartableTask } from 'ember-concurrency';
import { service } from '@ember/service';
import { isEnglishAccountsModelEnabled } from '../utils/feature';
import { loadMockAccounts } from '../utils/mock-login';

export default class MockLoginController extends Controller {
  queryParams = ['gemeente', 'page'];
  @service store;
  @tracked gemeente = '';
  @tracked page = 0;
  @tracked size = 10;
  isEnglishAccountsModelEnabled = isEnglishAccountsModelEnabled();

  @task
  *queryStore() {
    return yield loadMockAccounts(this.store, {
      gemeente: this.gemeente,
      page: this.page,
    });
  }

  @restartableTask
  *updateSearch(value) {
    yield timeout(500);
    this.page = 0;
    this.gemeente = value;
    this.model = yield this.queryStore.perform();
  }
}
