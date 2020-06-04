<template lang="pug">
  .cover-image(:style="styles")
</template>
<script>
export default {
  props: ["src"],
  computed: {
    styles() {
      return {
        "background-image": "url(" + this.src + ")"
      };
    }
  }
};
</script>
<style lang="sass">
.cover-image
  width: 100%
  height: 100%
  background-size: cover
</style>
