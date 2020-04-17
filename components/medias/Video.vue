<template lang="pug">
  .video
    video.video--video(:id="id")
</template>

<script>
import MediaSystem from "~/plugins/mediasystem";

export default {
  props: ["id"],
  mounted() {
    MediaSystem.system.register(this.id, this);
  }
};
</script>
<style lang="sass">
.video
  width: 100%
  height: 100%

  &--video
    width: 100%
    height: 100%
</style>
