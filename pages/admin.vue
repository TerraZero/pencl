<template lang="pug">
  .index
    ScrollPanel.scroll
      StateButton(v-for="button, index in buttons", :key="index", v-bind="button", @click="click(index)")
</template>

<script>
import ScrollPanel from "~/components/lists/ScrollPanel.vue";
import StateButton from "~/components/buttons/StateButton.vue";

export default {
  components: {
    ScrollPanel,
    StateButton
  },
  data() {
    return {
      buttons: [
        {
          title: "Video 1",
          description:
            "Description 1dsfhfh sdfh shdfasdfsdf vsdf sdf sdf s fvsdh sh ",
          state: {
            cat: "flats",
            name: "music",
            type: "svg"
          },
          active: false
        }
      ]
    };
  },
  methods: {
    click(index) {
      const button = this.buttons[index];

      button.active = !button.active;
    }
  }
};
</script>

<style lang="sass">
.index
  width: 100%
  height: 100%
  overflow: hidden

  .scroll
    margin: 0 auto
    height: 400px
    border: 1px solid red
    width: 300px
    display: block
    overflow: auto
</style>
