<template lang="pug">
  .range(:class="classes")
    .range--label(v-if="label")
      | {{ label }}
    input.range--input(type="range", :min="min", :max="max", :value="value", @input="$emit('input', $event.target.value)")
</template>

<script>
export default {
  props: ["label", "value", "min", "max", "vertical"],
  computed: {
    classes() {
      if (this.vertical) {
        return "range--vertical";
      }
    }
  }
};
</script>
<style lang="sass">
.range
  width: 100%

  &--label
    margin-top: 3px
    margin-bottom: 5px

  &--input
    width: 100%
    color: black
    box-sizing: border-box
    border: 0
    outline: 0
    padding: 5px

  &--vertical
    height: 100%

  &--vertical &--input
    height: 100%
    -webkit-appearance: slider-vertical
</style>
