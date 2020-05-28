<template lang="pug">
  .pcategories
    EditorNav
      h1
        | Categories
      Status(v-if="status", :status="status", :message="message")
      .pcategories--content
        .pcategories--item(v-for="item in items")
          .pcategories--title
            | {{ item.name }}
          .pcategories--path
            | {{ item.path }}
          .pcategories--controlls
            .pcategories--button(@click="editCategory(item)")
              Icon(cat="api", name="edit")

</template>

<script>
import Icon from "~/components/medias/Icon";
import EditorNav from "~/components/nav/EditorNav";
import Status from "~/components/ui/form/Status";

import Socket from "~/plugins/socket/client";

export default {
  components: {
    EditorNav,
    Icon,
    Status
  },
  data() {
    return {
      status: null,
      message: null
    };
  },
  computed: {
    items() {
      const items = [];
      const index = require("~/static/data/downloads/index.json");

      for (const cat in index.categories) {
        items.push(index.categories[cat]);
        items[items.length - 1].key = cat;
      }
      return items;
    }
  },
  methods: {
    async editCategory(item) {
      this.$store.commit("editor/entity", {
        entity: item
      });
      this.$router.push({
        path: "/editor/categoryadd"
      });
    }
  }
};
</script>

<style lang="sass">
.pcategories
  width: 100%
  height: 100%

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

  &--path
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
