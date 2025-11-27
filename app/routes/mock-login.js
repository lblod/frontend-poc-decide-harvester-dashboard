import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { loadMockAccounts } from '../utils/mock-login';

export default class MockLoginRoute extends Route {
  @service store;
  @service session;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model(params) {
    return loadMockAccounts(this.store, params);
  }
}
