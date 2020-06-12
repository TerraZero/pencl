<template lang="pug">
  .id-field
    Textfield.id-field--title(:label="label", v-model="title", @input="action")
    Textfield(v-if="!syncData", :label="label + ' ID'", v-model="id", @input="action")
    .id-field--masked(@click="toggle")
      | {{ label }} ID: {{ masked }}
</template>

<script>
import Textfield from "~/components/ui/form/Textfield";

export default {
  components: {
    Textfield
  },
  props: ["label", "value", "mask", "sync"],
  data() {
    return {
      title: this.value.title,
      id: this.value.id,
      syncData: !this.value.id
    };
  },
  computed: {
    currentID() {
      if (this.syncData) {
        return this.title || "";
      } else {
        return this.id || "";
      }
    },
    masked() {
      return this.masking(this.currentID);
    }
  },
  methods: {
    toggle() {
      if (this.syncData) {
        this.id = this.masked;
      }
      this.syncData = !this.syncData;
    },
    masking(string) {
      const regex = new RegExp(this.mask || "[^a-z0-9\\-]", "g");

      return string
        .toLowerCase()
        .replace(regex, "_")
        .replace(/_+/g, "_")
        .replace(/^[_\s]*/, "")
        .replace(/[_\s]*$/, "");
    },
    action() {
      this.$emit("input", {
        title: this.title,
        id: this.masked
      });
    }
  },
  mounted() {
    if (this.sync === undefined && this.masked === this.masking(this.title)) {
      this.syncData = true;
    }
  }
};
</script>
<style lang="sass">
.id-field

  &--masked
    display: inline-block
    background: #383838
    padding: 0.3em 1em
    font-size: 0.9em

    &:hover
      background: #585858
      cursor: pointer
</style>
