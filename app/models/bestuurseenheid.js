import Model, { attr, belongsTo } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr naam;
  @attr alternatieveNaam;

  @belongsTo('bestuurseenheid-classificatie-code', {
    async: false,
    inverse: null,
  })
  classificatie;
}
