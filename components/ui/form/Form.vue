<template lang="pug">
  .form
    .form--fields
      slot(name="fields")
    .form--actions(v-if="$slots.actions")
      slot(name="actions")
</template>

<script>
export default {};
</script>
<style lang="sass">
.form

  &--actions
    padding: 20px 0
</style>
