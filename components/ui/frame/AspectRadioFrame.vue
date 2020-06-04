<template lang="pug">
  .aspect-radio-frame(:style="styles", :class="classes")
    .aspect-radio-frame--content
      slot
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 9
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles() {
      return {
        "padding-top": (this.height / this.width) * 100 + "%"
      };
    },
    classes() {
      if (this.fullscreen) {
        return "aspect-radio-frame--fullscreen";
      }
    }
  }
};
</script>
<style lang="sass">
.aspect-radio-frame
  height: 0
  overflow: hidden
  position: relative

  &--content
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

  &--fullscreen
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    z-index: 1000
    padding: 0
    border: 0 !important

</style>
