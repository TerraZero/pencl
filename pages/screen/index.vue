<template lang="pug">
  .screen
    Lobby
    transition(name="enter")
      .screen--intro(v-if="start", :class="{'screen--intro--blend': blend}")
        StarBackground.screen--background(stars="200")
        transition(name="swap-circle-left")
          .screen--logo-container(v-if="image", :key="image")
            .screen--logo
              img.screen--image(:src="image")
              .screen--insane(v-if="blend")
                | INSANE

</template>

<script>
import Lobby from "~/components/screen/Lobby.vue";
import Socket from "~/plugins/socket/screen";
import StarBackground from "~/components/backgrounds/StarBackground.vue";
import MediaSystem from "~/plugins/mediasystem";

export default {
  components: {
    Lobby,
    StarBackground
  },
  data() {
    return {
      icons: [
        "github.png",
        "github.png",
        "howler.png",
        "youtube.png",
        "sass.png",
        "pug.png",
        "html5.svg",
        "css3.svg",
        "js.png",
        "node.png",
        "npm.png",
        "socketio.png",
        "vscode.png",
        "vue.png",
        "webpack.png",
        "tz.svg"
      ],
      blend: false,
      current: null,
      start: false
    };
  },
  computed: {
    image() {
      if (this.current === null) return false;
      return "/images/logos/" + this.icons[this.current];
    }
  },
  mounted() {
    Socket.events.on("screen:start", () => {
      this.start = true;
      setTimeout(() => {
        MediaSystem.system.playFile("/sound/intro.mp3");
        const interval = setInterval(() => {
          if (this.current === this.icons.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              this.blend = true;
              setTimeout(() => {
                this.$router.push({
                  path: "/screen/game"
                });
              }, 5000);
            }, 1000);
          } else {
            this.current++;
          }
        }, 12000 / this.icons.length);
      }, 1000);
    });
  }
};
</script>

<style lang="sass">
.screen
  width: 100%
  height: 100%

  &--intro
    opacity: 1
    background: black
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    overflow: hidden
    transition: background .3s ease-in-out

  &--intro--blend
    background: white

  &--intro--blend &--logo
    filter: drop-shadow(2px 2px 10px white) invert(1)

  &--background
    z-index: 0

  &--logo-container
    position: relative
    width: 100%
    height: 100%

  &--logo
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    max-width: 600px
    max-height: 600px
    filter: drop-shadow(2px 2px 10px white)
    transition: filter .3s
    display: flex
    flex-direction: column
    width: 100%

  &--image
    width: 100%

  &--insane
    text-align: center
    font-size: 150px
    font-weight: bold
</style>
