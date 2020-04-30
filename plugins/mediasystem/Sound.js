import { Howl } from 'howler';

export default class Sound {

  /**
   * @param {import('./Scene').T_SceneSound} sound
   */
  constructor(sound) {
    this._sound = sound;
    this._howl = null;
    this._promise = null;
    this._state = null;
  }

  /**
   * @returns {import('./Scene').T_SceneSound}
   */
  get sound() {
    return this._sound;
  }

  get promise() {
    if (this._promise === null) {
      this._promise = {};
      this._promise.promise = new Promise((resolve, reject) => {
        this._promise.resolve = resolve;
        this._promise.reject = reject;
      });
    }
    return this._promise.promise;
  }

  get state() {
    return this._state;
  }

  start() {
    if (this.sound.volume && this.sound.volume > 1) {
      this.sound.volume = this.sound.volume / 100;
    }
    if (this.sound.start !== undefined && this.sound.end !== undefined) {
      this.sound.sprite = {
        sound: [this.sound.start * 1000, this.sound.end * 1000]
      };
    }
    this._howl = new Howl(this.sound);
    this._howl.on('end', this.onEnd.bind(this));
    this._howl.on('stop', this.onStop.bind(this));
    if (this.sound.start !== undefined && this.sound.end !== undefined) {
      this._howl.play('sound');
    } else {
      this._howl.play();
    }
    this._state = 'play';
    return this;
  }

  stop() {
    if (this._howl) this._howl.stop();
  }

  onEnd() {
    this._state = 'end';
    if (this.promise !== null) {
      this._promise.resolve(this);
    }
  }

  onStop() {
    this._state = 'stop';
    if (this.promise !== null) {
      this._promise.resolve(this);
    }
  }

}
