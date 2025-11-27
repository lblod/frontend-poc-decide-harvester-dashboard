import Model, { attr, hasMany } from '@ember-data/model';

export default class Gebruiker extends Model {
  @attr voornaam;
  @attr achternaam;
  @attr rijksregisterNummer;
  @hasMany('account', { async: true, inverse: 'gebruiker' }) accounts;
  @hasMany('bestuurseenheid', {
    async: true,
    inverse: null,
    polymorphic: true,
  })
  bestuurseenheden;

  get group() {
    return this.hasMany('bestuurseenheden').value().at(0);
  }
  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
