<template lang="pug">
  .random-text
    | {{ showText }}
</template>

<script>
export default {
  props: ["text", "time"],
  data() {
    return {
      index: 0,
      showText: this.text
    };
  },
  methods: {
    getRandom(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:/-+-*!?";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }
  },
  mounted() {
    const i1 = setInterval(() => {
      this.showText =
        this.getRandom(this.text.length - this.index) +
        this.text.substring(this.text.length - this.index);
    }, 50);
    const i2 = setInterval(() => {
      this.index++;
      if (this.index === this.text.length) {
        clearInterval(i1);
        clearInterval(i2);
        this.showText = this.text;
        this.$emit("finish", this.text);
      }
    }, (this.time || 2000) / this.text.length);
  }
};
</script>
<style lang="sass">
.random-text
  font-family: tech-mono
</style>
