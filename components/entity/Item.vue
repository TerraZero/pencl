<template lang="pug">
  .item
    .item--tag-slot(v-if="$slots.tag")
      .item--tag
        slot(name="tag")
    .item--content
      slot
    .item--controlls(v-if="$slots.controlls")
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
    font-size: 0.8em

  &--tag
    padding: 0.3em
    display: inline-block
    background: #333

  &--content
    padding: 1em 0.5em

  &--controlls
    align-self: flex-end
</style>
