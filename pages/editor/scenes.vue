<template lang="pug">
  .pmedias
    EditorNav
      h1
        | Scenes
      LinkButton.pmedias--add(text="Add Scene", :icon="{cat: 'api', name: 'plus'}", target="/editor/scene")
      Status(v-if="status", :status="status", :message="message")
      FilterPanel(:items="items", :filters="filters")
        template(v-slot:filters)
          Textfield.pmedias--input(label="Search", v-model="search")
        template(v-slot:item="item")
          Item
            template(v-slot:tag)
              | {{ item.item.category }}
            template
              | {{ item.item.output }}
            template(v-slot:controlls)
              ControllButton(@click.native="deleteMedia(item.item)", :icon="{cat: 'api', name: 'trash'}")
              ControllButton(v-if="item.item.ext === '.mp3'", @click.native="toggleMedia(item.item)", :icon="( item.item.play ? {cat: 'api', name: 'stop', type: 'svg'} : {cat: 'api', name: 'play', type: 'svg'})")
              ControllButton(v-if="item.item.ext === '.mp3'", @click.native="toRhythmn(item.item)", :icon="{cat: 'api', name: 'rhythm'}")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import FilterPanel from "~/components/ui/panel/FilterPanel";
import Textfield from "~/components/ui/form/Textfield";
import Status from "~/components/ui/form/Status";
import Select from "~/components/ui/form/Select";
import Item from "~/components/entity/Item";
import ControllButton from "~/components/buttons/ControllButton";
import LinkButton from "~/components/buttons/LinkButton";

import Socket from "~/plugins/socket/client";
import Path from "path";

export default {
  components: {
    Item,
    EditorNav,
    Textfield,
    Status,
    Select,
    FilterPanel,
    ControllButton,
    LinkButton
  },
  data() {
    return {
      search: "",
      status: null,
      message: null
    };
  },
  computed: {
    filters() {
      return {};
    },
    async items() {
      const response = await Socket.request("editor/getScenes");

      return response.data;
    }
  },
  methods: {}
};
</script>

<style lang="sass">
.pmedias
  width: 100%
  height: 100%

  &--input
    margin: 10px

  &--input-category
    width: 20%

  &--input-ext
    width: 8%
    min-width: 90px

  &--add
    margin: 0 10px
</style>
