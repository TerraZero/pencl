<template lang="pug">
  .icon
    img.icon--background(:src="icon.background", v-if="icon.background")
    img.icon--image(:src="icon.image")
</template>

<script>
export default {
  props: ["cat", "name", "bg", "type", "src"],
  computed: {
    source() {
      return this.src || "static";
    },
    filetype() {
      return this.type || "png";
    },
    imagepath() {
      return this.cat + "/" + this.cat + "_" + this.name + "." + this.filetype;
    },
    backgroundpath() {
      if (this.bg) {
        return (
          this.cat + "/" + this.cat + "_bg_" + this.bg + "." + this.filetype
        );
      }
      return false;
    },
    icon() {
      const icon = {
        image: "icons/" + this.imagepath,
        background: this.backgroundpath ? "icons/" + this.backgroundpath : null
      };

      if (this.source === "static") {
        icon.image = "/images/" + icon.image;
        if (icon.background) {
          icon.background = "/images/" + icon.background;
        }
      }

      if (this.source === "assets") {
        icon.image = require("~/assets/images/" + icon.image);
        if (icon.background) {
          icon.background = require("~/assets/images/" + icon.background);
        }
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
