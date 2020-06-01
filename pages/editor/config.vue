<template lang="pug">
  .peditorconfig
    EditorNav
      h1
        | Editor Config
      Status(v-if="status", :key="message + status", :status="status", :message="message")
      Form
        template(v-slot:fields)
          h3.peditorconfig--subline
            | Font
          Textfield(label="Master Size", v-model="masterfontsize", :reset="data.masterfontsize === masterfontsize ? '' : 'Default: ' + data.masterfontsize", @reset="masterfontsize = data.masterfontsize")
            | The master font size for the editor.
          h3.peditorconfig--subline
            | Sidebar
          Select(label="Sidebar Close", v-model="sidebarclose", :options="options", :reset="data.sidebarclose === (sidebarclose === 'true') ? '' : 'Default: ' + data.sidebarclose", @reset="sidebarclose = data.sidebarclose + ''")
            | If the sidebar is closed by default.
          Textfield(label="Sidebar width", v-model="sidebarwidth", :reset="data.sidebarwidth === sidebarwidth ? '' : 'Default: ' + data.sidebarwidth", @reset="sidebarwidth = data.sidebarwidth")
            | The width of the sidebar. Only for the editor.
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

import data from "~/static/data/config/editor.default.json";

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
      sidebarclose: this.$store.state.editorconfig.sidebarclose + "",
      sidebarwidth: this.$store.state.editorconfig.sidebarwidth,
      masterfontsize: this.$store.state.editorconfig.masterfontsize,
      options: {
        false: "False",
        true: "True"
      },
      data: data
    };
  },
  methods: {
    async submit() {
      if (this.sidebarwidth) {
        await Socket.request("editor/config", {
          sidebarclose: this.sidebarclose === "true",
          sidebarwidth: this.sidebarwidth,
          masterfontsize: this.masterfontsize
        });
        this.$store.commit("editorconfig/sidebarwidth", {
          sidebarwidth: this.sidebarwidth
        });
        this.$store.commit("editorconfig/masterfontsize", {
          masterfontsize: this.masterfontsize
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

  &--subline
    margin-top: 2em
    margin-bottom: 0
</style>
