<template lang="pug">
  .pmusic(@click="testclick")
    Process(v-if="process", :uuid="process.uuid", style="height: 30px;")
    .pmusic--left
      ScrollPanel.pmusic--scroll
        .pmusic--item(v-for="item in items", :key="item.output", @click="click(item)")
          | {{ item.output }}
    .pmusic--right
      .pmusic--title(v-if="focus")
        | {{ focus.output }}
      .pmusic--controlls(v-if="focus")
        .pmusic--button.pmusic--play(@click="controll")
          | {{ state ? 'Stop' : 'Play' }}
        .pmusic--current-time
          | {{ seek }} / {{ duration }}
      .pmusic--results(v-if="focus")
        .pmusic--time(v-for="time of times")
          | {{ time }}
      .pmusic--audiowave(v-if="focus")
        AudioWave(:src="focus.output", :key="focus.output")
</template>

<script>
import data from "~/static/data/downloads/music.json";
import { Howl } from "howler";

import ScrollPanel from "~/components/lists/ScrollPanel";
import AudioWave from "~/components/ui/audio/AudioWave";

import Socket from "~/plugins/socket/client";
import Process from "~/components/system/Process";

let music = null;
let interval = null;

export default {
  components: {
    ScrollPanel,
    AudioWave,
    Process
  },
  data() {
    return {
      process: null,
      seek: 0,
      duration: 0,
      state: false,
      focus: null,
      times: []
    };
  },
  computed: {
    items() {
      return data;
    }
  },
  methods: {
    async testclick() {
      const response = await Socket.request("testProcess", {
        total: 100,
        interval: 500
      });
      this.process = response.data;
    },
    click(item) {
      this.focus = item;
      this.times = [];
      this.seek = 0;
      this.duration = 0;
      this.stop();
    },
    controll() {
      if (this.state) {
        this.stop();
      } else {
        this.play();
      }
    },
    stop() {
      if (!this.state) return;
      music.stop();
      music = null;
      clearInterval(interval);
      this.seek = 0;
      this.state = false;
    },
    play() {
      if (this.state) return;
      music = new Howl({
        src: "/downloads/music/" + this.focus.output
      });
      music.on("load", () => {
        music.play();
        this.duration = music.duration();
        interval = setInterval(() => {
          this.seek = music.seek();
        }, 200);
      });
      this.state = true;
    },
    keydown(e) {
      if (e.code === "Space") {
        this.times.push(Math.floor(music.seek() * 1000));
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keydown);
  }
};
</script>

<style lang="sass">
.pmusic
  width: 100%
  height: 100%
  position: relative
  overflow: hidden
  display: flex

  &--scroll
    overflow-x: hidden

  &--left
    background: #AAA

  &--right
    width: 100%

  &--item
    padding: 10px
    border: 1px solid grey
    box-sizing: border-box
    cursor: pointer
    transition: background .3s

    &:hover
      background: grey

  &--button
    display: inline-block
    padding: 10px
    background: #AAA
    border: 1px solid grey
    transition: background .3s
    cursor: pointer

    &:hover
      background: grey

  &--times
    margin-top: 10px

  &--time
    display: inline-block
    padding: 5px
    margin: 10px
    background: #AAA
    border: 1px solid grey

</style>
