<template lang="pug">
  .play-button(@click="$emit('click')")
    Icon.play-button--type(v-if="type", cat="api", :name="type", type="svg")
    .play-button--left
      .play-button--title
        | {{ title }}
      .play-button--description
        | {{ description }}
    .play-button--right
      Icon.play-button--action-playlist(v-if="type !== 'playlist'", @click.native="$emit('action:playlist')", cat="api", name="playlist-add", type="svg")
      Icon.play-button--action-play(@click.native="$emit('action:play')", cat="api", name="play", type="svg")
</template>

<script>
import Icon from "~/components/medias/Icon.vue";

export default {
  components: {
    Icon
  },
  props: ["title", "description", "type"]
};
</script>
<style lang="sass">
.play-button
  display: flex
  min-height: 75px
  background-color: #3c8c74
  position: relative
  box-sizing: border-box
  border: 1px solid #3ce5ca

  &--type
    position: absolute
    top: 0
    left: 0
    width: 25px
    height: 25px
    background-color: #3ce5ca

  &--left
    display: flex
    width: 100%
    flex-direction: column
    padding: 20px

  &--right
    display: flex

  &--title
    font-size: 22px
    font-weight: bold

  &--description
    font-size: 12px

  &--action-play,
  &--action-playlist
    min-width: 35px
    max-width: 100px
    transition: background-position .3s ease-in-out
    background-image: linear-gradient(to right bottom, #61dcc5, #1b7d6b)
    background-size: 300% 100%
    cursor: pointer

    &:hover
      background-position: 100% 0

    &:active
      background-position: 50% 0
</style>
