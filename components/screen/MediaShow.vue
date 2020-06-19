<template lang="pug">
  .media-show
    .media-show--frame
      transition-group(name="enter--direct")
        .media-show--image(v-for="image, index in images", :key="image.url", v-show="index === current", :style="styles(image.url)")
    .media-show--opacity(:style="opacityStyle")
</template>

<script>
let interval = null;
export default {
  props: ["images", "time", "opacity"],
  data() {
    return {
      current: 0
    };
  },
  computed: {
    currentSrc() {
      return this.images[this.current];
    },
    opacityStyle() {
      return {
        opacity: this.opacity || 0
      };
    }
  },
  methods: {
    styles(url) {
      return {
        "background-image": "url(" + url + ")"
      };
    }
  },
  destroyed() {
    clearInterval(interval);
  },
  mounted() {
    interval = setInterval(() => {
      this.current = (this.current + 1) % this.images.length;
    }, this.time || 20000);
  }
};
</script>

<style lang="sass">
.media-show
  width: 100%
  height: 100%
  overflow: hidden
  position: relative

  &--frame
    position: absolute
    top: -2em
    left: -2em
    right: -2em
    bottom: -2em
    animation: media-show 60s linear infinite

  &--opacity
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: black
    transition: opacity .3s ease-in-out

  &--image
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-size: cover
</style>
