<template lang="pug">
  .pmediaadd
    EditorNav
      h1
        | Add Media
      Status(v-if="status", :status="status", :message="message")
      Form
        template(v-slot:fields)
          Textfield(label="Url", v-model="url")
          Textfield(label="Output", v-model="output")
          Select(label="Type", v-model="type", :options="options")
        template(v-slot:actions)
          Submit(label="Submit", @click.native="submit")
      Process.pmediaadd--process(v-if="process", :uuid="process", @finished="finished")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import Form from "~/components/ui/form/Form";
import Textfield from "~/components/ui/form/Textfield";
import Select from "~/components/ui/form/Select";
import Submit from "~/components/ui/form/Submit";
import Status from "~/components/ui/form/Status";
import Process from "~/components/system/Process";

import Socket from "~/plugins/socket/client";

export default {
  components: {
    EditorNav,
    Form,
    Textfield,
    Select,
    Submit,
    Status,
    Process
  },
  data() {
    const index = require("~/static/data/downloads/index.json");

    const options = {};
    for (const cat in index.categories) {
      options[cat] = index.categories[cat].name;
    }

    return {
      process: null,
      status: null,
      message: null,
      url: null,
      output: null,
      type: null,
      options: options
    };
  },
  methods: {
    async submit() {
      if (this.url && this.output && this.type) {
        const response = await Socket.request("editor/addMedia", {
          url: this.url,
          output: this.output,
          type: this.type
        });

        this.process = response.data;
      } else {
        this.status = "error";
        this.message = "Please insert all fields.";
      }
    },
    finished(process) {
      if (process.error && process.error.status) {
        this.status = process.error.status;
        this.message = process.error.message;
      } else if (process.error) {
        this.status = "error";
        this.message = process.error.error.stderr;
      } else {
        this.status = "success";
        this.message =
          "Added media " + this.output + " for " + this.options[this.type];
        this.url = null;
        this.output = null;
        this.type = null;
      }
      this.process = null;
    }
  }
};
</script>

<style lang="sass">
.pmediaadd
  width: 100%
  height: 100%

  &--process
    height: 30px
</style>
