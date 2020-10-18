<template>
  <v-card light>
    <v-card-text>
      <v-row v-for="(team, i) of filledTeams" :key="i">
        <v-col v-for="(player, j) of team.players" :key="j" class="player">
          <span :style="{ color: team.color }">
            <template v-if="player">{{ player }}</template>
            <template v-else>Waiting for player...</template>
          </span>
          <v-progress-linear v-if="!player" indeterminate :color="team.color" />
        </v-col>
      </v-row>
    </v-card-text>
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
    filledTeams() {
      return this.teams.map((team) => ({
        ...team,
        players:
          team.players.length === 1 ? [...team.players, null] : team.players,
      }))
    },
  },
}
</script>

<style scoped></style>
