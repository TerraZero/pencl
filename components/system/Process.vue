<template lang="pug">
  .process
    .process--bar(:style="styles")
    .process--message(v-if="message")
      | {{ percentage }} | {{ message }}
</template>

<script>
import Socket from "~/plugins/socket/client";
let interval = null;

export default {
  props: ["uuid"],
  data() {
    return {
      total: 1,
      current: 0,
      message: null,
      state: 0
    };
  },
  computed: {
    percentage() {
      return Math.floor((100 * this.current) / this.total) + "%";
    },
    styles() {
      return {
        width: this.percentage
      };
    }
  },
  mounted() {
    interval = setInterval(async () => {
      const response = await Socket.request("process", { process: this.uuid });

      this.current = response.data.process.current;
      this.total = response.data.process.total;
      this.state = response.data.process.state;
      this.message = response.data.process.message || null;
      if (this.state === 2) {
        clearInterval(interval);
        this.$emit("finished", response.data.process);
      }
    }, 200);
  }
};
</script>
<style lang="sass">
.process
  width: 100%
  background: grey
  position: relative

  &--bar
    display: inline-block
    height: 100%
    background: #AAA
    transition: width .3s ease-in-out

  &--message
    position: absolute
    top: 0
    left: 0
    padding: 5px

</style>
