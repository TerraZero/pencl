<template lang="pug">
  .container
    | {{ getText }}
    .player(:style="style")
</template>

<script>
import Gamepad from "~/plugins/gamepad/test";

export default {
  data() {
    return {
      text: "start",
      button: true,
      x: 0,
      y: 0,
      px: 0,
      py: 0
    };
  },
  computed: {
    getText() {
      if (this.button) {
        return this.text;
      } else {
        return (
          this.text +
          " [" +
          Math.round(this.x * 100) +
          " / " +
          Math.round(this.y * 100) +
          "]"
        );
      }
    },
    style() {
      return {
        left: this.px + "px",
        top: this.py + "px"
      };
    }
  },
  mounted() {
    Gamepad.addListener("button-a", {}, () => {
      this.text = "A";
      this.button = true;
    });
    Gamepad.addListener("button-b", {}, () => {
      this.text = "B";
      this.button = true;
    });
    Gamepad.addListener("button-x", {}, () => {
      this.text = "X";
      this.button = true;
    });
    Gamepad.addListener("button-y", {}, () => {
      this.text = "Y";
      this.button = true;
    });
    Gamepad.addListener("left-analog-down", { repeat: true }, percentage => {
      this.text = "L Stick";
      this.button = false;
      this.y = percentage;
    });
    Gamepad.addListener("left-analog-right", { repeat: true }, percentage => {
      this.text = "L Stick";
      this.button = false;
      this.x = percentage;
    });
    Gamepad.addListener("right-analog-down", { repeat: true }, percentage => {
      this.text = "R Stick";
      this.button = false;
      this.y = percentage;
    });
    Gamepad.addListener("right-analog-right", { repeat: true }, percentage => {
      this.text = "R Stick";
      this.button = false;
      this.x = percentage;
    });
    Gamepad.addListener("left-analog-up", { repeat: true }, percentage => {
      this.text = "L Stick";
      this.button = false;
      this.y = percentage;
    });
    Gamepad.addListener("left-analog-left", { repeat: true }, percentage => {
      this.text = "L Stick";
      this.button = false;
      this.x = percentage;
    });
    Gamepad.addListener("right-analog-up", { repeat: true }, percentage => {
      this.text = "R Stick";
      this.button = false;
      this.y = percentage;
    });
    Gamepad.addListener("right-analog-left", { repeat: true }, percentage => {
      this.text = "R Stick";
      this.button = false;
      this.x = percentage;
    });
    setInterval(() => {
      this.px += this.x * 5;
      this.py += this.y * 5;
    }, 50);
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
  position: relative

.player
  position: absolute
  width: 10px
  height: 10px
  background: red
</style>
