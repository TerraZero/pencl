<template lang="pug">
  .game
    .game--sound
      video#scene-sound-player
      Video.game--video(v-for="sound in sounds", :key="sound.id", :id="sound.id")
    .game--background
      transition-group(name="enter")
        .game--image(v-if="scene === 'image'", :key="image", :style="imagestyle")
        .game--video(v-show="scene === 'video'", key="scene-player")
          video#scene-player.game--video-player
    .game--logo(:class="logoclass")
      SVGEmbed(src="/images/logos/tz.svg")
</template>

<script>
import MediaSystem from "~/plugins/mediasystem";
import Video from "~/components/medias/Video";
import SVGEmbed from "~/components/medias/SVGEmbed";

export default {
  components: {
    Video,
    SVGEmbed
  },
  data() {
    return {
      sounds: [],
      scene: null,
      image: 0,
      trigger: true
    };
  },
  computed: {
    logoclass() {
      if (this.scene === null) {
        return ["game--logo--start"];
      }
      return [];
    },
    imagestyle() {
      return {
        "background-image": 'url("' + this.image + '")'
      };
    }
  },
  mounted() {
    MediaSystem.system.mount(this);
  }
};
</script>

<style lang="sass">
.game
  position: relative
  width: 100%
  height: 100%

  &--background
    width: 100%
    height: 100%
    background: black
    overflow: hidden
    position: relative

  &--image,
  &--video,
  &--video-player
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  &--image
    background-size: cover
    background-position: 50%

  &--sound
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1000
    overflow: hidden

  &--logo
    position: absolute
    top: 20px
    right: 20px
    width: 50px
    height: 50px
    filter: drop-shadow(2px 4px 6px black)
    transition: top .3s ease-in-out, right .3s ease-in-out, width .3s ease-in-out, height .3s ease-in-out
    animation: logo-rotate 20s 9s infinite

    .logo-t,
    .logo-z
      animation: logo-rotate--character 10s linear infinite
      transform-origin: 50%

  &--logo--start
    top: calc(50% - 300px)
    right: calc(50% - 300px)
    width: 600px
    height: 600px

</style>
