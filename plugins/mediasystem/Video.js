import MediaSystem from './index';
import VideoPlayer from 'youtube-player';

export default class Video {

  constructor(video, type = 'video') {
    this._type = type;
    this._video = video;
    this._component = null;
    this._player = null;
    this._current = 0;
    this._promise = null;
  }

  execute(component) {
    this._component = component;
    this._player = new VideoPlayer(this._video.id, this._video);
    this._player.on('stateChange', this.onStateChange.bind(this));
    if (this._video.volume !== undefined) {
      this._player.setVolume(this._video.volume);
    } else {
      this._player.setVolume(100);
    }
    this._player.playVideo();
  }

  clear() {
    MediaSystem.system.clear(this);
  }

  onStateChange(event) {
    if (event.data === 0 && this._promise !== null) {
      this._promise.resolve(this);
    }
    if (this._type === 'sound' && event.data === 0) {
      this.clear();
    }
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

}
