<template lang="pug">
  .container(@click="click")
    | {{ text }}
</template>

<script>
import Manager from "~/plugins/manager";
import Socket from "../plugins/socket/client";

export default {
  data() {
    return {
      text: "start"
    };
  },
  methods: {
    click() {
      Socket.request("setData", {
        component: "index",
        values: {
          text: "hallo"
        }
      });
      // this.$router.push({
      //   path: "/hallo/huhu"
      // });
    }
  },
  mounted() {
    Socket.register("index", this);
  }
};
</script>

<style lang="sass">
.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center
</style>
