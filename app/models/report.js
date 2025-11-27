import Model, { attr, belongsTo } from '@ember-data/model';

export default class ReportModel extends Model {
  @attr title;
  @attr description;
  @attr('date') created;
  @belongsTo('file', { async: true, inverse: null }) file;
}
