<template lang="pug">
  .controll-button
    Icon(v-bind="icon")
</template>

<script>
import Icon from "~/components/medias/Icon.vue";

export default {
  components: {
    Icon
  },
  props: ["icon"]
};
</script>

<style lang="sass">
.controll-button
  display: inline-block
  vertical-align: middle
  width: 2em
  height: 2em
  text-align: center
  line-height: 2em
  background: #333
  box-sizing: border-box
  cursor: pointer
  transition: background .3s ease-in-out
  border: 1px solid #121111

  &:hover
    background: #444

  & + &
    border-left-width: 0
</style>
