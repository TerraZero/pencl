<template lang="pug">
  .audio-wave
    .audio-wave--track(@wheel="wheel")
      #audio-wave--timeline
      #audio-wave--canvas
      #audio-wave--minimap
    .audio-wave--volume
      Range(min="0", max="100", vertical="true", v-model="volume", @input="changeVolume")
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline";

import Range from "~/components/ui/form/Range";

let wavesurfer = null;

export default {
  components: {
    Range
  },
  props: ["src", "disabled"],
  data() {
    return {
      controll: false,
      duration: null,
      maxZoom: null,
      zoom: null,
      volume: 100,
      content: null
    };
  },
  methods: {
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
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  },
  async mounted() {
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

    wavesurfer = WaveSurfer.create({
      container: "#audio-wave--canvas",
      plugins: [
        Minimap.create({
          container: "#audio-wave--minimap",
          waveColor: "#333",
          progressColor: "#000",
          height: 50
        }),
        Timeline.create({
          container: "#audio-wave--timeline"
        })
      ]
    });
    wavesurfer.load(this.src);
    wavesurfer.on("ready", () => {
      this.duration = wavesurfer.getDuration();

      const width =
        wavesurfer.params.fillParent && !wavesurfer.params.scrollParent
          ? wavesurfer.drawer.getWidth()
          : wavesurfer.drawer.wrapper.scrollWidth *
            wavesurfer.params.pixelRatio;

      this.maxZoom = width / this.duration;
      this.zoom = this.maxZoom;
    });
  }
};
</script>
<style lang="sass">
.audio-wave
  display: flex

  &--track
    width: 100%

  &--volume
    width: 25px
    -webkit-appearance: slider-vertical
</style>
