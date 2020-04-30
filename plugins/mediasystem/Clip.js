export default class Clip {

  /**
   * @param {object} mount
   * @param {import('./Scene').T_SceneClip[]} clip
   */
  constructor(mount, clip) {
    this._clip = clip;
    this._mount = mount;
    this._timeout = null;
    this._index = 0;
  }

  /**
   * @returns {import('./Scene').T_SceneClip[]}
   */
  get clip() {
    return this._clip;
  }

  start() {
    this.stop();
    this.doNext();
    this._mount.scene = 'clip';
  }

  stop() {
    this._index = -1;
    this._mount.clip = null;
    clearTimeout(this._timeout);
  }

  doNext() {
    this._index = ((this._index + 1) % this.clip.length);

    this._mount.clip = this.clip[this._index];
    if (this.clip.length !== 1) {
      this._timeout = setTimeout(this.doNext.bind(this), this.clip[this._index].time || 1000);
    }
  }

}
