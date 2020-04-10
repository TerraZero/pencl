<template lang="pug">
  .icon
    img.icon--background(:src="icon.background", v-if="icon.background")
    img.icon--image(:src="icon.image")
</template>

<script>
export default {
  props: ["cat", "name", "bg", "type"],
  computed: {
    icon() {
      const type = this.type || "png";
      const icon = {
        image: require("~/assets/images/icons/" +
          this.cat +
          "/" +
          this.cat +
          "_" +
          this.name +
          "." +
          type),
        background: false
      };
      if (this.bg) {
        icon.background = require("~/assets/images/icons/" +
          this.cat +
          "/" +
          this.cat +
          "_bg_" +
          this.bg +
          "." +
          type);
      }
      return icon;
    }
  }
};
</script>
<style lang="sass">
.icon
  position: relative
  width: 100%
  height: 100%
  &--background,
  &--image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    box-sizing: border-box

  &--image
    padding: 15%
</style>
