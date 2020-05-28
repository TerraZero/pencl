/**
 * @typedef T_FieldDefine
 * @property {string} key
 * @property {string} type
 * @property {string} label
 * @property {(string[]|object<string, string>)} options
 * @property {any} fallback
 */

export default class Field {

  /**
   * @param {T_FieldDefine} define
   */
  constructor(define = {}) {
    this._define = define;
    this._value = null;
  }

  /**
   * @returns {T_FieldDefine}
   */
  get define() {
    return this._define;
  }

  get value() {
    return this._value || this.define.fallback;
  }

}
