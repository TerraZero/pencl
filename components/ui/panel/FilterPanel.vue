<template lang="pug">
  .filter-panel
    .filter-panel--filters
      slot(name="filters")
    .filter-panel--items
      ScrollPanel
        .filter-panel--item(v-for="item in filterred")
          slot(name="item", v-bind:item="item")
</template>
<script>
import ScrollPanel from "~/components/ui/panel/ScrollPanel";

export default {
  components: {
    ScrollPanel
  },
  props: ["items", "filters"],
  computed: {
    filterred() {
      const items = [];

      for (const item in this.items) {
        let hit = true;
        for (const filter in this.filters) {
          if (this.items[item][filter].indexOf(this.filters[filter]) === -1) {
            hit = false;
            continue;
          }
        }
        if (hit) {
          items.push(this.items[item]);
        }
      }
      return items;
    }
  }
};
</script>
<style lang="sass">
.filter-panel

  &--filters
    display: flex

  &--items
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    padding: 5px

  &--item
    margin: 5px
    flex: 1 1 21em

</style>
