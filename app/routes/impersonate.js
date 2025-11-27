import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ImpersonateRoute extends Route {
  @service currentSession;
  @service router;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');

    if (!this.currentSession.isAdmin) {
      this.router.replaceWith('index');
    }
  }
}
