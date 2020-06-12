<template lang="pug">
  .image-item
    AspectRadioFrame.image-item--frame
      CoverImage.image-item--image(:src="src")
      slot(name="image")
    .image-item--details(v-if="$slots.default")
      slot
</template>

<script>
import AspectRadioFrame from "~/components/ui/frame/AspectRadioFrame";
import CoverImage from "~/components/medias/CoverImage";

export default {
  components: {
    AspectRadioFrame,
    CoverImage
  },
  props: ["src"]
};
</script>
<style lang="sass">
.image-item

  &--details
    padding: 1em
    background: #121111
</style>
