<template lang="pug">
  .item
    .item--tag-slot(v-if="$slots.tag")
      .item--tag
        slot(name="tag")
    .form--content
      slot
    .form--controlls(v-if="$slots.controlls")
      slot(name="controlls")
</template>

<script>
export default {};
</script>
<style lang="sass">
.item
  display: flex
  flex-direction: column
  background: #222

  &--tag-slot
    font-size: 0.5em

  &--tag
    padding: 0.3em
    display: inline-block
    background: #333

  &--controlls
    align-self: flex-end
</style>
