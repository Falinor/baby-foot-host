<template>
  <v-container fluid class="container">
    <v-btn x-large to="/">Cancel Match</v-btn>
    <div>
      <score :teams="teams"></score>
    </div>
    <v-dialog v-model="win" persistent fullscreen
      ><v-card
        ><v-card-text><center>WE HAVE A WINNER</center></v-card-text></v-card
      ></v-dialog
    >
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Valider le dernier but ? </v-card-title>
        <v-card-text>
          <center>
            {{ teams[0].name }} {{ teams[0].points }} - {{ teams[1].points }}
            {{ teams[1].name }}
          </center>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="yellow darken-1" @click="gameWinner()"> Oui </v-btn>
          <v-btn color="yellow darken-1" @click="fakeGoal()"> Non </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { config, randomElement } from '@/core'
import { matchService } from '@/services'

export default {
  data() {
    return {
      goalNb: 0,
      win: false,
      winner: null,
      supporter: null,
      ambiance: null,
      ambianceList: [
        './sounds/PSG.mp3',
        './sounds/Crowd1.mp3',
        './sounds/Strasbourgeois.mp3',
        './sounds/Crowd2.mp3',
        './sounds/Qui ne saute pas.wav',
        './sounds/Crowd3.mp3', // 2.27
        './sounds/Allezlaval.mp3',
        './sounds/Crowd4.mp3',
        './sounds/Cantona.wav', // 4.32
        './sounds/Crowd5.mp3',
        './sounds/Diabos.mp3',
        './sounds/Crowd4.mp3',
      ],
      goalList: [
        './sounds/PAVARD.mp3',
        './sounds/Goal.mp3',
        './sounds/Goal1.mp3',
        './sounds/Goal2.mp3',
        './sounds/Goal3.mp3',
        './sounds/Goal4.mp3',
        './sounds/Goal5.mp3',
        './sounds/Goal6.mp3',
        './sounds/Goal7.mp3',
        './sounds/Goal8.mp3',
        './sounds/Goal9.mp3',
        './sounds/Goal10.mp3',
      ],
    }
  },
  computed: {
    teams() {
      return this.$store.getters['match/teams']
    },
    score() {
      return (name) => this.$store.getters['match/score'](name)
    },
    dialog() {
      return this.teams.some((team) => team.points === config.maxPoints)
    },
  },
  watch: {
    score(newScore) {
      this.dialog = newScore === config.maxPoints
    },
  },
  mounted() {
    console.log(this.teams[0].points)
    this.playAmbiance()
    matchService.onMatchUpdate((teamName) => {
      const scoringTeam = this.teams.find((team) => team.name !== teamName)
      this.$store.commit('match/incrementTeamPoints', scoringTeam.name)
      this.playGoal()
      if (scoringTeam.points === 10) {
        this.winner = scoringTeam
        this.dialog = true
      }
    })
  },
  destroyed() {
    try {
      this.stopGoal()
    } catch (err) {
      console.error(err)
    }
    this.stopAmbiance()
    this.$store.commit('match/resetMatch')
  },
  methods: {
    playGoal() {
      const i = this.goalList[this.goalNb]
      const goal = new Audio(i)
      goal.volume = 1
      goal.play()
      if (this.goalNb === this.goalList.length - 1) this.goalNb = 0
      else this.goalNb++
    },
    stopGoal() {
      this.goal.pause()
    },
    playAmbiance() {
      const playlist = this.ambianceList
      let i = 0
      this.ambiance = new Audio()
      this.ambiance.addEventListener(
        'ended',
        () => {
          i = i++ < playlist.length ? i : 0
          this.ambiance.src = playlist[i]
          this.ambiance.play()
        },
        true
      )
      this.ambiance.volume = 0.4
      this.ambiance.loop = false
      this.ambiance.src = './start.mp3'
      this.ambiance.play()
    },
    stopAmbiance() {
      this.ambiance.pause()
    },
    gameWinner() {
      this.win = true
      this.ambiance.pause()
      const a = new Audio('./Final.mp3')
      a.volume = 1
      a.play()
      setTimeout(() => {
        this.$router.replace('/')
      }, 5000)
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
