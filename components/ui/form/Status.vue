<template lang="pug">
  .status(:class="'status--' + status")
    | {{ message }}
</template>

<script>
export default {
  props: ["status", "message"]
};
</script>
<style lang="sass">
.status
  width: 100%
  padding: 10px
  box-sizing: border-box

  &--info
    background: #5bc0de

  &--success
    background: #5cb85c

  &--warning
    background: #f0ad4e

  &--error
    background: #d9534f

</style>
