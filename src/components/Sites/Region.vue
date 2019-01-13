<template lang="pug">
.region
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Region extends Vue {
}
</script>

<style lang="sass">
.region
  min-height: .33rem * 75
  border: .33rem dashed lighten(gray, 20%)
  border-radius: 1rem
</style>
