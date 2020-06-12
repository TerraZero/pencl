<template lang="pug">
  .image-browser
    .image-browser--controlls
      LinkButton.image-browser--select(:icon="{cat: 'api', name:'next'}", :text="'Select (' + select.length + ')'", swap="true", :class="buttonClass", @click="$emit('select', select)")
    FilterPanel(:items="items", :filters="filters")
      template(v-slot:filters)
        .image-browser--filters
          Textfield(label="Search", v-model="filters.output")
      template(v-slot:item="item")
        ImageItem.image-browser--item(:class="classes(item.item)", @click.native="click(item.item)", :src="'/downloads/backgrounds/' + item.item.output")
          template(v-slot:image)
            .image-browser--mark(v-if="find(item.item)", cat="api", name="correct")
              Icon.image-browser--mark-icon(cat="api", name="correct")
          template
            | Name: {{ item.item.output }}
</template>
<script>
import FilterPanel from "~/components/ui/panel/FilterPanel";
import Textfield from "~/components/ui/form/Textfield";
import AspectRadioFrame from "~/components/ui/frame/AspectRadioFrame";
import CoverImage from "~/components/medias/CoverImage";
import Icon from "~/components/medias/Icon";
import LinkButton from "~/components/buttons/LinkButton";
import ImageItem from "~/components/entity/ImageItem";

import data from "~/static/data/downloads/backgrounds.json";

export default {
  components: {
    FilterPanel,
    Textfield,
    AspectRadioFrame,
    CoverImage,
    Icon,
    LinkButton,
    ImageItem
  },
  props: {
    preSelect: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: data,
      select: [],
      filters: {
        output: ""
      }
    };
  },
  computed: {
    buttonClass() {
      if (this.select.length) {
        return "image-browser--select--active";
      }
    }
  },
  methods: {
    find(item) {
      for (const index in this.select) {
        if (this.select[index] === item) {
          return index;
        }
      }
      return null;
    },
    click(item) {
      const index = this.find(item);

      if (index === null) {
        this.select.push(item);
      } else {
        this.select.splice(index, 1);
      }
    },
    classes(item) {
      if (this.find(item)) {
        return ["image-browser--item--selected"];
      }
    }
  },
  mounted() {
    this.select = this.preSelect;
  }
};
</script>
<style lang="sass">
.image-browser
  width: 100%
  height: 100%
  padding: 2em
  box-sizing: border-box

  &--filters
    padding: 2em 0
    width: 100%

  &--item
    cursor: pointer
    max-width: 20%

  &--mark
    position: absolute
    top: 0
    right: 0
    width: 100%
    height: 100%
    box-shadow: inset 0px 0px 10px 5px #5cb85c

  &--mark-icon
    position: absolute
    top: 0
    right: 0
    width: 2em
    height: 2em
    background: #5cb85c

  &--select
    transition: background .3s ease-in-out

  &--select--active
    background: #5cb85c

  &--controlls
    text-align: right
</style>
