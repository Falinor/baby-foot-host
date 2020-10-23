<template>
  <v-container fluid class="container">
    <v-btn x-large @click="dialog = true">Match End </v-btn>
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
        <v-card-text
          ><center>
            {{ teams[0].name }} {{ teams[0].points }} - {{ teams[1].points }}
            {{ teams[1].name }}
          </center></v-card-text
        >
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
import { mapGetters } from 'vuex'
import { matchService } from '@/services'
import { randomElement } from '@/core'

export default {
  data() {
    return {
      win: false,
      winner: null,
      dialog: false,
      supporter: null,
      ambiance: null,
      goal: null,
      timerCount: 0,
      ambianceList: [
        './Crowd1.mp3',
        './Strasbourgeois.mp3',
        './Crowd2.mp3',
        './Qui ne saute pas.wav',
        './Crowd3.mp3', // 2.27
        './Allezlaval.mp3',
        './Crowd4.mp3',
        './Cantona.wav', // 4.32
        './Crowd5.mp3',
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
      // console.log(`The team ${team} scored a goal!`)
      this.$store.commit('match/incrementTeamPoints', team)
      this.playGoal()
      if (team.score === 10) {
        this.winner = team
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
      const playlist = this.ambianceList
      let i = 0
      this.ambiance = new Audio()
      this.ambiance.addEventListener(
        'ended',
        () => {
          i = ++i < playlist.length ? i : 0
          this.ambiance.src = playlist[i]
          this.ambiance.play()
        },
        true
      )
      this.ambiance.volume = 0.4
      this.ambiance.loop = false
      this.ambiance.src = playlist[0]
      this.ambiance.play()
    },
    stopAmbiance() {
      this.ambiance.pause()
    },
    gameWinner() {
      this.win = true
      setTimeout(() => {
        this.$router.replace('/')
      }, 3000)
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
