<template lang="pug">
#app
  router-view/
</template>

<style lang="sass">
$primary: #4b32c3
@import '../node_modules/bootstrap/scss/bootstrap.scss'
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

h2
  line-height: 47.3px
  font-size: 1.33rem
  vertical-align: middle
  padding: 0
  margin: 0

.modal-header, .modal-footer
  border-top: 0
  border-bottom: 0
</style>
