import { Howl } from 'howler';

import ArrayUtil from '../util/ArrayUtil';
import Video from './Video';
import Scene from './Scene';

export default class MediaSystem {

  static get system() {
    if (this._system === undefined) {
      this._system = new MediaSystem();
    }
    return this._system;
  }

  constructor() {
    this._register = {};
    this._component = null;
    this._scene = null;
  }

  get component() {
    return this._component;
  }

  get scene() {
    this._scene = this._scene || new Scene(this);
    return this._scene;
  }

  mount(component) {
    this._component = component;
    this.scene.mount(component);
    return this;
  }

  load(data) {
    this.scene.load(data);
  }

  stop() {
    this.scene.stop();
  }

  playFile(file) {
    const sound = new Howl({
      src: [file],
    });
    sound.play();
    return sound;
  }

  register(id, component) {
    if (this._register[id]) {
      this._register[id].execute(component);
    }
  }

  playSound(video) {
    if (video.howl) {
      this.playFile(video.howl);
      return null;
    } else {
      this._register = this._register || {};
      video.id = 'video-' + video.videoId;

      this.component.sounds.push({ id: video.id });
      this._register[video.id] = new Video(video, 'sound');
      return this._register[video.id];
    }
  }

  /**
   * @param {import('./Video')} video
   */
  clear(video) {
    const { index } = ArrayUtil.find(this.component.sounds, (item) => item.id === video._video.id);

    this.component.sounds.splice(index, 1);
    delete this._register[video.id];
  }

}
