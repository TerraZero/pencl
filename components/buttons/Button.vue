<template lang="pug">
  .button
    | {{ text }}
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style lang="sass">
.button
  display: inline-block
  cursor: pointer
  padding: 1em
  background: #222
  transition: background .3s ease-in-out

  &:hover
    background: #555

</style>
