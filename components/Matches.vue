<template>
  <v-card>
    <v-card-title> Latest matches </v-card-title>
    <v-data-iterator :items="matches" :items-per-page="5">
      <template v-slot:no-data>
        <p class="no-result">No match has been played yet.</p>
      </template>
      <template v-slot:no-results>
        <p class="no-result">No match found for this search.</p>
      </template>
      <template v-slot:default="{ items }">
        <v-list dense>
          <v-list-item v-for="match in items" :key="match.id">
            <v-list-item-content class="match">
              <v-col class="players" cols="4">
                <div v-for="player in match.teams[0].players" :key="player.id">
                  {{ player.nickname }}
                </div>
              </v-col>
              <v-col cols="4" class="text-h5">
                <span>
                  <v-icon v-if="isWinner(match.teams[0])">mdi-trophy</v-icon>
                  {{ match.teams[0].points }}
                </span>
                <span> - </span>
                <span>
                  {{ match.teams[1].points }}
                  <v-icon v-if="isWinner(match.teams[1])">mdi-trophy</v-icon>
                </span>
              </v-col>
              <v-col class="players" cols="4">
                <div v-for="player in match.teams[1].players" :key="player.id">
                  {{ player.nickname }}
                </div>
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import { config } from '@/core'

export default {
  props: {
    matches: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isWinner(team) {
      return team.points === config.maxPoints
    },
  },
}
</script>

<style scoped>
.no-result {
  padding: 0 1rem;
}

.match {
  text-align: center;
}

.players > * {
  padding: 0.5rem 0;
}
</style>
