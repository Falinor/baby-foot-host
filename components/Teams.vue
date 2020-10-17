<template>
  <v-row class="teams">
    <v-col class="team" v-for="(team, i) of teams" :key="i" cols="6">
      <span class="player" v-for="(player, j) of team" :key="j">
        {{ player }}
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.teams {
  height: 100%;
  width: 50%;
  margin: 0 auto;
}

.team {
  display: flex;
  flex-flow: column;
  text-align: center;
}

.player {
  font-size: 1.8rem;
  background-color: red;
  margin: 8px 0;
}
</style>
