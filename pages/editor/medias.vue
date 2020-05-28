<template lang="pug">
  .pmedias
    EditorNav
      h1
        | Medias
      Status(v-if="status", :status="status", :message="message")
      Form
        template(v-slot:fields)
          .pmedias--search
            Textfield.pmedias--input(label="Search", v-model="search")
            Select.pmedias--input.pmedias--input-category(label="Category", v-model="category", :options="options")
            Select.pmedias--input.pmedias--input-ext(label="Ext", v-model="ext", :options="exts")
      .pmedias--content
        .pmedias--item(v-for="item in filtered")
          .pmedias--title
            | {{ item.output }}
          .pmedias--category
            | {{ item.category }}
          .pmedias--controlls
            .pmedias--button(@click="deleteMedia(item)")
              Icon(cat="api", name="trash")
            .pmedias--button(v-if="item.ext === '.mp3'", @click="toggleMedia(item)")
              Icon(v-if="!item.play", cat="api", name="play", type="svg")
              Icon(v-if="item.play", cat="api", name="stop", type="svg")

</template>

<script>
import Icon from "~/components/medias/Icon";
import EditorNav from "~/components/nav/EditorNav";
import Form from "~/components/ui/form/Form";
import Textfield from "~/components/ui/form/Textfield";
import Status from "~/components/ui/form/Status";
import Select from "~/components/ui/form/Select";

import Socket from "~/plugins/socket/client";
import Path from "path";

import { Howl } from "howler";

export default {
  components: {
    EditorNav,
    Icon,
    Form,
    Textfield,
    Status,
    Select
  },
  data() {
    const index = require("~/static/data/downloads/index.json");

    const options = {
      all: "- All -"
    };
    for (const cat in index.categories) {
      options[cat] = index.categories[cat].name;
    }

    return {
      search: null,
      status: null,
      message: null,
      ext: "all",
      category: "all",
      options: options
    };
  },
  computed: {
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
        all: "- All -"
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
    }
  }
};
</script>

<style lang="sass">
.pmedias
  width: 100%
  height: 100%

  &--search
    display: flex

  &--input
    margin: 10px

  &--input-category
    width: 20%

  &--input-ext
    width: 8%
    min-width: 90px

  &--content
    display: flex
    flex-wrap: wrap

  &--item
    width: calc(20% - 20px)
    margin: 10px
    box-sizing: border-box
    background: #222

  &--title
    padding: 20px 20px 0
    word-break: break-all

  &--category
    padding: 0 20px

  &--controlls
    padding-top: 20px

  &--button
    display: inline-block
    vertical-align: middle
    width: 40px
    height: 40px
    text-align: center
    line-height: 40px
    background: #333
    box-sizing: border-box
    cursor: pointer
    transition: background .3s ease-in-out
    border: 1px solid #121111

    &:hover
      background: #444

  &--button + &--button
    border-left-width: 0
</style>
