<template lang="pug">
  .prhythm
    EditorNav
      .prhythm--page(v-if="entity")
        h1
          | Rhythm {{ entity.output }}
        .prhythm--wave
          AudioWave.prhythm--track(:src="entity.path")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import AudioWave from "~/components/ui/audio/AudioWave";

export default {
  components: {
    EditorNav,
    AudioWave
  },
  computed: {
    entity() {
      return this.$store.state.editor.entity;
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
