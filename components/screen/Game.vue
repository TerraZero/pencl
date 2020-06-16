<template lang="pug">
  .game(@click="click")
    transition(name="enter", @after-enter="startTimeline")
      Timeline.game--screen(v-if="screen === 'timeline'", ref="timelinescreen")
    transition(name="enter", @after-enter="startLogo")
      Logo.game--screen(v-if="showlogo", ref="logoscreen")
    transition(name="enter")
      Loading.game--screen(v-if="showloading", ref="loadingscreen")
</template>

<script>
import Loading from "~/components/medias/Loading";
import Logo from "~/components/medias/Logo";
import Timeline from "~/components/special/Timeline";

export default {
  components: {
    Logo,
    Loading,
    Timeline
  },
  data() {
    return {
      showloading: true,
      showlogo: false,
      screen: null
    };
  },
  computed: {},
  methods: {
    click() {
      if (this.showloading) {
        this.showloading = false;
        this.showlogo = true;
      }
    },
    startLogo() {
      this.$refs.logoscreen.start().then(() => {
        this.screen = "timeline";
      });
    },
    startTimeline() {
      this.$refs.timelinescreen.start().then(() => {
        this.screen = null;
      });
    }
  },
  mounted() {
    this.$refs.loadingscreen.setMode(0);
  }
};
</script>

<style lang="sass">
.game
  position: relative
  width: 100vw
  height: 100vh
  overflow: hidden

  &--screen
    position: absolute
    top: 0
    left: 0

</style>
