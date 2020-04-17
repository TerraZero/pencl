<template lang="pug">
  .pgame
    Game
</template>

<script>
import Socket from "~/plugins/socket/screen";
import Game from "~/components/screen/Game";
export default {
  components: {
    Game
  }
};
</script>

<style lang="sass">
.pgame
  width: 100%
  height: 100%
</style>
