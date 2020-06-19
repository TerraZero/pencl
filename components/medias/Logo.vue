<template lang="pug">
  .logo(:class="'logo--mode-' + mode")
    .logo--center
      SVGEmbed.logo--svg(src="/images/logos/tz.svg")
      .logo--title
        .logo--insane.logo--abs
          .logo--sha-1 I
          .logo--sha-2 N
          .logo--sha-3 S
          .logo--sha-4 A
          .logo--sha-5 N
          .logo--sha-6 E
        .logo--paycyber.logo--abs
          .logo--pay
            .logo--pay-1 P
            .logo--pay-2 A
            .logo--pay-3 Y
          .logo--cyber
            .logo--cyber-1 C
            .logo--cyber-2 Y
            .logo--cyber-3 B
            .logo--cyber-4 E
            .logo--cyber-5 R
            .logo--cyber-6 V
</template>

<script>
import SVGEmbed from "~/components/medias/SVGEmbed";
import { Howl } from "howler";
import AsyncPromise from "utils/src/AsyncPromise";

const insane = new Howl({
  src: "/downloads/music/re2_third_demise.mp3",
  volume: 0.8
});
const paycyber = new Howl({
  src: "/downloads/music/is_tektronik.mp3",
  volume: 0.7
});
const glitch = new Howl({
  src: "/downloads/sounds/glitch.mp3"
});
paycyber.seek(35);

const promise = new AsyncPromise();

export default {
  components: {
    SVGEmbed
  },
  data() {
    return {
      mode: 0
    };
  },
  methods: {
    start() {
      if (this.mode !== 0) return;
      this.mode = 1;
      insane.play();
      setTimeout(() => {
        glitch.play();
      }, 8000);
      setTimeout(() => {
        this.mode = 2;
        insane.stop();
        paycyber.play();
      }, 12000);
      setTimeout(() => {
        paycyber.fade(1, 0, 5000);
      }, 22000);
      setTimeout(() => {
        paycyber.stop();
        this.mode = 3;
        promise.resolve();
      }, 27000);
      return promise.promise;
    },
    show() {
      this.mode = 3;
    }
  },
  mounted() {
    if (insane.state() === "loaded") {
      this.$emit("ready");
    } else {
      insane.on("load", () => {
        this.$emit("ready");
      });
    }
  }
};
</script>
<style lang="sass">
.logo
  width: 100%
  height: 100%
  overflow: hidden
  position: relative

  &--center
    position: absolute
    top: calc(50% - 14.5vw)
    right: calc(50% - 12.5vw)
    width: 25vw
    transition: transform .3s

  &--svg
    padding: 0 10%
    animation: logo--rotate 20s 9s infinite

    .logo-t,
    .logo-z
      animation: logo--rotate--character 10s linear infinite
      transform-origin: 50%

  &--title
    position: relative
    height: 150px

  &--abs
    position: absolute

  &--mode-1 &--center,
  &--mode-2 &--center
    animation: logo--zoom 10s 7s

  &--mode-1 &--title,
  &--mode-2 &--title,
  &--mode-3 &--title
    animation: logo--glitch 10s 7s

  &--mode-0 &--paycyber,
  &--mode-1 &--paycyber
    opacity: 0

  &--mode-2 &--insane,
  &--mode-3 &--insane
    opacity: 0

  &--mode-2 &--paycyber,
  &--mode-3 &--paycyber
    opacity: 1

  &--mode-3 &--center
    transition: all .6s
    width: 75px
    top: 20px
    right: 20px

  &--mode-3 &--paycyber
    transition: all .6s
    right: 0

  &--mode-3 &--pay
    transition: all .6s
    font-size: 20px
    letter-spacing: 3px

  &--mode-3 &--cyber
    transition: all .6s
    font-size: 17px
    letter-spacing: -5px

  &--mode-3 &--cyber-6
    transition: all .6s
    font-size: 34px
    top: 0
    left: 30px

  &--cyber-6
    position: absolute
    top: -39px
    left: 153px
    transform: rotate(235deg)
    font-size: 340px

  &--cyber
    opacity: 0
    transition: opacity .1s 4s

  &--mode-2 &--cyber,
  &--mode-3 &--cyber
    opacity: 1

  &--paycyber
    animation: logo--shake 2s infinite
    position: relative
    right: 25px

  &--insane,
  &--paycyber,
  &--pay,
  &--cyber
    display: flex
    justify-content: space-between
    font-size: 130px

  &--pay
    font-family: payday
    font-size: 150px
    letter-spacing: 10px

  &--cyber
    font-family: cyberpunk
    transform: translate(-30%, -10%) rotate(-20deg)
    letter-spacing: -40px
    text-shadow: 0 0 5px black

  &--sha-1
    animation: logo--shadow 40s linear infinite

  &--sha-2
    animation: logo--shadow 50s 6s linear infinite

  &--sha-3
    animation: logo--shadow 30s 4s linear infinite

  &--sha-4
    animation: logo--shadow 44s 10s linear infinite

  &--sha-5
    animation: logo--shadow 38s 8s linear infinite

  &--sha-6
    animation: logo--shadow 40s 14s linear infinite
</style>
