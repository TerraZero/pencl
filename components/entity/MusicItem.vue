<template lang="pug">
  .music-item
    .music-item--details(v-if="$slots.default")
      slot
    .music-item--controlls(v-if="$slots.controlls")
      slot(name="controlls")
</template>

<script>
export default {};
</script>
<style lang="sass">
.music-item
  flex: 1 1 21em
  background: #121111

  &--details
    padding: 1em
</style>
