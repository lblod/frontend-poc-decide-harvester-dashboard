import Model, { attr, belongsTo } from '@ember-data/model';

export default class LogEntryModel extends Model {
  @attr className;
  @attr message;
  @attr specificInformation;
  @attr('date') datetime;
  @belongsTo('log-source', { async: true, inverse: null }) logSource;
  @belongsTo('log-level', { async: true, inverse: null }) logLevel;
  @belongsTo('status-code', { async: true, inverse: null }) statusCode;
}
