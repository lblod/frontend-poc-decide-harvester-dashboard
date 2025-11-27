import Store from 'ember-data/store';
import { service } from '@ember/service';

export default class MyStore extends Store {
  @service requestManager;
}
