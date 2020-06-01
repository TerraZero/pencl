<template lang="pug">
  .pcategories
    EditorNav
      h1
        | Categories
      Status(v-if="status", :status="status", :message="message")
      FilterPanel(:items="items")
        template(v-slot:item="item")
          Item
            .pcategories--title
              | {{ item.item.name }}
            .pcategories--path
              | {{ item.item.path }}
            template(v-slot:controlls)
              ControllButton(@click.native="editCategory(item.item)", :icon="{cat: 'api', name: 'edit'}")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import Status from "~/components/ui/form/Status";
import FilterPanel from "~/components/ui/panel/FilterPanel";
import Item from "~/components/entity/Item";
import ControllButton from "~/components/buttons/ControllButton";

import Socket from "~/plugins/socket/client";

export default {
  components: {
    EditorNav,
    Status,
    FilterPanel,
    Item,
    ControllButton
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

  &--title
    padding: 20px 20px 0
    word-break: break-all

  &--path
    padding: 0 20px
</style>
