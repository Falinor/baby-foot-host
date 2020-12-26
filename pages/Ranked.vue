<template>
  <v-container fluid class="container">
    <v-row align="baseline">
      <v-btn to="/" text>
        <v-icon left dark>mdi-arrow-left-bold</v-icon>
        Back
      </v-btn>
      <h2 class="title">Creating Ranked Game</h2>
    </v-row>
    <v-row justify="center" align="center">
      <teams :teams="teams" @start="start" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Teams from '@/components/Teams.vue'
import { GameMode } from '@/core'
import { matchService } from '@/services'
import { delay } from '../core'

export default {
  components: {
    Teams,
  },
  data: () => ({
    interval: null,
  }),
  computed: mapGetters('match', ['teams']),
  created() {
    matchService.onTeamsUpdate((teams) => {
      this.$store.commit('match/setTeams', teams)
    })
  },
  methods: {
    async start() {
      await this.$store.dispatch('match/start', GameMode.RANKED)
      await delay(5000)
      await this.$router.push('/match')
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/cover no-repeat url('/test.jpg');
}

.title {
  padding: 0 2rem;
}
</style>
