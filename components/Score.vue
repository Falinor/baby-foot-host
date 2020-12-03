<template>
  <div>
    <v-sheet
      class="score mx-auto"
      light
      elevation="16"
      max-width="600"
      max-height="100"
    >
      <div class="team">
        <div class="logo-left">
          <v-img contain src="/logo-batman.png" max-width="100" />
        </div>
        <div class="buttons">
          <v-icon small @click="incrementPoints(batmen)">mdi-plus</v-icon>
          <v-icon small @click="decrementPoints(batmen)">mdi-minus</v-icon>
        </div>
        <h2 class="points text-h2">{{ batmen.points }}</h2>
      </div>
      <v-divider vertical />
      <div class="team">
        <h2 class="points text-h2">{{ jokers.points }}</h2>
        <div class="buttons">
          <v-icon small @click="incrementPoints(jokers)">mdi-plus</v-icon>
          <v-icon small @click="decrementPoints(jokers)">mdi-minus</v-icon>
        </div>
        <div class="logo-right">
          <v-img contain src="/logo-joker.png" max-width="100" />
        </div>
      </div>
    </v-sheet>
    <v-sheet class="timer mx-auto" elevation="16" width="100" height="40">
      <span>{{ timer }}</span>
    </v-sheet>
  </div>
</template>

<script>
import { config, delay } from '@/core'

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
      const minutes = Math.floor(this.timerCount / 60)
      const seconds = Math.floor(this.timerCount % 60)
      const pad = (time) => time.toString().padStart(2, '0')
      return `${pad(minutes)}:${pad(seconds)}`
    },
  },
  watch: {
    timerCount: {
      async handler(value) {
        if (value < 1800) {
          // 30min
          await delay(1000)
          this.timerCount++
        }
      },
      immediate: true,
    },
  },
  methods: {
    decrementPoints(team) {
      if (team.points >= 1) {
        this.$emit('decrement', team)
      }
    },
    incrementPoints(team) {
      if (team.points < config.maxPoints) {
        this.$emit('increment', team)
      }
    },
  },
}
</script>

<style scoped>
.score {
  position: fixed;
  top: 0;
  left: calc(50% - 215px);
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

.logo-left {
  padding-right: 16px;
}

.logo-right {
  padding-left: 16px;
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
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>
