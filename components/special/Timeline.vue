<template lang="pug">
  .timeline(:class="'timeline--state-' + state")
    .timeline--items(:style="styles")
      .timeline--item(v-for="i in 30", :style="itemStyles(i)")
        .timeline--time
          | {{ getTime(i - 3) }}:00
        ul.timeline--list(v-if="state === 3 && i - 4 === focus")
          RandomText.timeline--title(text="Metadaten")
          li.timeline--list-item(v-for="text in list")
            RandomText(:text="text")
    .timeline--overlay(:style="timelineOverlay")
      .timeline--overlay-text
        | Mission Active

</template>

<script>
import Format from "utils/src/Format";
import RandomText from "~/components/text/RandomText";

import { Howl } from "howler";
import AsyncPromise from "utils/src/AsyncPromise";

let counter = 0;
const promise = new AsyncPromise();

const howl = new Howl({
  src: "/downloads/music/hitman3.mp3"
});
howl.seek(33);
howl.on("end", () => {
  promise.resolve();
});

export default {
  components: {
    RandomText
  },
  props: ["current"],
  data() {
    return {
      state: 1,
      focus: 0,
      overlay: false,
      list: [
        "Arbeitskräfte: 10",
        "Wachen: 5",
        "Kunden: ???",
        "! Direktor Termin"
      ]
    };
  },
  computed: {
    styles() {
      return {
        transform: "translateY(calc(-" + 1.3 * (this.focus + 3) + "em + 10vh))"
      };
    },
    timelineOverlay() {
      if (this.overlay) {
        return {
          opacity: 1
        };
      }
    }
  },
  methods: {
    getTime(index) {
      return this.lpad((index + 23) % 24);
    },
    lpad(text) {
      return Format.pad(text, 2, "0", true);
    },
    start() {
      switch (counter) {
        case 0:
          this.focus = 18;
          howl.play();
          setTimeout(() => {
            this.start();
          }, 2000);
          break;
        case 1:
          this.state++;
          setTimeout(() => {
            this.start();
          }, 2000);
          break;
        case 2:
          this.state++;
          setTimeout(() => {
            this.start();
          }, 9000);
          break;
        case 3:
          this.overlay = true;
          setTimeout(() => {
            this.start();
          }, 4000);
          break;
        case 4:
          break;
      }

      counter++;
      return promise.promise;
    },
    itemStyles(index) {
      if (index - 4 === this.focus && this.state === 3) {
        return {
          height: "80vh"
        };
      }
    }
  }
};
</script>
<style lang="sass">
.timeline
  font-family: tech-mono
  width: 100%
  height: 100%
  overflow: hidden

  &--state-1 &--time
    left: 50%
    transform: translate(-50%)

  &--time
    position: absolute
    top: .08em
    left: .08em
    transition: all 2s cubic-bezier(.15,1,.14,1)

  &--item
    position: relative
    height: 1.3em
    box-sizing: border-box
    transition: all 2s cubic-bezier(.15,1,.14,1)
    overflow: hidden

    & + &
      border-top: .08em solid white

  &--items
    font-size: 12em
    transition: all 2s cubic-bezier(.15,1,.14,1)

  &--list
    font-size: 0.55em
    list-style: square
    margin: 0 0 0 40%

  &--title
    text-decoration: underline
    margin-top: .5em
    font-weight: bold

  &--overlay
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: black
    color: white
    font-family: payday
    font-size: 20em
    display: flex
    justify-content: center
    align-items: center
    opacity: 0
    transition: opacity 1s ease-in-out
    overflow: hidden

  &--overlay-text
    animation: logo--shake 2s infinite
</style>
