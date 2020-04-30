import { Howl } from 'howler';

import Video from './Video';
import Sound from './Sound';
import Scene from './Scene';
import Clip from './Clip';

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
    this._clip = null;
    this._sounds = {};
    this._textTimeout = null;
    this._textSoundTimeout = null;
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
    if (this._clip) this._clip.stop();
    this.component.scene = null;
    this.component.image = null;
    this.component.video = null;
    this.component.text = null;
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
      console.log(scene.video);
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

  clip(clip) {
    this._clip = new Clip(this.component, clip);
    this._clip.start();
  }

  text(text) {
    this.component.text = null;
    clearTimeout(this._textTimeout);
    this._textTimeout = setTimeout(() => {
      this.component.text = text;
      clearTimeout(this._textSoundTimeout);
      if (!text.mute) {
        this._textSoundTimeout = setTimeout(() => {
          this.sound({
            src: '/sound/title.mp3',
            start: 0,
            end: 3,
          });
        }, 1000);
      }
    }, text.delay || 1000);
  }

  event(event) {
    if (event.event === 'moon') {
      this.component.text = null;
      for (const src in this._sounds) {
        this._sounds[src].stop();
      }
      const moonBG = this.findEvent(this.component.clip.clips, 'moon-bg');
      const moon = this.findEvent(this.component.clip.clips, 'moon');
      const pillar1 = this.findEvent(this.component.clip.clips, 'pillar-1');
      const pillar2 = this.findEvent(this.component.clip.clips, 'pillar-2');

      setTimeout(() => {
        this.component.clip.clips[moon].style.width = '50%';
        this.component.clip.clips[moon].style.bottom = '13%';
        this.component.clip.clips[moon].style.left = '27%';
        this.component.clip.clips[moon].style.filter = 'drop-shadow(#00ffe8 0 0 100px) brightness(1.1) saturate(1.5) hue-rotate(185deg)';
        this.component.clip.clips[pillar1].style.filter = 'drop-shadow(2px 4px 100px #00ffe8) brightness(0.9) hue-rotate(185deg)';
        this.component.clip.clips[pillar2].style.filter = 'drop-shadow(2px 4px 100px #00ffe8) brightness(0.85) hue-rotate(185deg)';
        setTimeout(() => {
          this.component.text = {
            text: 'Der Schläfer',
            subtitle: 'Erwacht',
          };
        }, 56000);
      }, 2000);
      this.component.clip.clips[moonBG].style.background = 'rgba(0, 0, 0, .97)';
      this.moonSound();
    }
  }

  findEvent(clips, name) {
    for (const index in clips) {
      if (clips[index].event === name) {
        return index;
      }
    }
    return null;
  }

  moonSound(sound) {
    if (sound && sound.state === 'stop') return;
    this.sound({
      "src": "/downloads/sounds/bb_living_failures.mp3",
      "volume": 80
    }).promise.then(this.moonSound.bind(this));
  }

}
