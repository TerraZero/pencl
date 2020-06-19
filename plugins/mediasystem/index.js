import { Howl } from 'howler';

import Calc from '~/plugins/util/Calc';

class MediaSystem {

  constructor() {
    this._component = null;
    this._sounds = {};
    this._current = null;
  }

  get component() {
    return this._component;
  }

  mount(component) {
    this._component = component;
    return this;
  }

  stop(type) {
    this.component.showloading = false;
    if (type === 'sound' || type === 'all') {
      for (const item in this._sounds) {
        this._sounds[item].off();
        this._sounds[item].stop();
        delete this._sounds[item];
      }
    }
  }

  intro(animation = true) {
    this.stop();
    this.component.showlogo = true;
    this.component.logoanimate = animation;
  }

  timeline({ time, list }) {
    this.stop();
    this.component.timeline.time = time;
    this.component.timeline.list = list.filter(v => v.length);
    this.component.screen = 'timeline';
  }

  images({ images, config }) {
    this.component.images = images;
    this.component.imagespeed = config.image.speed;
    this.component.screen = 'mediashow';
  }

  sound(sound) {
    console.log(sound);
    const key = sound.url;
    this._sounds[key] = new Howl({
      src: sound.url,
    });
    if (sound.volume) {
      this._sounds[key].volume(sound.volume);
    }
    if (sound.start) {
      this._sounds[key].seek(sound.start);
    }
    this._sounds[key].on('end', () => {
      delete this._sounds[key];
    });
    this._sounds[key].play();
    return this._sounds[key];
  }

  music(data) {
    if (this._current) {
      this._current.stop();
    }

    let index = Calc.random(0, data.music.length);
    const start = () => {
      let newIndex = Calc.random(0, data.music.length);
      if (newIndex === index) newIndex++;
      index = newIndex % data.music.length;
      this._current = this.sound(data.music[index]);
      this._current.on('end', start);
    };
    start();
  }

  text({ title, subtitle = null }) {
    this.component.title = title;
    this.component.subtitle = subtitle || null;
  }

};

export default new MediaSystem();
