<template lang="pug">
  .textfield
    .textfield--label(v-if="label")
      | {{ label }}
    input.textfield--input(type="text", :value="value", @input="$emit('input', $event.target.value)")
</template>

<script>
export default {
  props: ["label", "value"]
};
</script>
<style lang="sass">
.textfield
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
</style>
