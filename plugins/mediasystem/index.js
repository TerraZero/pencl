import { Howl } from 'howler';

import Video from './Video';
import Sound from './Sound';
import Scene from './Scene';

export default class MediaSystem {

  static get system() {
    if (this._system === undefined) {
      this._system = new MediaSystem();
    }
    return this._system;
  }

  constructor() {
    this._component = null;
    this._video = null;
    this._scene = null;
    this._sounds = {};
  }

  get component() {
    return this._component;
  }

  mount(component) {
    this._component = component;
    this._video = new Video(this._component, sceneplayer);
    this._scene = new Scene(this);
    return this;
  }

  sound(sound) {
    if (this._sounds[sound.src] === undefined) {
      this._sounds[sound.src] = new Sound(sound);
      this._sounds[sound.src].start().promise.then(() => {
        delete this._sounds[sound.src];
      });
    }
    return this._sounds[sound.src];
  }

  clear() {
    this._video.stop();
    this.component.scene = null;
    this.component.image = null;
    this.component.video = null;
    for (const src in this._sounds) {
      this._sounds[src].stop();
    }
  }

  image(image) {
    this.component.scene = 'image';
    this.component.image = image;
  }

  video(video) {
    return this._video.load(video);
  }

  scene(scene) {
    if (scene.sound) {
      this._scene.stop();
      this.sound(scene.sound);
    } else if (scene.video) {
      this._scene.stop();
      this._video.load(scene.video);
    } else {
      this._scene.load(scene);
    }
  }

  stop() {
    this._scene.stop();
    this.clear();
  }

}
