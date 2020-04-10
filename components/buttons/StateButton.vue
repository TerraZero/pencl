<template lang="pug">
  .state-button(@click="$emit('click')", :class="(active ? 'state-button--active': '')")
    .state-button--right
      .state-button--title(v-if="title")
        | {{ title }}
      .state-button--description(v-if="description")
        | {{ description }}
    .state-button--left.state-button--state(v-if="state")
      Icon(v-bind="state")
</template>

<script>
import Icon from "~/components/medias/Icon.vue";

export default {
  components: {
    Icon
  },
  props: ["title", "description", "state", "active"]
};
</script>
<style lang="sass">
.state-button
  padding: 10px
  border: 3px solid #51aca5
  box-sizing: border-box
  color: white
  cursor: pointer
  transition: background-color .3s ease-in-out
  user-select: none
  display: flex

  &--active
    background-color: #61dcc5

  &:hover
    background-color: #3ce5ca

  &--right
    width: 100%

  &--left
    width: 20%

  &--title
    font-size: 15px
    font-weight: bold

  &--description
    font-size: 12px
</style>
