import Controller from '@ember/controller';
import { service } from '@ember/service';
import { cached, tracked } from '@glimmer/tracking';
import { restartableTask, task, timeout } from 'ember-concurrency';
import ENV from 'frontend-dashboard/config/environment';

export default class ImpersonateController extends Controller {
  @service impersonation;
  @service router;
  @service store;

  queryParams = ['search', 'page'];
  @tracked search = '';
  @tracked page = 0;
  size = 10;

  @cached
  get accountsPromise() {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };

    if (ENV['mock-login'].gebruikerfilter !== '{{GEBRUIKER_FILTER}}')
      filter.gebruiker = ENV['mock-login'].gebruikerfilter;

    if (this.search.trim()) {
      filter.gebruiker = { achternaam: this.search.trim() };
    }

    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter,
      page: { size: this.size, number: this.page },
      sort: 'gebruiker.achternaam',
    });
  }

  updateSearch = restartableTask(async (event) => {
    await timeout(500);
    this.search = event.target.value;
    this.page = 0;
  });

  impersonateAccount = task(async (accountId) => {
    await this.impersonation.impersonate(accountId);

    const indexUrl = this.router.urlFor('index');
    // We do a hard redirect so any previously loaded data is removed from the EmberData store
    window.location.href = indexUrl;
  });
}
