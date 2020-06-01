<template lang="pug">
  .pmedias
    EditorNav
      h1
        | Medias
      Status(v-if="status", :status="status", :message="message")
      FilterPanel(:items="items", :filters="filters")
        template(v-slot:filters)
          Textfield.pmedias--input(label="Search", v-model="search")
          Select.pmedias--input.pmedias--input-category(label="Category", v-model="category", :options="options")
          Select.pmedias--input.pmedias--input-ext(label="Ext", v-model="ext", :options="exts")
        template(v-slot:item="item")
          Item
            template(v-slot:tag)
              | {{ item.item.category }}
            template
              | {{item.item.output}}
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

import Socket from "~/plugins/socket/client";
import Path from "path";

import { Howl } from "howler";

export default {
  components: {
    Item,
    EditorNav,
    Textfield,
    Status,
    Select,
    FilterPanel,
    ControllButton
  },
  data() {
    const index = require("~/static/data/downloads/index.json");

    const options = {
      "": "- All -"
    };
    for (const cat in index.categories) {
      options[cat] = index.categories[cat].name;
    }

    return {
      search: "",
      status: null,
      message: null,
      ext: "",
      category: "",
      options: options
    };
  },
  computed: {
    filters() {
      return {
        category: this.category,
        ext: this.ext,
        path: this.search
      };
    },
    items() {
      const items = [];
      const index = require("~/static/data/downloads/index.json");

      for (const cat in index.categories) {
        const data = require("~/static/data/downloads/" + cat + ".json");

        for (const item of data) {
          item.category = cat;
          item.path = index.categories[cat].path + "/" + item.output;
          item.play = false;
          item.ext = Path.extname(item.output);
          items.push(item);
        }
      }
      return items;
    },
    exts() {
      const exts = {
        "": "- All -"
      };

      for (const item of this.items) {
        exts[item.ext] = item.ext;
      }
      return exts;
    },
    filtered() {
      const filtered = [];

      for (const item of this.items) {
        if (this.search && !item.output.includes(this.search)) continue;
        if (this.category !== "all" && item.category !== this.category)
          continue;
        if (this.ext !== "all" && item.ext !== this.ext) continue;
        filtered.push(item);
      }
      return filtered;
    }
  },
  methods: {
    async deleteMedia(item) {
      const response = await Socket.request("editor/deleteMedia", item);

      if (response.isOK()) {
        this.status = "success";
        this.message = "Delete " + item.output;
      } else {
        this.status = "error";
        this.message = response.data.error || "Error";
      }
    },
    toggleMedia(item) {
      if (item.play) {
        item.howl.stop();
      } else {
        item.howl = new Howl({
          src: item.path
        });
        item.howl.play();
        item.howl.on("end", () => {
          item.play = false;
          item.howl = null;
          this.$forceUpdate();
        });
      }
      item.play = !item.play;
      this.$forceUpdate();
    },
    toRhythmn(item) {
      this.$store.commit("editor/entity", { entity: item });
      this.$router.push({
        path: "/editor/rhythm"
      });
    }
  }
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
</style>
