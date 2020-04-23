export default class Video {

  constructor(mount, video) {
    this._promise = null;
    this._video = video;
    this._mount = mount;
    this._video.addEventListener('canplay', this.onCanplay.bind(this));
    this._video.addEventListener('pause', this.onPause.bind(this));
    this._state = null;
  }

  get state() {
    return this._state;
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

  onCanplay() {
    this._state = 'play';
    this._video.play();
  }

  onPause() {
    this._mount.scene = null;
    this._mount.video = null;
    this._video.loop = false;
    if (this._promise !== null) {
      this._promise.resolve(this);
    }
  }

  /**
   * @param {import("./Scene").T_SceneVideo} data
   */
  load(data) {
    this.pause();
    this._promise = null;
    this._mount.scene = 'video';
    if (data.loop) {
      this._video.loop = true;
    }
    this._mount.video = data;
    if (data.volume !== undefined) {
      this._video.volume = data.volume / 100;
    } else {
      this._video.volume = 1;
    }
    if (this._video.readyState === 4) {
      this._video.load();
    }
    return this;
  }

  pause() {
    this._video.pause();
  }

  stop() {
    this._state = 'stop';
    this._video.pause();
  }

}
