<template lang="pug">
  .index
    StarBackground(:stars="100")
    transition(name="enter")
      Icon.index--icon(v-if="current !== null", :key="current", v-bind="bgicon")
    transition(name="enter-down" appear)
      .index--container(:class="classes")
        IconButton.index--button(v-for="button, index  in buttons", :key="index", :class="button.classes", :text="button.text", :icon="button.icon", @click="click(index)", @mouseover.native="hover(index)")
</template>

<script>
import Icon from "~/components/medias/Icon.vue";
import IconButton from "~/components/buttons/IconButton.vue";
import StarBackground from "~/components/backgrounds/StarBackground.vue";

export default {
  components: {
    Icon,
    IconButton,
    StarBackground
  },
  data() {
    return {
      classes: [],
      current: null,
      buttons: [
        {
          url: "/host",
          text: "Host",
          icon: {
            cat: "sciflat",
            name: "host",
            bg: "1"
          },
          classes: []
        },
        {
          url: "/screen",
          text: "Screen",
          icon: {
            cat: "sciflat",
            name: "screen",
            bg: "1"
          },
          classes: []
        },
        {
          url: "/user",
          text: "User",
          icon: {
            cat: "sciflat",
            name: "user",
            bg: "1"
          },
          classes: []
        }
      ]
    };
  },
  computed: {
    bgicon() {
      if (this.current === null) return false;
      const button = this.buttons[this.current];

      return {
        cat: button.icon.cat,
        name: button.icon.name
      };
    }
  },
  methods: {
    click(index) {
      this.classes.push("index--container--clicked");
      const button = this.buttons[index];

      button.classes.push("index--button--clicked");
      setTimeout(() => {
        this.$router.push({
          path: button.url
        });
      }, 1000);
    },
    hover(index) {
      if (this.classes.length) return;
      this.current = index;
    }
  }
};
</script>

<style lang="sass">
.index
  height: 100%
  overflow: hidden
  position: relative

  &--icon
    position: absolute
    width: 50vw
    height: 50vw
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    z-index: -1
    opacity: .3
    filter: blur(5px)

  &--container
    margin: 0 auto
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    text-align: center

  &--container--clicked &--button
    transform: scale(0.9)
    opacity: .5

  &--container--clicked &--button--clicked
    transform: scale(1.2)
    opacity: 1

  &--button
    margin: 40px
    transition: background-color .3s ease-in-out, transform .3s ease-in-out, opacity .3s ease-in-out
</style>
