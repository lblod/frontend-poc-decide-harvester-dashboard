import ENV from 'frontend-dashboard/config/environment';
import { isEnglishAccountsModelEnabled } from '../utils/feature';

export function loadMockAccounts(store, params) {
  const filter = { provider: 'https://github.com/lblod/mock-login-service' };

  if (isEnglishAccountsModelEnabled()) {
    if (ENV['mock-login'].gebruikerfilter !== '{{GEBRUIKER_FILTER}}')
      filter.user = ENV['mock-login'].gebruikerfilter;

    if (params.gemeente) filter.user = { 'family-name': params.gemeente };

    return store.query('account', {
      include: 'user.groups',
      filter,
      page: { size: 10, number: params.page },
      sort: 'user.family-name',
    });
  } else {
    if (ENV['mock-login'].gebruikerfilter !== '{{GEBRUIKER_FILTER}}')
      filter.gebruiker = ENV['mock-login'].gebruikerfilter;

    if (params.gemeente) filter.gebruiker = { achternaam: params.gemeente };

    return store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter,
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }
}
