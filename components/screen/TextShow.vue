<template lang="pug">
  .text-show(:class="classes")
    .text-show--frame
      .text-show--subtitle(v-if="subtitle")
        | {{ subtitle }}
      .text-show--title
        | {{ title }}

</template>

<script>
export default {
  props: ["title", "subtitle", "time"],
  data() {
    return {
      big: true
    };
  },
  computed: {
    classes() {
      if (this.big) {
        return "text-show--big";
      } else {
        return "text-show--small";
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.big = false;
    }, this.time || 2000);
  }
};
</script>

<style lang="sass">
.text-show
  width: 100%
  height: 100%
  overflow: hidden
  position: relative

  &--frame
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    border-top: 1em solid white
    border-bottom: 1em solid white
    text-align: center
    padding: 0 8em
    transition: all .3s ease-in-out
    filter: drop-shadow(2px 4px 6px black)

  &--small &--frame
    top: -5em
    transform: translate(-50%) scale(.3)

  &--title
    font-size: 12em

  &--subtitle
    font-size: 4em
    margin-bottom: -0.4em
</style>
