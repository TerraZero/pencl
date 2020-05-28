<template lang="pug">
  .pcategoryadd
    EditorNav
      h1
        | {{ title }}
      Status(v-if="status", :status="status", :message="message")
      Form
        template(v-slot:fields)
          Textfield(label="Key", v-model="key")
          Textfield(label="Name", v-model="name")
          Textfield(label="Path", v-model="path")
        template(v-slot:actions)
          Submit(v-if="entity", label="Clear", @click.native="clear")
          Submit(label="Submit", @click.native="submit")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import Form from "~/components/ui/form/Form";
import Textfield from "~/components/ui/form/Textfield";
import Select from "~/components/ui/form/Select";
import Submit from "~/components/ui/form/Submit";
import Status from "~/components/ui/form/Status";

import Socket from "~/plugins/socket/client";

export default {
  components: {
    EditorNav,
    Form,
    Textfield,
    Submit,
    Status
  },
  data() {
    const index = require("~/static/data/downloads/index.json");

    const options = {};
    for (const cat in index.categories) {
      options[cat] = index.categories[cat].name;
    }

    const entity = this.$store.state.editor.entity;

    return {
      status: null,
      message: null,
      key: (entity && entity.key) || null,
      name: (entity && entity.name) || null,
      path: (entity && entity.path) || null
    };
  },
  computed: {
    title() {
      return this.entity ? "Edit category " + this.entity.name : "Add Category";
    },
    entity() {
      return this.$store.state.editor.entity;
    }
  },
  methods: {
    clear() {
      this.$store.commit("editor/clear");
    },
    async submit() {
      if (this.key && this.name && this.path) {
        const response = await Socket.request("editor/addCategory", {
          key: this.key,
          name: this.name,
          path: this.path
        });
        if (response.isOK()) {
          if (response.data.status) {
            this.status = response.data.status;
            this.message = response.data.message;
          } else {
            this.status = "success";
            this.message = "Created category " + this.name + ".";
          }
        } else {
          this.status = "error";
          this.message = response.data.error || "Error";
        }
      } else {
        this.status = "error";
        this.message = "Please insert all fields.";
      }
      if (this.status === "success") {
        this.key = null;
        this.name = null;
        this.path = null;
      }
    }
  }
};
</script>

<style lang="sass">
.pcategoryadd
  width: 100%
  height: 100%

  &--process
    height: 30px
</style>
