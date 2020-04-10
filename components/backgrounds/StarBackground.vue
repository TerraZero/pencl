<template lang="pug">
  .star-background
    .star-background--container(v-for="i in starsnumber")
      .star-background--circle
</template>

<script>
export default {
  props: ["stars"],
  computed: {
    starsnumber() {
      return Math.min(Number.parseInt(this.stars), 200);
    }
  }
};
</script>
<style lang="sass">
$particleNum: 200
$particleColor: hsl(180, 100%, 80%)
$particleBaseSize: 8

.star-background
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  z-index: -1

  &--container
    position: absolute
    transform: translateY(-10vh)
    animation-iteration-count: infinite
    animation-timing-function: linear

    @for $i from 1 through $particleNum
      &:nth-child(#{$i})
        $circleSize: random($particleBaseSize)
        width: $circleSize + px
        height: $circleSize + px

        $startPositionY: random(10) + 100
        $framesName: "move-frames-" + $i
        $moveDuration: 28000 + random(9000) + ms

        animation-name: #{$framesName}
        animation-duration: $moveDuration
        animation-delay: random(37000) + ms

        @keyframes #{$framesName}
          from
            transform: translate3d(#{random(100) + vw}, #{$startPositionY + vh}, 0)
          to
            transform: translate3d(#{random(100) + vw}, #{- $startPositionY - random(30) + vh}, 0)

        .star-background--circle
          width: 100%
          height: 100%
          border-radius: 50%
          mix-blend-mode: screen
          animation-delay: random(4000) + ms
          background-image: radial-gradient(hsl(180, 100%, 80%),hsl(180, 100%, 80%) 10%,hsla(180, 100%, 80%, 0) 56%)
          animation: fadein-frames random(200) + 100ms infinite, scale-frames random(1000) + 1000ms infinite

          @keyframes fade-frames
            0%
              opacity: 1
            50%
              opacity: 0.7
            100%
              opacity: 1

          @keyframes scale-frames
            0%
              transform: scale3d(0.4, 0.4, 1)
            50%
              transform: scale3d(2.2, 2.2, 1)
            100%
              transform: scale3d(0.4, 0.4, 1)
</style>
