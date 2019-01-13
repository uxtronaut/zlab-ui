<template lang="pug">
#app
  top-bar
  router-view/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TopBar from '@/components/TopBar.vue';

@Component({ components: { 'top-bar': TopBar } })
export default class Region extends Vue {}
</script>

<style lang="sass">
@import './variables'
@import '../node_modules/bootstrap/scss/bootstrap'
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue'

h2
  line-height: 47.3px
  font-size: 1.33rem
  vertical-align: middle
  padding: 0
  margin: 0

.modal-header
  border-bottom: 0
  padding-bottom: 0

.modal-footer
  border-top: 0
</style>
