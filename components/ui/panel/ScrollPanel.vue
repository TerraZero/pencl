<template lang="pug">
  .scroll-panel
    slot
</template>

<style lang="sass">
.scroll-panel
  width: 100%
  height: 100%
  display: inline-block
  background-color: transparent
  overflow: auto

  &::-webkit-scrollbar
    background: transparent
    width: 5px
    height: 5px

  &::-webkit-scrollbar-thumb
    background-color: transparent

  &:hover::-webkit-scrollbar-thumb
    background-color: #3ce5ca

  &::-webkit-scrollbar-corner
    display: none
</style>
