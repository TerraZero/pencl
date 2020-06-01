<template lang="pug">
  .textfield
    .textfield--label(v-if="label")
      | {{ label }}
    .textfield--content
      input.textfield--input(type="text", :value="value", @input="$emit('input', $event.target.value)")
      .textfield--reset(v-if="reset")
        .textfield--button(@click="$emit('reset')")
          | {{ reset }}
    .textfield--description(v-if="$slots.default")
      slot
</template>

<script>
export default {
  props: ["label", "value", "reset"]
};
</script>
<style lang="sass">
.textfield
  width: 100%

  &--label
    display: inline-block
    background: #383838
    padding: 0.3em 1em
    margin-top: 1em
    font-size: 0.9em

  &--content
    display: flex
    min-height: 2em

  &--reset
    white-space: nowrap
    background: white
    color: #CCC
    padding: 0.2em

  &--button
    padding: 0 0.6em
    font-size: 0.8em
    line-height: 2em
    background: #444
    cursor: pointer

    &:hover
      background: #888

  &--input
    width: 100%
    color: black
    box-sizing: border-box
    border: 0
    outline: 0
    padding: 0.3em
    font-size: 1em

  &--description
    padding: 0.2em 1em
    background: #444
    font-size: 0.8em
    color: #CCC
</style>
