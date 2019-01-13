<template lang="pug">
#app
  top-bar/
  alerts/
  router-view/
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TopBar from '@/components/TopBar.vue';
import Alerts from '@/components/Alerts.vue';

@Component({
  components: {
    'top-bar': TopBar,
    alerts: Alerts,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass">
@import url('https://rsms.me/inter/inter-ui.css')
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro')

@import './variables'
@import '../node_modules/bootstrap/scss/bootstrap'
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue'

h2
  font-size: 1.33rem
  vertical-align: middle
  padding: 0
  margin: 0
  line-height: 4rem

h3
  font-size: 1.15rem

h4
  font-size: 1rem
  font-weight: bold

.modal-header
  border-bottom: 0
  padding-bottom: 0

.modal-footer
  border-top: 0

.card .list-group-item
  background-color: lighten($primary, 48%)
  margin-bottom: 1rem

.card, .list-group-item
  p:last-child
    margin-bottom: 0
</style>
