<template lang="pug">
.top-bar
  .container
    .row
      .col
        router-link(:to="{ name: 'home' }")
          h1 zPub
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopBar extends Vue {
}
</script>

<style lang="sass">
@import '../variables'

.top-bar
  height: $top-bar-height
  background-color: $primary
  margin-bottom: 1rem

  h1
    color: white
    font-size: $top-bar-height / 2.5
    line-height: $top-bar-height
    display: inline-block
</style>
