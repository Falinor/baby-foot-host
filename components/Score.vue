<template>
  <div>
    <v-sheet class="score mx-auto" light elevation="16" width="400" height="70">
      <div class="team">
        <h5 class="name text-h5">{{ batmen.name }}</h5>
        <div class="buttons">
          <v-icon small @click="plusPoints(batmen)">mdi-plus</v-icon>
          <v-icon small @click="minusPoints(batmen)">mdi-minus</v-icon>
        </div>
        <h2 class="points text-h2">{{ batmen.points }}</h2>
      </div>
      <v-divider vertical />
      <div class="team">
        <h2 class="points text-h2">{{ jokers.points }}</h2>
        <div class="buttons">
          <v-icon small @click="plusPoints(jokers)">mdi-plus</v-icon>
          <v-icon small @click="minusPoints(jokers)">mdi-minus</v-icon>
        </div>
        <h5 class="name text-h5">{{ jokers.name }}</h5>
      </div>
    </v-sheet>
    <v-sheet class="timer mx-auto" elevation="16" width="100" height="40">
      <center>{{ timer }}</center>
    </v-sheet>
  </div>
</template>

<script>
import { config } from '@/core'

export default {
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    timerCount: 0,
  }),
  computed: {
    batmen() {
      return this.teams[0]
    },
    jokers() {
      return this.teams[1]
    },
    timer() {
      return `${Math.trunc(this.timerCount / 60)}:${this.timerCount % 60}`
    },
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value < 1800) {
          // 30min
          setTimeout(() => {
            this.timerCount++
          }, 1000)
        }
      },
      immediate: true,
    },
  },
  methods: {
    minusPoints(team) {
      if (team.points >= 1)
        this.$store.commit('match/decrementTeamPoints', team.name)
    },
    plusPoints(team) {
      if (team.points < config.maxPoints) {
        this.$emit('goal', team)
      }
    },
  },
}
</script>

<style scoped>
.score {
  position: fixed;
  top: 0;
  left: calc(50% - 200px);
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.team {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex: 1 0 50%;
}

.points {
  display: inline;
  padding: 0 4px;
}

.name {
  display: inline;
  padding: 0 1rem;
}

.buttons {
  display: flex;
  flex-flow: column;
}

.timer {
  position: fixed;
  top: 80px;
  left: calc(50% - 50px);
  font-size: x-large;
}
</style>
