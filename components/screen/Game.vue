<template lang="pug">
  .game
    .game--sound
      video#scene-sound-player
      Video.game--video(v-for="sound in sounds", :key="sound.id", :id="sound.id")
    .game--background
      transition-group(name="enter")
        .game--image(v-if="scene === 'image'", :key="image.src || 'none'", :style="imageStyle(image)")
        .game--video(v-show="scene === 'video'", key="scene-player")
          video#sceneplayer.game--video-player
            source(v-if="video", :src="video.src", type="video/mp4")
        .game--clips(v-if="clip", :key="clip.title")
          .game--clip(v-for="c, index in clip.clips", :key="c.src + index", :style="c.style")
            img.game--clip-image(v-if="c.type === 'image'", :src="c.src")
            .game--clip-text(v-if="c.type === 'text'", :src="c.src")
              | {{ c.src }}
        StarBackground.game--stars(v-if="text || stars", :key="text && text.text || 'stars'", :stars="100")
        .game--text(v-if="text", :key="text.text")
          .game--text-line
            .game--text-subtitle(v-if="text.subtitle")
              | {{ text.subtitle }}
            .game--text-title
              | {{ text.text }}
    .game--logo(:class="logoclass")
      .game--logo-wrapper
        SVGEmbed(src="/images/logos/tz.svg")
      .game--logo--title
        .game--cha-1 I
        .game--cha-2 N
        .game--cha-3 S
        .game--cha-4 A
        .game--cha-5 N
        .game--cha-6 E
</template>

<script>
import MediaSystem from "~/plugins/mediasystem";
import Video from "~/components/medias/Video";
import SVGEmbed from "~/components/medias/SVGEmbed";
import StarBackground from "~/components/backgrounds/StarBackground.vue";

export default {
  components: {
    Video,
    SVGEmbed,
    StarBackground
  },
  data() {
    return {
      sounds: [],
      scene: null,
      image: null,
      video: null,
      text: null,
      clip: null,
      stars: false,
      trigger: true
    };
  },
  computed: {
    logoclass() {
      if (this.scene === null && this.text === null && this.clip === null) {
        return ["game--logo--start"];
      }
      return [];
    }
  },
  methods: {
    imageStyle(image) {
      const style = image.style || {};

      if (image.src) {
        style["background-image"] = 'url("' + image.src + '")';
      }
      return style;
    },
    clipStyle(clip) {
      const style = {
        top: clip.top + "px",
        left: clip.left + "px"
      };

      if (clip.width) {
        style.width = clip.width + "px";
      }
      return style;
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

  &--stars
    z-index: 0

  &--image,
  &--video,
  &--text,
  &--clips,
  &--video-player
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  &--clip
    position: absolute

  &--clip-image
    width: 100%

  &--text
    display: flex
    justify-content: center
    align-items: center
    filter: drop-shadow(4px 4px 8px black)

  &--text-line
    font-size: 180px
    border-top: 20px solid white
    border-bottom: 20px solid white
    text-transform: uppercase
    animation: ghosty 3s 1s linear
    text-align: center

  &--text-subtitle
    font-size: 45px
    margin-bottom: -35px

  &--text-title
    padding: 0 90px

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
    transition: top .3s ease-in-out, right .3s ease-in-out, width .3s ease-in-out, height .3s ease-in-out

  &--logo--title
    display: flex
    justify-content: center
    font-size: 15px
    transition: font-size .3s ease-in-out

  &--logo-wrapper
    width: 75%
    height: 75%
    margin: 0 auto 5px
    animation: logo-rotate 20s 9s infinite
    filter: drop-shadow(2px 4px 6px black)

    .logo-t,
    .logo-z
      animation: logo-rotate--character 10s linear infinite
      transform-origin: 50%

  &--logo--start
    top: calc(50% - 300px)
    right: calc(50% - 300px)
    width: 600px
    height: 600px

  &--logo--start &--logo--title
    font-size: 150px

  &--cha-1
    animation: logo-shadow 40s linear infinite

  &--cha-2
    animation: logo-shadow 50s 6s linear infinite

  &--cha-3
    animation: logo-shadow 30s 4s linear infinite

  &--cha-4
    animation: logo-shadow 44s 10s linear infinite

  &--cha-5
    animation: logo-shadow 38s 8s linear infinite

  &--cha-6
    animation: logo-shadow 40s 14s linear infinite

</style>
