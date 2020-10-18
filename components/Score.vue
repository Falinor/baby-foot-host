<template>
  <div>
    <v-sheet class="score mx-auto" light elevation="16" width="400" height="70">
      <div class="team">
        <h5 class="name text-h5">{{ batmen.name }}</h5>
        <h2 class="points text-h2">{{ batmen.points }}</h2>
      </div>
      <v-divider vertical />
      <div class="team">
        <h2 class="points text-h2">{{ jokers.points }}</h2>
        <h5 class="name text-h5">{{ jokers.name }}</h5>
      </div>
    </v-sheet>
    <v-sheet class="timer mx-auto" elevation="16" width="100" height="40">
      {{ timer }}
    </v-sheet>
  </div>
</template>

<script>
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
}

.points {
  display: inline;
}

.name {
  display: inline;
  padding: 0 1rem;
}

.timer {
  position: fixed;
  top: 70px;
  left: calc(50% - 50px);
}
</style>
