<template lang="pug">
  .link-button(:class="classes", @click="click")
    .link-button--icon(v-if="icon")
      Icon(v-bind="icon")
    .link-button--text(v-if="text")
      | {{ text }}
</template>

<script>
import Icon from "~/components/medias/Icon.vue";

export default {
  components: {
    Icon
  },
  props: ["text", "icon", "target", "swap"],
  computed: {
    classes() {
      if (this.swap) {
        return ["link-button--swap"];
      }
    }
  },
  methods: {
    click() {
      if (this.target) {
        this.$router.push({
          path: this.target
        });
      } else {
        this.$emit("click");
      }
    }
  }
};
</script>

<style lang="sass">
.link-button
  display: inline-flex
  padding: 0.5em
  line-height: 2.5em
  background: #333
  cursor: pointer
  transition: background .3s ease-in-out

  &:hover
    background: #444

  &--swap
    flex-direction: row-reverse

  &--icon
    width: 2.5em
    height: 2.5em

  &--text
    padding: 0 0.5em
</style>
