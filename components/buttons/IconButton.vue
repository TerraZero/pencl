<template lang="pug">
  .icon-button(@click="$emit('click')")
    .icon-button--icon(v-if="icon")
      Icon(v-bind="icon")
    .icon-button--text(v-if="text")
      | {{ text }}
</template>

<script>
import Icon from "~/components/medias/Icon.vue";

export default {
  components: {
    Icon
  },
  props: ["text", "icon"]
};
</script>
<style lang="sass">
.icon-button
  padding: 40px
  background: linear-gradient( 45deg, rgba(81, 172, 165, .9), rgba(97, 220, 197, .9) )
  color: white
  font-size: 35px
  font-weight: bold
  cursor: pointer
  transition: background-color .3s ease-in-out, transform .3s ease-in-out
  user-select: none

  &:hover
    background-color: #61dcc5
    box-shadow: 0 0 10px 5px #51aca5
    opacity: 1
    transform: scale(1.1)

  &--icon
    width: 150px
    height: 150px
    padding-bottom: 40px
</style>
