<template lang="pug">
  .game
    transition(name="enter")
      MediaShow.game--screen(v-if="screen === 'mediashow'", ref="mediashowscreen", :images="images", :speed="imagespeed")
    transition(name="enter")
      TextShow.game--screen(v-if="title", :key="title", :title="title", :subtitle="subtitle")
    transition(name="enter", @after-enter="starttimeline")
      Timeline.game--screen(v-if="screen === 'timeline'", ref="timelinescreen", :time="timeline.time", :list="timeline.list")
    transition(name="enter")
      Logo.game--screen(v-if="showlogo", ref="logoscreen", @ready="startlogo")
    transition(name="enter")
      Loading.game--screen(v-if="showloading", ref="loadingscreen")
</template>

<script>
import Loading from "~/components/medias/Loading";
import Logo from "~/components/medias/Logo";
import Timeline from "~/components/special/Timeline";
import MediaShow from "~/components/screen/MediaShow";
import TextShow from "~/components/screen/TextShow";

import Mediasystem from "~/plugins/mediasystem";
import Socket from "~/plugins/socket/screen";

export default {
  components: {
    Logo,
    Loading,
    Timeline,
    MediaShow,
    TextShow
  },
  data() {
    return {
      showloading: true,
      showlogo: false,
      logoanimate: true,
      screen: null,
      images: null,
      imagespeed: 10000,
      timeline: {
        time: 0,
        list: []
      },
      title: null,
      subtitle: null
    };
  },
  computed: {},
  methods: {
    starttimeline() {
      this.$refs.timelinescreen.start().then(() => {
        this.screen = null;
      });
    },
    startlogo() {
      if (this.logoanimate) {
        this.$refs.logoscreen.start();
      } else {
        this.$refs.logoscreen.show();
      }
    }
  },
  mounted() {
    Mediasystem.mount(this);
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
