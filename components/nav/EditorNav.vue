<template lang="pug">
  .editor-nav
    .editor-nav--sidebar(:class="classes", :style="styles")
      .editor-nav--controlls
        .editor-nav--toggle(@click="toggle")
          | {{ (close ? '+' : '-') }}
        .editor-nav--toggle(@click="toConfig")
          Icon(cat="api", name="settings")
        .editor-nav--toggle(@click="toFullscreen")
          Icon(cat="api", name="fullscreen")
      .editor-nav--item(v-for="item in items", :class="itemclass(item)", @click="click(item)")
        Icon.editor-nav--item-icon(cat="api", :name="item.icon")
        .editor-nav--item-label
          | {{ item.label }}
    .editor-nav--content
      ScrollPanel.editor-nav--scroll
        slot
      .editor-nav--select(:class="selectClass", ref="editorSelection", @transitionend="onTransitionend")
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
      fullscreen: false,
      items: [
        {
          label: "Categories",
          path: "/editor/categories",
          icon: "dir"
        },
        {
          label: "Medias",
          path: "/editor/medias",
          icon: "photo"
        },
        {
          label: "Scenes",
          path: "/editor/scenes",
          icon: "photo"
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
    onTransitionend(event) {
      if (!this.selectOpen && event.target === this.$refs.editorSelection) {
        this.$emit("closeSelect");
      }
    },
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
    toFullscreen() {
      if (this.fullscreen) {
        document.exitFullscreen();
      } else {
        document.body.requestFullscreen();
      }
      this.fullscreen = !this.fullscreen;
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
    transition: top .5s ease-in-out
    border-top: 1em solid #121111

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
    display: flex
    background: #121111
    transition: background .3s ease-in-out
    cursor: pointer
    white-space: nowrap
    border: 1px solid #121111
    position: relative

    &:hover,
    &:hover &-icon
      background: #444

    & + &
      border-top-width: 0

  &--item-icon
    width: 2.5em
    height: 2.5em
    background: #333
    flex-shrink: 0
    transition: background .3s ease-in-out

  &--item-label
    flex-grow: 1
    padding: 0 0.5em
    line-height: 2.5em

  &--item--active
    background: #333

    &:after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 0.2em
      height: 100%
      background: white
</style>
