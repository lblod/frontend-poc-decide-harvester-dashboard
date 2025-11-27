import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session;
  @service router;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  queryParams = {
    page: {
      refreshModel: true,
    },
  };
}
