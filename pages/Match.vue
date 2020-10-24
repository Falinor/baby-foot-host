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
      win: false,
      winner: null,
      supporter: null,
      ambiance: null,
      ambianceList: [
        './PSG.mp3',
        './Crowd1.mp3',
        './Strasbourgeois.mp3',
        './Crowd2.mp3',
        './Qui ne saute pas.wav',
        './Crowd3.mp3', // 2.27
        './Allezlaval.mp3',
        './Crowd4.mp3',
        './Cantona.wav', // 4.32
        './Crowd5.mp3',
        './Diabos.mp3',
        './Crowd4.mp3',
      ],
      goalList: [
        './PAVARD.mp3',
        './Goal.mp3',
        './Goal1.mp3',
        './Goal2.mp3',
        './Goal3.mp3',
        './Goal4.mp3',
        './Goal5.mp3',
        './Goal6.mp3',
        './Goal7.mp3',
        './Goal8.mp3',
        './Goal9.mp3',
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
      const i = randomElement(this.goalList)
      const goal = new Audio(i)
      goal.volume = 1
      goal.play()
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
    fakeGoal() {
      this.dialog = false
      this.winner.points = 9
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
