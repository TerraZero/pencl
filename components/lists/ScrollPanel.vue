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
  -webkit-background-clip: text
  transition: background-color .3s

  &:hover
    background-color: #3ce5ca

  &::-webkit-scrollbar
    background: transparent
    width: 5px
    height: 5px

  &::-webkit-scrollbar-thumb
    background-color: inherit

  &::-webkit-scrollbar-corner
    display: none
</style>
