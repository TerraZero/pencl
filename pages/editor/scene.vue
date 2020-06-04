<template lang="pug">
  .pscene
    EditorNav(:selectOpen="selectOpen")
      template
        h1
          | Scene
        ControllButton(:icon="{cat: 'api', name:'select'}", @click.native="selectOpen = 'image'")
      template(v-slot:select)
        ImageBrowser(v-if="selectOpen === 'image'", :preSelect="selection", @select="select")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import ImageBrowser from "~/components/ui/browser/ImageBrowser";
import ControllButton from "~/components/buttons/ControllButton";

export default {
  components: {
    EditorNav,
    ImageBrowser,
    ControllButton
  },
  data() {
    return {
      selectOpen: false,
      selection: []
    };
  },
  methods: {
    select(items) {
      this.selection = items;
      this.selectOpen = false;
    }
  }
};
</script>

<style lang="sass">
.pscene
  width: 100%
  height: 100%
</style>
