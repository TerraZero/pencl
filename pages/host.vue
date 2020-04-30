<template lang="pug">
  .host
    .host--master
      Icon.host--master-button(@click.native="start()", cat="api", name="power", type="svg")
      Icon.host--master-button(cat="api", name="play", type="svg")
      Icon.host--master-button(@click.native="stop()", cat="api", name="stop", type="svg")
      Icon.host--master-button(cat="api", name="next", type="svg")
    .host--content
      .host--music
        .host--title
          | Sounds
        ScrollPanel.host--music-content.host--scroll
          PlayButton(v-if="medias.sounds", v-for="sound, index in medias.sounds", :key="index", v-bind="sound", @action:playlist="playlist(sound)", @action:play="playSound(sound)")
      .host--scene
        .host--title
          | Scenes
        ScrollPanel.host--scene-content.host--scroll
          PlayButton(v-if="medias.scenes", v-for="scene, index in medias.scenes", :key="index", v-bind="scene", @action:playlist="playlist(scene)", @action:play="play(scene)")

</template>

<script>
import Socket from "~/plugins/socket/admin";
import Icon from "~/components/medias/Icon.vue";
import ScrollPanel from "~/components/lists/ScrollPanel.vue";
import PlayButton from "~/components/buttons/PlayButton.vue";
import Calc from "~/plugins/util/Calc";

export default {
  components: {
    ScrollPanel,
    PlayButton,
    Icon
  },
  data() {
    return {
      medias: {
        sounds: null
      }
    };
  },
  methods: {
    start() {
      Socket.trigger("screen:start");
    },
    stop() {
      Socket.request("updateScreen", {
        route: "stop",
        params: {}
      });
    },
    playlist(video) {},
    playSound(video) {
      if (video.type === "event") {
        Socket.request("updateScreen", {
          route: "event",
          params: {
            data: video
          }
        });
        return;
      }
      if (video.type === "clip") {
        Socket.request("updateScreen", {
          route: "clip",
          params: {
            data: video
          }
        });
        return;
      }
      if (video.type === "text") {
        Socket.request("updateScreen", {
          route: "text",
          params: {
            data: video
          }
        });
        return;
      }
      let sound = null;
      if (Array.isArray(video.sound)) {
        sound = video.sound[Calc.random(0, video.sound.length - 1)];
      } else {
        sound = video.sound;
      }

      Socket.request("updateScreen", {
        route: "sound",
        params: {
          data: sound
        }
      });
    },
    play(video) {
      Socket.request("updateScreen", {
        route: "scene",
        params: {
          data: video
        }
      });
    }
  },
  mounted() {
    fetch("/data/medias.json").then(response => {
      response.json().then(data => {
        this.medias = data;
      });
    });
  }
};
</script>

<style lang="sass">
.host
  display: flex
  width: 100%
  height: 100%
  overflow: hidden
  flex-direction: column

  &--master
    display: flex
    height: 10vh
    padding: 0 10%

  &--master-button
    border: 1px solid #3ce5ca
    background: #3c8c74
    cursor: pointer
    box-sizing: border-box
    border-bottom-width: 0

    & .icon--image
      padding: 5%

  &--content
    display: flex
    height: 90vh
    box-sizing: border-box

  &--status
    min-height: 100px

  &--music,
  &--scene
    width: 100%

  &--title
    font-size: 22px
    padding: 10px
    border: 1px solid #3ce5ca
    background: #3c8c74

  &--scroll
    height: calc(100% - 48px)
</style>
