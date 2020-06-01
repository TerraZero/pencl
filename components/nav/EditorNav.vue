<template lang="pug">
  .editor-nav
    .editor-nav--sidebar(:class="classes", :style="styles")
      .editor-nav--controlls
        .editor-nav--toggle(@click="toggle")
          | {{ (close ? '+' : '-') }}
        .editor-nav--toggle(@click="toConfig")
          Icon(cat="api", name="settings")
      .editor-nav--item(v-for="item in items", :class="itemclass(item)", @click="click(item)")
        | {{ item.label }}
    .editor-nav--content
      ScrollPanel.editor-nav--scroll
        slot
      .editor-nav--select(v-if="$slots.select", :class="selectClass")
        slot(name="select")
</template>

<script>
import ScrollPanel from "~/components/ui/panel/ScrollPanel";
import Icon from "~/components/medias/Icon";

export default {
  components: {
    ScrollPanel,
    Icon
  },
  props: ["selectOpen"],
  data() {
    return {
      items: [
        {
          label: "+ Add Category",
          path: "/editor/categoryadd"
        },
        {
          label: "+ Add Media",
          path: "/editor/mediaadd"
        },
        {
          label: "Categories",
          path: "/editor/categories"
        },
        {
          label: "Medias",
          path: "/editor/medias"
        }
      ]
    };
  },
  computed: {
    close() {
      return this.$store.state.editorconfig.sidebarclose;
    },
    classes() {
      if (this.close) {
        return ["editor-nav--sidebar--close"];
      }
    },
    selectClass() {
      if (this.selectOpen) {
        return "editor-nav--select--open";
      }
    },
    styles() {
      if (!this.close) {
        return {
          width: this.$store.state.editorconfig.sidebarwidth
        };
      }
    }
  },
  methods: {
    toggle() {
      this.$store.commit("editorconfig/sidebarclose", {
        sidebarclose: !this.close
      });
    },
    click(item) {
      this.$store.commit("editor/clear");
      this.$router.push({
        path: item.path
      });
    },
    toConfig() {
      this.$router.push({
        path: "/editor/config"
      });
    },
    itemclass(item) {
      if (this.$router.currentRoute.path === item.path) {
        return ["editor-nav--item--active"];
      }
    }
  }
};
</script>
<style lang="sass">
.editor-nav
  display: flex
  width: 100%
  height: 100%

  &--content
    width: 100%
    background: #555
    position: relative
    overflow: hidden

  &--select
    position: absolute
    top: 100%
    left: 0
    width: 100%
    height: 100%
    background: #555
    z-index: 1000
    transition: top .3s ease-in-out

  &--select--open
    top: 0

  &--scroll
    padding: 10px 20px
    box-sizing: border-box

  &--sidebar
    background: #121111
    overflow: hidden
    transition: width .3s

  &--sidebar--close
    width: 2.5em

  &--controlls
    background: #222

  &--toggle
    display: inline-block
    vertical-align: middle
    width: 2.5em
    height: 2.5em
    text-align: center
    line-height: 2.5em
    background: #333
    box-sizing: border-box
    cursor: pointer
    transition: background .3s ease-in-out
    border-top: 1px solid #121111
    border-left: 1px solid #121111

    &:hover
      background: #444

  &--item
    padding: 10px
    background: #121111
    transition: background .3s ease-in-out
    cursor: pointer
    white-space: nowrap

    &:hover
      background: #333

  &--item--active
    background: #333
</style>
