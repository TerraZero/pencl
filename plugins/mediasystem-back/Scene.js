/**
 * @typedef T_YoutubeVideo
 * @property {string} videoId
 * @property {number} volume
 * @property {number} startSeconds
 * @property {number} endSeconds
 * @property {string} suggestedQuality
 * @property {string} howl
 */

/**
 * @typedef T_SceneBackground
 * @property {string} src
 * @property {number} time
 */

/**
 * @typedef T_SceneData
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {boolean} shuffle
 * @property {T_YoutubeVideo} sound
 * @property {T_YoutubeVideo} video
 * @property {T_SceneBackground[]} images
 * @property {T_YoutubeVideo[]} sounds
 */

import VideoPlayer from 'youtube-player';

import Calc from '../util/Calc';

export default class Scene {

  /**
   * @param {*} ms
   */
  constructor(ms) {
    this._ms = ms;
    this._component = null;
    this._data = {};
    this._player = new VideoPlayer('scene-player');
    this._player.on('stateChange', this.onStateChange.bind(this));
    this._sound = new VideoPlayer('scene-sound-player');
    this._sound.on('stateChange', this.onSoundStateChange.bind(this));
    this._current = {
      sound: null,
      image: null,
    };
  }

  /**
   * @returns {T_SceneData}
   */
  get data() {
    return this._data;
  }

  mount(component) {
    this._component = component;
  }

  /**
   * @param {T_SceneData} data
   */
  load(data) {
    this.stop();
    this._data = data;
    if (this.data.video) {
      this._component.scene = 'video';
      if (Array.isArray(this.data.video)) {
        const index = Calc.random(0, this.data.video.length - 1);
        this.play(this.data.video[index], this._player);
      } else {
        this.play(this.data.video, this._player);
      }
    }
    if (this.data.sound) {
      if (Array.isArray(this.data.sound)) {
        const index = Calc.random(0, this.data.sound.length - 1);
        this.play(this.data.sound[index], this._sound);
      } else {
        this.play(this.data.sound, this._sound);
      }
    }
    if (this.data.images) {
      this.nextImage();
    }
    if (this.data.sounds) {
      this.nextSound();
    }
  }

  stop() {
    this._component.scene = null;
    this._data = {};
    this._current = {
      sound: null,
      image: null,
    };
    this._sound.stopVideo();
    this._player.stopVideo();
    clearTimeout(this._currentTimeout);
  }

  nextImage() {
    this.count('image');
    this._component.scene = 'image';
    this._component.image = this.data.images[this._current.image].src;
    this._currentTimeout = setTimeout(this.nextImage.bind(this), this.data.images[this._current.image].time);
  }

  nextSound() {
    this.count('sound');
    this.play(this.data.sounds[this._current.sound], this._sound);
  }

  count(type) {
    if (this._current[type] === null) this._current[type] = 0;
    if (this.data.shuffle) {
      let count = Calc.random(0, this.data[type + 's'].length);
      if (count === this._current[type]) count++;
      this._current[type] = count;
    } else {
      this._current[type]++;
    }
    this._current[type] = this._current[type] % this.data[type + 's'].length;
  }

  /**
   * @param {T_YoutubeVideo} video
   * @param {VideoPlayer} player
   */
  play(video, player) {
    if (video.howl !== undefined) {
      const howl = this._ms.playFile(video.howl);

      if (this.data.sounds) {
        howl.on('end', this.nextSound.bind(this));
      }
    } else {
      player.loadVideoById(video);
      if (video.volume !== undefined) {
        player.setVolume(video.volume);
      }
      player.playVideo();
    }
  }

  onStateChange(event) {
    if (!this.data.sounds && !this.data.images) {
      if (event.data === 0) {
        this._component.scene = null;
      }
    }
  }

  onSoundStateChange(event) {
    if (event.data === 0 && this.data.sounds) {
      this.nextSound();
    }
  }

}
