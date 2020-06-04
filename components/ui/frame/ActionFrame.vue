<template lang="pug">
  .action-frame(:style="animationStyle")
    .action-frame--effect(:style="effectStyle", @animationend="animationend")
      slot
</template>
<script>
export default {
  props: ["animation", "effect"],
  computed: {
    animationStyle() {
      if (typeof this.animation === "string") {
        return {
          animation: this.animation
        };
      } else if (this.animation) {
        return {
          animation:
            this.animation.animation +
            " " +
            this.animation.speed +
            " " +
            this.animation.options
        };
      }
    },
    effectStyle() {
      if (typeof this.effect === "string") {
        return {
          animation: this.effect
        };
      } else if (this.effect) {
        return {
          animation:
            this.effect.animation +
            " " +
            this.effect.speed +
            " " +
            this.effect.options
        };
      }
    }
  },
  methods: {
    animationend() {
      this.$emit("finish");
    }
  }
};
</script>
<style lang="sass">
.action-frame
  width: 100%
  height: 100%
</style>
