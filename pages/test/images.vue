<template lang="pug">
  .pimages
    MediaShow(:images="images", :opacity="opacity")
</template>

<script>
import MediaShow from "~/components/screen/MediaShow";

export default {
  components: {
    MediaShow
  },
  data() {
    return {
      opacity: 0.2,
      images: [
        "/downloads/backgrounds/enforcer.jpg",
        "/downloads/backgrounds/enforcer2.jpg",
        "/downloads/backgrounds/enforcer3.jpg",
        "/downloads/backgrounds/enforcer4.jpg",
        "/downloads/backgrounds/enforcer5.jpg",
        "/downloads/backgrounds/enforcer6.jpg",
        "/downloads/backgrounds/enforcer7.jpg",
        "/downloads/backgrounds/enforcer8.jpg"
      ]
    };
  }
};
</script>

<style lang="sass">
.pimages
  background: black
  width: 100%
  height: 100%
</style>
