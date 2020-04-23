import { Howl } from 'howler';

export default class Sound {

  /**
   * @param {T_SceneSound} sound
   */
  constructor(sound) {
    this._sound = sound;
    this._howl = null;
    this._promise = null;
    this._state = null;
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
    if (this._sound.volume && this._sound.volume > 1) {
      this._sound.volume = this._sound.volume / 100;
    }
    this._howl = new Howl(this._sound);
    this._howl.on('end', this.onEnd.bind(this));
    this._howl.on('stop', this.onStop.bind(this));
    this._howl.play();
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
