<template lang="pug">
  .prandom
    Timeline
</template>

<script>
import RandomText from "~/components/text/RandomText";
import Timeline from "~/components/special/Timeline";

export default {
  components: {
    RandomText,
    Timeline
  }
};
</script>

<style lang="sass">
.prandom
  background: black
  width: 100%
  height: 100%
</style>
