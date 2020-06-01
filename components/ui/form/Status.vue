<template lang="pug">
  .status(v-if="open", :class="'status--' + status")
    .status--message
      | {{ message }}
    .status--close(@click="open = false")
      | X
</template>

<script>
export default {
  props: ["status", "message"],
  data() {
    return {
      open: true
    };
  }
};
</script>
<style lang="sass">
.status
  width: 100%
  padding: 10px
  box-sizing: border-box
  display: flex

  &--message
    width: 100%

  &--close
    cursor: pointer

  &--info
    background: #5bc0de

  &--success
    background: #5cb85c

  &--warning
    background: #f0ad4e

  &--error
    background: #d9534f

</style>
