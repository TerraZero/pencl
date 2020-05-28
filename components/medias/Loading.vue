<template lang="pug">
  .loading(@click="click", :class="'loading--mode-' + mode")
    .loading--center
      SVGEmbed.loading--svg(src="/images/logos/tz-loading.svg", :style="styles")
</template>

<script>
import SVGEmbed from "~/components/medias/SVGEmbed";
import Calc from "~/plugins/util/Calc";

const radius = 47;
let interval = null;

export default {
  components: {
    SVGEmbed
  },
  data() {
    return {
      mode: 0,
      percentage: 1,
      offset: 0
    };
  },
  computed: {
    styles() {
      if (this.mode === 0 || this.mode === 1) {
        return {
          "stroke-dasharray": (Math.PI * 2 * radius) / 24,
          "stroke-dashoffset": this.offset
        };
      }
      return {
        "stroke-dasharray":
          (this.percentage / 100) * Math.PI * 2 * radius + " 999"
      };
    }
  },
  methods: {
    click() {
      if (this.mode === 0) {
        interval = setInterval(() => {
          this.offset =
            (this.offset + Calc.random(0, radius) + radius / 2) % (radius * 2);
        }, 1000);
      } else if (this.mode === 1) {
        clearInterval(interval);
        interval = setInterval(() => {
          this.percentage *= 2;
          if (this.percentage > 100) {
            clearInterval(interval);
            this.mode++;
          }
        }, 1000);
      }
      this.mode++;
    }
  }
};
</script>
<style lang="sass">
.loading
  background: black
  width: 100%
  height: 100%
  overflow: hidden
  position: relative

  &--center
    position: absolute
    top: calc(50% - 12.5vw)
    right: calc(50% - 12.5vw)
    width: 25vw
    transition: transform .3s

  &--svg
    transition: all .8s ease-in-out
    transform: perspective(300px) rotateX(0) rotateY(0)

  &--mode-1 &--svg,
  &--mode-2 &--svg
    animation: logo--3d-shake 20s ease-in-out infinite

  &--mode-3 .logo-loading
    transition: opacity .3s 1s ease-in-out
    opacity: 0
</style>
