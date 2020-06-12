<template lang="pug">
  .pscene
    EditorNav(:selectOpen="selectOpen", @closeSelect="browser = null")
      template
        h1
          | Add Media
        Status(v-if="status", :status="status", :message="message")
        Form
          template(v-slot:fields)
            IDField(label="Scene", :value="{title, id}", @input="setID")
        .pscene--images
          LinkButton.pscene--image-add(text="Select Image", :icon="{cat: 'api', name: 'plus'}", @click="openBrowser('image')")
          .pscene--images-wrapper(v-if="images.length")
            ImageItem.pscene--image(v-for="image in images", :key="image.output", :src="'/downloads/backgrounds/' + image.output")
              | Name: {{ image.output }}
        .pscene--controlls
          Submit(label="Submit", @click.native="submit")
      template(v-slot:select)
        ImageBrowser(v-if="browser === 'image'", :preSelect="images", @select="selectImages")
</template>

<script>
import EditorNav from "~/components/nav/EditorNav";
import Form from "~/components/ui/form/Form";
import Textfield from "~/components/ui/form/Textfield";
import Select from "~/components/ui/form/Select";
import Submit from "~/components/ui/form/Submit";
import IDField from "~/components/ui/form/IDField";
import Status from "~/components/ui/form/Status";
import ImageBrowser from "~/components/ui/browser/ImageBrowser";
import ImageItem from "~/components/entity/ImageItem";
import ControllButton from "~/components/buttons/ControllButton";
import LinkButton from "~/components/buttons/LinkButton";

export default {
  components: {
    EditorNav,
    Form,
    Textfield,
    Select,
    Submit,
    IDField,
    Status,
    ImageBrowser,
    ControllButton,
    LinkButton,
    ImageItem
  },
  data() {
    return {
      status: null,
      message: null,
      browser: null,
      selectOpen: false,
      title: "",
      id: "",
      images: []
    };
  },
  computed: {},
  methods: {
    openBrowser(browser) {
      this.browser = browser;
      this.selectOpen = true;
    },
    setID(input) {
      this.title = input.title;
      this.id = input.id;
    },
    selectImages(images) {
      this.images = images;
      this.selectOpen = false;
    },
    submit() {
      console.log(this);
    }
  }
};
</script>

<style lang="sass">
.pscene
  width: 100%
  height: 100%

  &--image-add
    margin-top: 1em

  &--images-wrapper
    margin: 1em 0
    display: flex
    flex-wrap: wrap

  &--image
    width: 20%

  &--controlls
    margin-top: 1em
</style>
