<template>
  <v-container fluid class="index-container">
    <opening v-if="playOpening" />
    <template v-else>
      <v-row>
        <v-col class="modes" cols="4">
          <v-btn to="/ranked" x-large text>Ranked game</v-btn>
          <v-btn x-large text @click="quickplay">Quickplay</v-btn>
        </v-col>
        <v-col cols="4">
          <matches :matches="matches" />
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

import Matches from '@/components/Matches.vue'
import Opening from '@/components/Opening.vue'
import PlayerLeaderboard from '@/components/PlayerLeaderboard.vue'
import TeamLeaderboard from '@/components/TeamLeaderboard.vue'
import { matchService } from '@/services'
import { GameMode, Status } from '@/core'

export default {
  components: {
    Matches,
    TeamLeaderboard,
    PlayerLeaderboard,
    Opening,
  },
  data: () => ({
    matches: [],
  }),
  computed: {
    ...mapGetters('app', ['playOpening']),
  },
  async mounted() {
    this.matches = await matchService.find().catch(console.log)
  },
  methods: {
    async quickplay() {
      const { status } = this.$store.state.app
      const { match } = this.$store.state
      if (!match || status === Status.FREE) {
        await this.$store.dispatch('match/start', GameMode.QUICKPLAY)
      }
      await this.$router.push('/match')
    },
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
