import Model, { attr } from '@ember-data/model';

export default class LogLevelModel extends Model {
  @attr priority;
  @attr label;
}
