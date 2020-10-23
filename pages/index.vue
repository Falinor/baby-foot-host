<template>
  <v-container fluid class="index-container">
    <opening v-if="playOpening" />
    <template v-else>
      <v-row>
        <v-col class="modes" cols="8">
          <v-btn to="/ranked" x-large text>Ranked game</v-btn>
          <v-btn to="/quickplay" x-large text>Quickplay</v-btn>
        </v-col>
        <v-col class="leaderboards" cols="4">
          <team-leaderboard class="leaderboard" />
          <player-leaderboard class="leaderboard" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Opening from '@/components/Opening.vue'
import PlayerLeaderboard from '@/components/PlayerLeaderboard.vue'
import TeamLeaderboard from '@/components/TeamLeaderboard.vue'

export default {
  data() {
    return {
      ambiance: null,
    }
  },
  components: {
    TeamLeaderboard,
    PlayerLeaderboard,
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
.index-container {
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

.leaderboard {
  margin: 8px;
}
</style>
