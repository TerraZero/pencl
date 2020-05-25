<template lang="pug">
  .logo
    SVGEmbed(src="/images/logos/tz.svg")
    .logo--insane
      .logo--cha-1 I
      .logo--cha-2 N
      .logo--cha-3 S
      .logo--cha-4 A
      .logo--cha-5 N
      .logo--cha-6 E
</template>

<script>
import SVGEmbed from "~/components/medias/SVGEmbed";

export default {
  components: {
    SVGEmbed
  }
};
</script>
<style lang="sass">
.logo

  &--cha-1
    animation: logo-shadow 40s linear infinite

  &--cha-2
    animation: logo-shadow 50s 6s linear infinite

  &--cha-3
    animation: logo-shadow 30s 4s linear infinite

  &--cha-4
    animation: logo-shadow 44s 10s linear infinite

  &--cha-5
    animation: logo-shadow 38s 8s linear infinite

  &--cha-6
    animation: logo-shadow 40s 14s linear infinite
</style>
