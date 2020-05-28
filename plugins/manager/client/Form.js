import Field from './Field';

export default class Form {

  constructor() {
    this._fields = [];

    this.create();
  }

  /**
   * @returns {Field[]}
   */
  get fields() {
    return this._fields;
  }

  /**
   * @param {import('./Field').T_FieldDefine} define
   * @returns {Field}
   */
  addField(define) {
    this._fields.push(new Field(define));
    return this._fields[this._fields.length - 1];
  }

  create() { }

  validate() { }

  submit() { }

}
