import Model, { attr, hasMany } from '@ember-data/model';

export default class HarvestingCollectionModel extends Model {
  @attr uri;
  @attr creator;
  @hasMany('remote-data-object', { async: true, inverse: null })
  remoteDataObjects;
}
