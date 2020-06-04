<template lang="pug">
  .audio-wave
    .audio-wave--track(@wheel="wheel")
      #audio-wave--timeline
      #audio-wave--canvas
      #audio-wave--minimap
    .audio-wave--controlls
      ControllButton(:icon="{cat: 'api', name: 'save'}", @click.native.prevent.stop="save")
      ControllButton(:icon="{cat: 'api', name: 'upload'}", @click.native.prevent.stop="load")
      ControllButton(:icon="{cat: 'api', name: 'area'}", @click.native="regionOpen = !regionOpen")
      .audio-wave--times(:style="timesStyling")
        | {{ times }}
      .audio-wave--volume
        Range(min="0", max="100", v-model="volume", @input="changeVolume")
        .audio-wave--volume-value
          | {{ volume }}
      Select.audio-wave--master-animation(v-model="masterAnimation", :options="animationOptions")
      Select.audio-wave--master-effect(v-model="masterEffect", :options="animationOptions")
    .audio-wave--regions(v-if="regionOpen")
      ScrollPanel.audio-wave--scroll
        .audio-wave--region(v-for="region, index in regions")
          .audio-wave--region-head(@click="toRegion(region)")
            ControllButton.audio-wave--button(:icon="{cat: 'api', name: 'trash'}", @click.native.prevent.stop="removeRegion(region)")
            .audio-wave--text(:style="regionTextStyle")
              | {{ region.time.toFixed(2) }}
            .audio-wave--flex-fill
            ControllButton.audio-wave--button(:icon="{cat: 'api', name: 'menu'}", @click.native.prevent.stop="openRegion = region.id === openRegion ? null : region.id")
          .audio-wave--region-details(v-if="openRegion === region.id", @keydown.stop)
            .audio-wave--region-animation
              Textfield.audio-wave--region-name(label="Animation", v-model="region.animation.animation")
              Textfield.audio-wave--region-speed(label="Speed", v-model="region.animation.speed")
              Textfield.audio-wave--region-options(label="Options", v-model="region.animation.options")
              Select.audio-wave--region-preset(label="Preset", :options="animationOptions", @input="setRegionAni(region, 'animation', $event)")
            .audio-wave--region-effect
              Textfield.audio-wave--region-name(label="Effect", v-model="region.effect.animation")
              Textfield.audio-wave--region-speed(label="Speed", v-model="region.effect.speed")
              Textfield.audio-wave--region-options(label="Options", v-model="region.effect.options")
              Select.audio-wave--region-preset(label="Preset", :options="animationOptions", @input="setRegionAni(region, 'effect', $event)")
      .audio-wave--action-frame-wrapper
        ControllButton.audio-wave--fullscreen(:icon="{cat: 'api', name: 'fullscreen'}", @click.native="fullscreen = !fullscreen")
        AspectRadioFrame.audio-wave--aspect-radio-frame(:fullscreen="fullscreen")
          ActionFrame.audio-wave--action-frame(:animation="currentAnimation", :effect="currentEffect", @finish="currentEffect = null")
            img.audio-wave--test(src="https://images3.alphacoders.com/920/thumb-1920-920538.jpg")

</template>

<script>
const UUID = require("uuid").v4;
import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugin/wavesurfer.minimap";
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import Regions from "wavesurfer.js/dist/plugin/wavesurfer.regions";

import ScrollPanel from "~/components/ui/panel/ScrollPanel";
import Range from "~/components/ui/form/Range";
import Select from "~/components/ui/form/Select";
import Textfield from "~/components/ui/form/Textfield";
import ControllButton from "~/components/buttons/ControllButton";
import ActionFrame from "~/components/ui/frame/ActionFrame";
import AspectRadioFrame from "~/components/ui/frame/AspectRadioFrame";

import Socket from "~/plugins/socket/client";

import animations from "~/static/data/info/animations.json";

const animationOptions = [];

for (const animation of animations) {
  animationOptions.push(animation.name);
}

let wavesurfer = null;

export default {
  components: {
    ScrollPanel,
    Range,
    Select,
    ControllButton,
    ActionFrame,
    AspectRadioFrame,
    Textfield
  },
  props: ["src", "disabled", "entity"],
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
      regions: [],
      regionOpen: true,
      animationOptions: animationOptions,
      masterAnimation: 0,
      masterEffect: 0,
      currentAnimation: null,
      currentEffect: null,
      fullscreen: false,
      openRegion: null
    };
  },
  computed: {
    regionTextStyle() {
      return {
        width: this.timeWidth + "ch"
      };
    },
    timeWidth() {
      return this.duration.toFixed(2).length;
    },
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
    async load() {
      const response = await Socket.request("editor/loadRhythm", {
        entity: this.entity
      });

      if (response.isOK()) {
        for (const region of response.data) {
          wavesurfer.addRegion({
            start: region.time,
            end: region.time + 0.2,
            id: region.id
          });
        }
        this.regions = Object.freeze(response.data);
      } else {
        alert(response.data.error || "Error");
      }
    },
    async save() {
      const response = await Socket.request("editor/saveRhythm", {
        regions: this.regions,
        entity: this.entity
      });

      if (response.isOK()) {
        alert("Saved");
      } else {
        alert(response.data.error || "Error");
      }
    },
    setRegionAni(region, field, input) {
      region[field] = JSON.parse(JSON.stringify(animations[input]));
    },
    regionClasses(region, index) {
      const classes = ["audio-wave--region--i" + index];

      if (this.currentRegion === region.time) {
        classes.push("audio-wave--region--current");
      }
      return classes;
    },
    removeRegion(region) {
      wavesurfer.regions.list[region.id].remove();
      const index = this.regions.findIndex(a => {
        return a.time === region.time;
      });
      const regions = [...this.regions];
      regions.splice(index, 1);
      this.regions = Object.freeze(regions);
    },
    addRegion() {
      const current = wavesurfer.getCurrentTime();
      const exist = this.regions.find(region => {
        return region.time === current;
      });

      if (exist) return;

      const region = wavesurfer.addRegion({
        start: current,
        end: current + 0.2,
        id: UUID() + "_region"
      });

      this.regions = Object.freeze([
        ...this.regions,
        {
          id: region.id,
          time: current,
          animation: JSON.parse(
            JSON.stringify(animations[this.masterAnimation])
          ),
          effect: JSON.parse(JSON.stringify(animations[this.masterEffect]))
        }
      ]);
      this.sortRegions();
    },
    toRegion(region) {
      wavesurfer.seekTo(region.time / this.duration);
    },
    sortRegions() {
      const regions = [...this.regions];
      regions.sort((a, b) => {
        return a.time - b.time;
      });
      this.regions = Object.freeze(regions);
    },
    findRegion(region) {
      return this.regions.findIndex(a => {
        return a.id === region.id;
      });
    },
    updateRegions() {
      const region = wavesurfer.regions.getCurrentRegion();

      this.currentRegion = region ? region.start : null;
      if (region) {
        const index = this.findRegion(region);
        this.currentAnimation =
          this.regions[index].animation || this.currentAnimation;
        this.currentEffect = this.regions[index].effect || this.currentEffect;
        // const el = this.$el.querySelector(".audio-wave--region--i" + index);

        // if (el) {
        //   el.scrollIntoView({ block: "center" });
        // }
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
      if (e.code === "Escape") {
        this.fullscreen = false;
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
    wavesurfer.on("pause", () => {
      this.currentAnimation = null;
      this.currentEffect = null;
    });
    wavesurfer.on("play", () => {
      const current = wavesurfer.getCurrentTime();
      let animation = null;

      for (const region of this.regions) {
        if (region.time > current) break;
        animation = region.animation || animation;
      }
      this.currentAnimation = animation;
    });
    wavesurfer.on("region-updated", region => {
      const index = this.findRegion(region);

      this.regions[index].time = region.start;
      this.sortRegions();
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
    this.load();
  }
};
</script>
<style lang="sass">
.audio-wave

  &--track
    width: 100%

  &--times
    font-family: roboto-mono
    padding: 0 0.5em

  &--volume
    display: flex
    width: 20%
    align-items: center

  &--volume-value
    padding: 0 0.5em
    width: 3ch

  &--regions
    border: 1px solid #BBB
    border-left-width: 0
    border-right-width: 0
    display: flex
    height: calc(100vh - 9.5em - 200px)

  &--region
    background: #999

    &:nth-child(2n)
      background: #888

    &--current,
    &:hover
      background: #666 !important

  &--region-head
    display: flex
    font-family: roboto-mono
    border: 1px solid #BBB
    border-left-width: 0
    border-right-width: 0
    cursor: pointer

  &--region-details
    padding: 1em

  &--region-effect,
  &--region-animation
    display: flex

  &--region-name,
  &--region-speed,
  &--region-options
    padding: 0 5px

  &--region-preset
    width: 16em

  &--region-speed
    width: 8em

  &--flex-fill
    flex-grow: 1

  &--text
    padding: 0 1em
    line-height: 2em
    text-align: right

  &--controlls
    display: flex
    height: 2.5em
    align-items: center

  &--action-frame-wrapper
    display: flex
    align-items: center
    width: 40%
    padding: 1em
    box-sizing: border-box
    position: relative

  &--aspect-radio-frame
    width: 100%
    background: black
    border: 1px solid white

  &--test
    width: 100%
    height: 100%
    background: black

  &--master-animation,
  &--master-effect
    width: initial

  &--fullscreen
    position: absolute
    top: 5px
    right: 5px

</style>
