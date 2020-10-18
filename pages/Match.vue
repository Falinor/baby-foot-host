<template>
  <v-container fluid class="container">
    <v-btn x-large to="/">Match End </v-btn>
    <div>
      <score :teams="teams" />
      <v-btn @click="playGoal()">GOAL</v-btn>
    </div>
  </v-container>
</template>

<script>
// import WebcamPlayer from '@/components/WebcamPlayer'
import { matchService } from '@/services'
import { mapGetters } from 'vuex'
import { randomElement } from '@/core'

export default {
  // components: { WebcamPlayer },
  data() {
    return {
      supporter: null,
      ambiance: null,
      goal: null,
      timerCount: 0,
      ambianceList: [
        './Qui ne saute pas.wav',
        './Allezlaval.mp3',
        './Cantona.wav',
        './Strasbourgeois.mp3',
        './Crowd.mp3',
      ],
      goalList: ['./PAVARD.mp3', './Goal.mp3'],
    }
  },
  computed: mapGetters('match', ['teams']),
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
  mounted() {
    this.playAmbiance()
    matchService.onMatchUpdate((team) => {
      console.log(`The team ${team} scored a goal!`)
      this.$store.commit('match/incrementTeamPoints', team)
      this.playGoal()
    })
  },
  destroyed() {
    this.stopGoal()
    this.stopAmbiance()
  },
  methods: {
    playGoal() {
      const i = randomElement(this.goalList)
      this.goal = new Audio(i)
      this.goal.volume = 1
      this.goal.play()
    },
    stopGoal() {
      this.goal.pause()
    },
    playAmbiance() {
      const i = randomElement(this.ambianceList)
      this.ambiance = new Audio(i)
      this.ambiance.volume = 0.3
      this.ambiance.play()
    },
    stopAmbiance() {
      this.ambiance.pause()
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/cover no-repeat url('/soccer-field-from-above.jpg');
}
</style>
