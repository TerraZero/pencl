<template lang="pug">
  .pgame(@click="click")
    .pgame--background(:style="styles", @animationend="animationend")
</template>

<script>
import { Howl } from "howler";

const music = new Howl({
  src: "/downloads/music/hs_welcome_to_night_city.mp3"
});

let time = 0;
const shakes = [
  {
    time: 57901,
    effect: "shake .5s"
  },
  {
    time: 58450,
    effect: "shake--pulse .2s"
  },
  {
    time: 59071,
    effect: "shake--pulse .2s"
  },
  {
    time: 59660,
    effect: "shake--pulse .2s"
  },
  {
    time: 60249,
    effect: "shake--pulse .2s"
  },
  {
    time: 60879,
    effect: "shake--pulse .2s"
  },
  {
    time: 61451,
    effect: "shake--pulse .2s"
  },
  {
    time: 62040,
    effect: "shake--pulse .2s"
  },
  {
    time: 62682,
    effect: "shake--pulse .2s"
  },
  {
    time: 63312,
    effect: "shake--pulse .2s"
  },
  {
    time: 63921,
    effect: "shake--pulse .2s"
  },
  {
    time: 64510,
    effect: "shake--pulse .2s"
  },
  {
    time: 65091,
    effect: "shake--pulse .2s"
  },
  {
    time: 65660,
    effect: "shake--pulse .2s"
  },
  {
    time: 66281,
    effect: "shake--pulse .2s"
  },
  {
    time: 66890,
    effect: "shake--pulse .2s"
  },
  {
    time: 67480,
    effect: "shake--pulse .2s"
  },
  {
    time: 68092,
    effect: "shake--pulse .2s"
  },
  {
    time: 68670,
    effect: "shake--pulse .2s"
  },
  {
    time: 69262,
    effect: "shake--pulse .2s"
  },
  {
    time: 69900,
    effect: "shake--pulse .2s"
  },
  {
    time: 70501,
    effect: "shake--pulse .2s"
  },
  {
    time: 71102,
    effect: "shake--pulse .2s"
  },
  {
    time: 71691,
    effect: "shake--pulse .2s"
  },
  {
    time: 72301,
    effect: "shake--pulse .2s"
  },
  {
    time: 72901,
    effect: "shake--pulse .2s"
  },
  {
    time: 73470,
    effect: "shake--pulse .2s"
  },
  {
    time: 74051,
    effect: "shake--pulse .2s"
  },
  {
    time: 74640,
    effect: "shake--pulse .2s"
  },
  {
    time: 75250,
    effect: "shake--pulse .2s"
  },
  {
    time: 75871,
    effect: "shake--pulse .2s"
  },
  {
    time: 76480,
    effect: "shake--pulse .2s"
  },
  {
    time: 77069,
    effect: "shake--pulse .2s"
  }
];
let index = 0;

export default {
  data() {
    return {
      animation: null
    };
  },
  computed: {
    styles() {
      if (this.animation) {
        return {
          animation: this.animation
        };
      }
    }
  },
  methods: {
    animationend() {
      this.animation = null;
      if (index === shakes.length) return;
      const next = shakes[index++];
      const current = new Date().getTime() - time;
      setTimeout(() => {
        this.animation = next.effect;
      }, next.time - current);
    },
    click() {
      time = new Date().getTime();
      music.play();
      this.animationend();
    }
  }
};
</script>

<style lang="sass">
.pgame
  width: 100%
  height: 100%
  position: relative
  overflow: hidden

  &--background
    position: absolute
    top: -15px
    left: -15px
    right: -15px
    bottom: -15px
    background-image: url('/downloads/backgrounds/hideout.jpg')
    background-size: cover

    &:after,
    &:before
      content: attr(data-text)
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
</style>
