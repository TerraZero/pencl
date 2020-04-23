/**
 * @typedef T_SceneSound
 * @property {string} src
 * @property {number} start
 * @property {number} end
 * @property {number} volume
 */

/**
 * @typedef T_SceneImage
 * @property {string} src
 * @property {number} time
 */

/**
 * @typedef T_SceneVideo
 * @property {string} src
 * @property {number} volume
 * @property {number} loop
 */

/**
 * @typedef T_SceneData
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string[]} shuffle
 * @property {string} continue
 * @property {T_SceneImage[]} images
 * @property {T_SceneSound[]} sounds
 * @property {T_SceneVideo[]} videos
 */

import Calc from '../util/Calc';

export default class Scene {

  /**
   * @param {import('./index').default} mediasystem
   */
  constructor(mediasystem) {
    this._mediasystem = mediasystem;
    this._scene = null;
    this.__currentTimeout = null;
    this._current = {
      sound: null,
      image: null,
      video: null,
    };
  }

  /**
   * @returns {T_SceneData}
   */
  get scene() {
    return this._scene;
  }

  /**
   * @param {T_SceneData} scene
   */
  load(scene) {
    if (scene.continue && this._scene !== null) {
      this.merge(scene);
    } else {
      this.stop();
      this._scene = scene;

      if (this.scene.images) {
        this.nextImage();
      }
      if (this.scene.sounds) {
        this.nextSound();
      }
      if (this.scene.videos) {
        this.nextVideo();
      }
    }
  }

  /**
   * @param {T_SceneData} scene
   */
  merge(scene) {
    this.scene[scene.continue + 's'] = scene[scene.continue + 's'];
    this._current[scene.continue] = null;
    if (scene.shuffle) {
      if (this.scene.shuffle) {
        this.scene.shuffle.concat(scene.shuffle);
        this.scene.shuffle.filter((v, i, a) => a.indexOf(v) === i);
      } else {
        this.scene.shuffle = scene.shuffle;
      }
    }
    this.next(scene.continue);
  }

  stop() {
    this._mediasystem.clear();
    this._current = {
      sound: null,
      image: null,
      video: null,
    };
    clearTimeout(this._currentTimeout);
  }

  next(type) {
    switch (type) {
      case 'image':
        this.nextImage();
        break;
      case 'video':
        this.nextVideo();
        break;
      case 'sound':
        this.nextSound();
        break;
    }
  }

  nextImage() {
    const current = this.count('image');
    this._mediasystem.image(current.src);
    if (this.scene.images.length !== 1) {
      clearTimeout(this._currentTimeout);
      this._currentTimeout = setTimeout(this.nextImage.bind(this), current.time);
    }
  }

  nextSound(sound) {
    if (sound && sound.state === 'stop') return;
    const current = this.count('sound');
    this._mediasystem.sound(current).promise.then(this.nextSound.bind(this));
  }

  nextVideo(video) {
    if (video && video.state === 'stop') return;
    const current = this.count('video');
    this._mediasystem.video(current).promise.then(this.nextVideo.bind(this));
  }

  /**
   *
   * @param {string} type
   * @returns {(T_SceneImage|T_SceneSound)}
   */
  count(type) {
    if (this._current[type] === null) this._current[type] = -1;
    if (this.scene.shuffle && this.scene.shuffle.indexOf(type) !== -1) {
      let count = Calc.random(0, this.scene[type + 's'].length);
      if (count === this._current[type]) count++;
      this._current[type] = count;
    } else {
      this._current[type]++;
    }
    this._current[type] = this._current[type] % this.scene[type + 's'].length;
    return this.scene[type + 's'][this._current[type]];
  }

}
