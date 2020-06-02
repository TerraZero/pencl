<template lang="pug">
  .audio-wave
    .audio-wave--track(@wheel="wheel")
      #audio-wave--timeline
      #audio-wave--canvas
      #audio-wave--minimap
    .audio-wave--controlls
      .audio-wave--times(:style="timesStyling")
        | {{ times }}
      .audio-wave--volume
        Range(min="0", max="100", v-model="volume", @input="changeVolume")
    .audio-wave--regions
      ScrollPanel.audio-wave--scroll
        .audio-wave--region(v-for="region, index in regions", :class="regionClasses(region, index)")
          ControllButton.audio-wave--button(:icon="{cat: 'api', name: 'trash'}")
          .audio-wave--text(@click="toRegion(region)")
            | {{ region.time.toFixed(2) }}

</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions";

import ScrollPanel from "~/components/ui/panel/ScrollPanel";
import Range from "~/components/ui/form/Range";
import ControllButton from "~/components/buttons/ControllButton";

let wavesurfer = null;

export default {
  components: {
    ScrollPanel,
    Range,
    ControllButton
  },
  props: ["src", "disabled"],
  data() {
    return {
      controll: false,
      current: 0,
      duration: 0,
      maxZoom: null,
      zoom: null,
      volume: 100,
      content: null,
      currentRegion: null,
      regions: []
    };
  },
  computed: {
    times() {
      const duration = this.duration.toFixed(2);
      const current = this.current.toFixed(2);
      let line = current + " | " + duration;

      return "0".repeat((duration + "").length - (current + "").length) + line;
    },
    timesStyling() {
      return {
        width: this.times.length + 1 + "ch"
      };
    }
  },
  methods: {
    regionClasses(region, index) {
      const classes = ["audio-wave--region--i" + index];

      if (this.currentRegion === region.time) {
        classes.push("audio-wave--region--current");
      }
      return classes;
    },
    addRegion() {
      const current = wavesurfer.getCurrentTime();
      const region = wavesurfer.addRegion({
        start: current,
        end: current + 0.2
      });

      this.regions.push({
        time: current
      });
      this.regions.sort((a, b) => {
        return a.time - b.time;
      });
    },
    toRegion(region) {
      wavesurfer.seekTo(region.time / this.duration);
    },
    updateRegions() {
      const region = wavesurfer.regions.getCurrentRegion();

      this.currentRegion = region ? region.start : null;
      if (region) {
        const index = this.regions.findIndex(a => {
          return a.time === this.currentRegion;
        });
        const el = this.$el.querySelector(".audio-wave--region--i" + index);
        el.scrollIntoView(false);
      }
    },
    wheel(e) {
      if (this.disabled || !this.controll) return;
      if (e.deltaY < 0) {
        this.zoom = Math.max(this.maxZoom, this.zoom + this.maxZoom / 2);
      } else {
        this.zoom -= this.maxZoom;
      }
      wavesurfer.zoom(this.zoom);
      e.stopPropagation();
      e.preventDefault();
    },
    keydown(e) {
      if (this.disabled) return;
      if (e.code === "ControlLeft") {
        this.controll = true;
      }
      if (e.code === "KeyT") {
        this.times.push(Math.floor(music.seek() * 1000));
      }
      if (e.code === "KeyW") {
        this.volume += 1;
        if (this.volume > 100) this.volume = 100;
        this.changeVolume();
      }
      if (e.code === "KeyS") {
        this.volume -= 1;
        if (this.volume < 0) this.volume = 0;
        this.changeVolume();
      }
      if (e.code === "KeyQ") {
        wavesurfer.seekTo(0);
      }
      if (e.code === "KeyA") {
        wavesurfer.skipBackward();
      }
      if (e.code === "KeyD") {
        wavesurfer.skipForward();
      }
      if (e.code === "KeyE") {
        this.addRegion();
      }
      if (e.code === "Space") {
        wavesurfer.playPause();
      }
    },
    keyup(e) {
      if (this.disabled) return;
      if (e.code === "ControlLeft") {
        this.controll = false;
      }
      if (e.code === "KeyT") {
        this.times.push(Math.floor(music.seek() * 1000));
      }
    },
    changeVolume() {
      wavesurfer.setVolume(this.volume / 100);
    }
  },
  beforeDestroy() {
    wavesurfer.stop();
    wavesurfer = null;
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  },
  async mounted() {
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

    wavesurfer = WaveSurfer.create({
      container: "#audio-wave--canvas",
      skipLength: 0.5,
      plugins: [
        Minimap.create({
          container: "#audio-wave--minimap",
          waveColor: "#333",
          progressColor: "#000",
          height: 50
        }),
        Timeline.create({
          container: "#audio-wave--timeline"
        }),
        Regions.create()
      ]
    });
    wavesurfer.load(this.src);
    wavesurfer.on("audioprocess", current => {
      this.current = current;
      this.updateRegions();
    });
    wavesurfer.on("seek", current => {
      this.current = this.duration * current;
      this.updateRegions();
    });
    wavesurfer.on("ready", () => {
      this.duration = wavesurfer.getDuration();

      const width =
        wavesurfer.params.fillParent && !wavesurfer.params.scrollParent
          ? wavesurfer.drawer.getWidth()
          : wavesurfer.drawer.wrapper.scrollWidth *
            wavesurfer.params.pixelRatio;

      this.maxZoom = width / this.duration;
      this.zoom = this.maxZoom;
      this.$emit("init", { wavesurfer });
    });
  }
};
</script>
<style lang="sass">
.audio-wave

  &--track
    width: 100%

  &--times
    font-family: roboto-mono

  &--volume
    width: 20%

  &--regions
    border: 1px solid #BBB
    border-left-width: 0
    border-right-width: 0

  &--scroll
    max-height: 20em

  &--region
    display: flex
    font-family: roboto-mono
    border: 1px solid #BBB
    border-left-width: 0
    border-right-width: 0
    background: #999
    cursor: pointer

    &:nth-child(2n)
      background: #888

    &--current,
    &:hover
      background: #666 !important

  &--text
    padding: 0 1em
    line-height: 2em
    width: 100%

</style>
