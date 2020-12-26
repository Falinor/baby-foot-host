<template>
  <v-card light min-width="600">
    <v-card-text class="teams">
      <v-col v-for="(team, i) of filledTeams" :key="i" cols="6">
        <div class="logo">
          <v-img contain :src="logo(team)" max-width="200" />
        </div>
        <div v-for="(player, j) of team.players" :key="j" class="player">
          <span class="text-h5" :style="{ color: team.color }">
            <template v-if="player">{{ player.nickname }}</template>
            <template v-else>Waiting for player...</template>
          </span>
          <v-progress-linear v-if="!player" indeterminate :color="team.color" />
        </div>
      </v-col>
    </v-card-text>
    <v-card-actions class="actions">
      <v-btn
        x-large
        text
        color="accent"
        :disabled="!canStart"
        @click="$emit('start')"
      >
        Start
        <v-icon large right>mdi-soccer</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
  computed: {
    canStart() {
      return this.teams.every((team) => team.players.length === 2)
    },
    filledTeams() {
      const maxPlayers = 2
      return this.teams.map((team) => {
        if (team.players.length < maxPlayers) {
          const nullPlayers = new Array(maxPlayers - team.players.length).fill(
            null
          )
          return {
            ...team,
            players: [...team.players, ...nullPlayers],
          }
        }
        return team
      })
    },
  },
  methods: {
    logo(team) {
      const name = team.name.toLowerCase()
      return `/logo-${name}.png`
    },
  },
}
</script>

<style scoped>
.teams {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.player {
  padding: 1rem 0;
  text-align: center;
}

.actions {
  justify-content: center;
}

.logo {
  height: 200px;
  display: flex;
  justify-content: center;
}
</style>
