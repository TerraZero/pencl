<template lang="pug">
  .host
    .host--left
      .host--controlls
        Button.host--intro-button(text="Intro", @click.native="intro")
        Button.host--intro-button(text="Logo", @click.native="logo")
      .host--timeline
        Select.host--timeline-time(v-model="time", :options="timelineOptions")
        Textfield.host--textfield.host--timeline-list(v-for="value, index in list", :key="index", v-model="list[index]")
        .host--timeline-controlls
          Button.host--timeline-button(text="Timeline", @click.native="timeline")
      .host--text
        Textfield.host--textfield.host--text-title(v-model="title")
        Textfield.host--textfield.host--text-subtitle(v-model="subtitle")
        .host--controlls
          Button.host--text-button(text="Text", @click.native="sendText")
      .host--controlls
        Button.host--cancel(text="Cancel Sound", @click.native="cancel('sound')")
    .host--right
      .host--item(v-for="scene in scenes", @click="sendScene(scene)")
        | {{ scene.title }}
</template>

<script>
import Button from "~/components/buttons/Button";

import Textfield from "~/components/ui/form/Textfield";
import Select from "~/components/ui/form/Select";

import Socket from "~/plugins/socket/admin";

export default {
  components: {
    Button,
    Select,
    Textfield
  },
  data() {
    return {
      scenes: null,
      time: 0,
      list: ["", "", "", "", ""],
      title: "",
      subtitle: ""
    };
  },
  computed: {
    timelineOptions() {
      return new Array(24).fill(0).map((v, i) => i);
    }
  },
  methods: {
    timeline() {
      Socket.request("game/media", {
        type: "timeline",
        data: {
          time: this.time,
          list: this.list
        }
      });
    },
    intro() {
      Socket.request("game/media", {
        type: "intro"
      });
    },
    logo() {
      Socket.request("game/media", {
        type: "logo"
      });
    },
    sendScene(scene) {
      Socket.request("game/media", {
        type: scene.type,
        data: scene
      });
    },
    sendText() {
      Socket.request("game/media", {
        type: "text",
        data: {
          title: this.title,
          subtitle: this.subtitle
        }
      });
    },
    cancel(type) {
      Socket.request("game/media", {
        type: "cancel",
        data: {
          type: type
        }
      });
    }
  },
  async mounted() {
    const response = await Socket.request("editor/getScenes");
    this.scenes = response.data;
  }
};
</script>

<style lang="sass">
.host
  display: flex
  width: 100%
  height: 100%
  overflow: hidden

  &--left,
  &--right
    width: 100%
    padding: 2em
    overflow: auto

  &--textfield
    padding-top: 0.5em

  &--controlls
    padding: 1em 0

  &--item
    padding: 1em
    background: #222
    cursor: pointer
    transition: background .3s ease-in-out

    &:hover
      background: #555

    & + &
      margin-top: 0.5em

  &--cancel
    background: red
</style>
