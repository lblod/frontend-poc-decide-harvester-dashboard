import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'frontend-dashboard/config/environment';
import { isEnglishAccountsModelEnabled } from 'frontend-dashboard/utils/feature';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;
  @service impersonation;

  @tracked account;
  @tracked group;

  get isLoaded() {
    return Boolean(this.account);
  }

  get user() {
    return isEnglishAccountsModelEnabled()
      ? this.account.user
      : this.account.gebruiker;
  }

  get groupClassification() {
    return this.group.classificatie;
  }

  get _roles() {
    return this.isLoaded
      ? this.session.data.authenticated.data.attributes.roles
      : [];
  }

  async load() {
    if (this.session.isAuthenticated && !this.isLoaded) {
      if (!ENV.adminRole.startsWith('{{')) {
        await this.impersonation.load();
      }

      let accountId =
        this.session.data.authenticated.relationships?.account?.data?.id;

      const groupId =
        this.session.data.authenticated.relationships?.group?.data?.id;

      if (accountId && groupId) {
        const accountPromises = isEnglishAccountsModelEnabled()
          ? [
              this.store.findRecord('account', accountId, {
                include: 'user',
              }),
              // We need to do an extra API call here because ACM/IDM users don't seem to have a "bestuurseenheden" relationship in the DB.
              // By fetching the record directly we bypass that issue
              this.store.findRecord('group', groupId, {
                reload: true,
              }),
            ]
          : [
              this.store.findRecord('account', accountId, {
                include: 'gebruiker.bestuurseenheden.classificatie',
              }),
              // We need to do an extra API call here because ACM/IDM users don't seem to have a "bestuurseenheden" relationship in the DB.
              // By fetching the record directly we bypass that issue
              this.store.findRecord('bestuurseenheid', groupId, {
                include: 'classificatie',
                reload: true,
              }),
            ];

        const [account, group] = await Promise.all(accountPromises);

        this.account = account;
        this.group = group;
      }
    }
  }

  get isAdmin() {
    if (!this.isLoaded) {
      return false;
    }

    let adminRole = ENV.adminRole;
    if (adminRole.startsWith('{{')) {
      return false;
    }

    let roles = this._roles;
    if (this.impersonation.isImpersonating) {
      roles = this.impersonation.originalRoles || [];
    }

    return roles.includes(adminRole);
  }
}
