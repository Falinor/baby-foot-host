<template>
  <v-container fluid class="container">
    <opening v-if="playOpening" />
    <template v-else>
      <div class="modes">
        <v-btn to="/ranked" x-large text>Ranked game</v-btn>
        <v-btn to="/quickplay" x-large text>Quickplay</v-btn>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Opening from '@/components/Opening.vue'

export default {
  data() {
    return {
      ambiance: null,
    }
  },
  components: {
    Opening,
  },
  computed: {
    ...mapGetters('app', ['playOpening']),
  },
  mounted() {
    this.playTheme()
  },
  methods: {
    playTheme() {
      this.ambiance = new Audio('./Menu Theme.mp3')
      this.ambiance.play()
    },
    stopTheme() {
      this.ambiance.pause()
    },
  },
  destroyed() {
    this.stopTheme()
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/cover no-repeat url('/test.jpg');
}

.modes {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 80%;
  margin: 0 auto;
}

.modes > * {
  margin: 1rem 0;
}
</style>
