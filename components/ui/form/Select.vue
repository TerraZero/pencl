<template lang="pug">
  .select
    .select--label(v-if="label")
      | {{ label }}
    select.select--input(:value="value", @input="$emit('input', $event.target.value)")
      option(v-for="(option, key) in options", :value="key")
        | {{ option }}
</template>

<script>
export default {
  props: ["label", "value", "options"]
};
</script>
<style lang="sass">
.select
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
    cursor: pointer
    font-size: 1em
</style>
