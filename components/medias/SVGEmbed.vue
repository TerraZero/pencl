<template lang="pug">
  .svg-embed(v-html="content")
</template>

<script>
export default {
  props: ["src"],
  data() {
    return {
      content: null
    };
  },
  mounted() {
    fetch(this.src).then(response => {
      response.text().then(value => {
        this.content = value;
      });
    });
  }
};
</script>
<style lang="sass">

</style>
