import Model, { attr } from '@ember-data/model';

// English version of the Bestuurseenheid model which is used when the "English accounts model" feature is enabled.
export default class GroupModel extends Model {
  @attr name;
}
