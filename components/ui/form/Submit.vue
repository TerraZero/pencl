<template lang="pug">
  .submit
    | {{ label }}
</template>

<script>
export default {
  props: ["label"]
};
</script>
<style lang="sass">
.submit
  display: inline-block
  border: 0
  padding: 10px
  background: #121111
  cursor: pointer
  transition: background .3s ease-in-out

  &:hover
    background: #dedede
</style>
