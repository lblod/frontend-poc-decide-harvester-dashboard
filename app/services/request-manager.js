import { LegacyNetworkHandler } from '@ember-data/legacy-compat';
import BaseRequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestManager extends BaseRequestManager {
  constructor() {
    super(...arguments);
    this.use([LegacyNetworkHandler, Fetch]);
  }
}
