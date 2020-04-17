<template lang="pug">
  .user
    StarBackground(stars="100")
    Icon.user--icon(cat="sciflat", name="user", bg="1")
    .user--text
      | Your are {{ uuid }}
    .user--status
      | User interface not implemented!
</template>

<script>
import Socket from "~/plugins/socket/client";
import Icon from "~/components/medias/Icon.vue";
import StarBackground from "~/components/backgrounds/StarBackground.vue";

export default {
  components: {
    Icon,
    StarBackground
  },
  computed: {
    uuid() {
      return Socket.uuid;
    }
  }
};
</script>

<style lang="sass">
.user
  width: 100%
  height: 100%
  display: flex
  align-items: center
  flex-wrap: wrap

  &--text,
  &--status
    width: 100%
    text-align: center
    font-size: 30px
    text-shadow: 2px 2px 10px black

  &--status
    color: red

  &--icon
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 40vw
    height: 40vw
    filter: blur(5px)
    z-index: -1
    opacity: .6

</style>
