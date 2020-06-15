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
            Textfield(label="Text", v-model="text")
            Textfield(label="Subtext", v-model="subtext")
            Textfield(label="Image speed", v-model="config.image.speed", :reset="config.image.speed === '10000' ? '' : 'Default: 10000'", @reset="config.image.speed = '10000'")
        .pscene--images
          LinkButton.pscene--image-add(text="Select Image", :icon="{cat: 'api', name: 'plus'}", @click="openBrowser('image')")
          .pscene--images-wrapper(v-if="images.length")
            ImageItem.pscene--image(v-for="image in images", :key="image.output", :src="'/downloads/backgrounds/' + image.output")
              | Name: {{ image.output }}
        .pscene--musics
          LinkButton.pscene--music-add(text="Select Music", :icon="{cat: 'api', name: 'plus'}", @click="openBrowser('music')")
          .pscene--musics-wrapper(v-if="musics.length")
            MusicItem.pscene--music(v-for="music in musics", :key="music.output")
              template
                | Name: {{ music.output }}
              template(v-slot:controlls)
                ControllButton(@click.native="toggleMedia(music)", :icon="( music.play ? {cat: 'api', name: 'stop', type: 'svg'} : {cat: 'api', name: 'play', type: 'svg'})")
        .pscene--controlls
          Submit(label="Submit", @click.native="submit")
      template(v-slot:select)
        ImageBrowser(v-if="browser === 'image'", :preSelect="images", @select="selectImages")
        MusicBrowser(v-if="browser === 'music'", :preSelect="musics", @select="selectMusics")
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
import MusicBrowser from "~/components/ui/browser/MusicBrowser";
import ImageItem from "~/components/entity/ImageItem";
import MusicItem from "~/components/entity/MusicItem";
import ControllButton from "~/components/buttons/ControllButton";
import LinkButton from "~/components/buttons/LinkButton";
import { Howl } from "howler";

import Socket from "~/plugins/socket/client";

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
    MusicBrowser,
    ControllButton,
    LinkButton,
    ImageItem,
    MusicItem
  },
  data() {
    return {
      status: null,
      message: null,
      browser: null,
      selectOpen: false,
      title: "",
      id: "",
      text: null,
      subtext: null,
      config: {
        image: {
          speed: "10000"
        }
      },
      images: [],
      musics: []
    };
  },
  computed: {},
  methods: {
    clear() {
      this.title = "";
      this.id = "";
      this.text = "";
      this.subtext = "";
      this.config.image.speed = "10000";
      this.images = [];
      this.musics = [];
    },
    toggleMedia(music) {
      if (music.play) {
        music.play.stop();
        music.play = null;
      } else {
        music.play = new Howl({
          src: "/downloads/music/" + music.output
        });
        music.play.play();
      }
    },
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
    selectMusics(musics) {
      this.musics = musics;
      this.selectOpen = false;
    },
    async submit() {
      const response = await Socket.request("editor/addScene", {
        title: this.title,
        id: this.id,
        text: this.text,
        subtext: this.subtext,
        config: this.config,
        images: this.images,
        musics: this.musics
      });

      if (response.isOK()) {
        if (response.data.status) {
          this.status = response.data.status;
          this.message = response.data.message;
        } else {
          this.status = "success";
          this.message = "Created scene " + this.title + ".";
          this.clear();
        }
      } else {
        this.status = "error";
        this.message = response.data.error || "Error";
      }
    }
  }
};
</script>

<style lang="sass">
.pscene
  width: 100%
  height: 100%

  &--music-add,
  &--image-add
    margin-top: 1em

  &--musics-wrapper,
  &--images-wrapper
    margin: 1em 0
    display: flex
    flex-wrap: wrap
    justify-content: space-between

  &--music,
  &--image
    width: 20%
    max-width: 20%

  &--controlls
    margin-top: 1em
</style>
