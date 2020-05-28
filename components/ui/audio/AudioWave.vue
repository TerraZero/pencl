<template lang="pug">
  .audio-wave
    #audio-wave--canvas(@wheel="wheel")
</template>

<script>
import WaveSurfer from "wavesurfer";

let wavesurfer = null;

export default {
  props: ["src"],
  data() {
    return {
      duration: null,
      maxZoom: null,
      zoom: null,
      content: null
    };
  },
  methods: {
    wheel(e) {
      if (e.deltaY < 0) {
        this.zoom = Math.max(this.maxZoom, this.zoom + this.maxZoom);
      } else {
        this.zoom -= this.maxZoom;
      }
      wavesurfer.zoom(this.zoom);
    }
  },
  async mounted() {
    wavesurfer = WaveSurfer.create({
      container: "#audio-wave--canvas",
      waveColor: "violet",
      progressColor: "purple"
    });
    wavesurfer.load("/downloads/music/" + this.src);
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

</style>
