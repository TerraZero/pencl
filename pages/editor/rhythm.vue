<template lang="pug">
  .prhythm
    EditorNav(:selectOpen="false")
      template
        .prhythm--page(v-if="entity")
          h1
            | Rhythm {{ entity.output }}
          .prhythm--wave
            AudioWave.prhythm--track(:src="entity.path", @init="initWave")
      template(v-slot:select)

</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import AudioWave from "~/components/ui/audio/AudioWave";

import animations from "~/static/data/info/animations.json";

export default {
  components: {
    EditorNav,
    AudioWave
  },
  computed: {
    entity() {
      return this.$store.state.editor.entity;
    }
  },
  methods: {
    initWave({ wavesurfer }) {
      console.log(wavesurfer);
    }
  }
};
</script>

<style lang="sass">
.prhythm
  width: 100%
  height: 100%

  &--track
    background: #777
</style>
