<template lang="pug">
  .peditorconfig
    EditorNav
      h1
        | Editor Config
      Status(v-if="status", :status="status", :message="message")
      Form
        template(v-slot:fields)
          Select(label="Sidebar Close", v-model="sidebarclose", :options="options")
          Textfield(label="Sidebar width", v-model="sidebarwidth")
        template(v-slot:actions)
          Submit(label="Submit", @click.native="submit")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import Form from "~/components/ui/form/Form";
import Textfield from "~/components/ui/form/Textfield";
import Select from "~/components/ui/form/Select";
import Status from "~/components/ui/form/Status";
import Submit from "~/components/ui/form/Submit";

import Socket from "~/plugins/socket/client";

export default {
  components: {
    EditorNav,
    Form,
    Textfield,
    Select,
    Status,
    Submit
  },
  data() {
    return {
      status: null,
      message: null,
      sidebarclose: this.$store.state.editorconfig.sidebarclose,
      sidebarwidth: this.$store.state.editorconfig.sidebarwidth,
      options: {
        false: "False",
        true: "True"
      }
    };
  },
  methods: {
    async submit() {
      if (this.sidebarwidth) {
        await Socket.request("editor/config", {
          sidebarclose: this.sidebarclose === "true",
          sidebarwidth: this.sidebarwidth
        });
        this.$store.commit("editorconfig/sidebarwidth", {
          sidebarwidth: this.sidebarwidth
        });
        this.status = "success";
        this.message = "Saved";
      } else {
        this.status = "error";
        this.message = "Please fill all fields.";
      }
    }
  }
};
</script>

<style lang="sass">
.peditorconfig
  width: 100%
  height: 100%
</style>
