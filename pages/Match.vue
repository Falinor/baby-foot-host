<template>
  <v-container fluid class="container">
    <v-btn x-large @click="cancelMatch">Cancel Match</v-btn>
    <div>
      <score :teams="teams"></score>
    </div>
    <v-dialog v-model="win" persistent fullscreen>
      <v-card>
        <v-card-text>
          <center>WE HAVE A WINNER</center>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Validate last goal?</v-card-title>
        <v-card-text>
          <center>
            {{ teams[0].name }} {{ teams[0].points }} - {{ teams[1].points }}
            {{ teams[1].name }}
          </center>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="yellow darken-1" @click="gameWinner()">Yes</v-btn>
          <v-btn color="yellow darken-1" @click="fakeGoal()">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <notification v-model="notification.show" :color="notification.color">
      {{ notification.text }}
    </notification>
  </v-container>
</template>

<script>
import Notification from '@/components/Notification'
import { config, GameMode } from '@/core'
import { matchService, rankedGameService, recorderService } from '@/services'
import { sumBy } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  components: { Notification },
  data() {
    return {
      goalNb: 0,
      win: false,
      winner: null,
      goal: new Audio(),
      ambiance: new Audio(),
      ambianceList: [
        '/sounds/PSG.mp3',
        '/sounds/Crowd1.mp3',
        '/sounds/Strasbourgeois.mp3',
        '/sounds/Crowd2.mp3',
        '/sounds/Qui ne saute pas.mp3',
        '/sounds/Crowd3.mp3', // 2.27
        '/sounds/Allezlaval.mp3',
        '/sounds/Crowd4.mp3',
        '/sounds/Cantona.mp3', // 4.32
        '/sounds/Crowd5.mp3',
        '/sounds/Diabos.mp3',
        '/sounds/Crowd4.mp3',
      ],
      goalList: [
        '/sounds/Goal.mp3',
        '/sounds/Goal1.mp3',
        '/sounds/Goal2.mp3',
        '/sounds/Goal3.mp3',
        '/sounds/Goal4.mp3',
        '/sounds/Goal5.mp3',
        '/sounds/Goal6.mp3',
        '/sounds/Goal7.mp3',
        '/sounds/Goal8.mp3',
        '/sounds/Goal9.mp3',
        '/sounds/Goal10.mp3',
      ],
      notification: {
        show: false,
        color: 'accent',
        text: undefined,
      },
    }
  },
  computed: {
    ...mapGetters('match', ['teams', 'mode']),
    dialog() {
      return this.teams.some((team) => team.points === config.maxPoints)
    },
  },
  async created() {
    try {
      await recorderService.connect()
      await recorderService.startRecording()
    } catch (err) {
      this.notification.text = 'Recording unavailable'
      this.notification.show = true
    }
    if (this.mode === GameMode.RANKED) {
      await rankedGameService.startAttraction()
    }
  },
  async mounted() {
    await this.playAmbiance()
    matchService.onMatchUpdate(async (teamName) => {
      const scoringTeam = this.teams.find((team) => team.name !== teamName)
      this.$store.commit('match/incrementTeamPoints', scoringTeam.name)
      await this.playGoal()
      if (scoringTeam.points === 10) {
        this.winner = scoringTeam
        this.dialog = true
      }
    })
  },
  async destroyed() {
    await recorderService.stopRecording()
    recorderService.disconnect()
    this.stopGoal()
    this.stopAmbiance()
    this.$store.commit('match/endMatch', { root: true })
  },
  methods: {
    async playGoal() {
      this.ambiance.pause()
      // Return a sound sequentially depending on the score
      const sound = sumBy(this.teams, 'points') % this.goalList.length
      this.goal.src = this.goalList[sound]
      this.goal.volume = 1
      await this.goal.play()
      // Resume ambiance after the goal has ended
      this.goal.addEventListener('ended', () => this.ambiance.play(), {
        once: true,
      })
    },
    stopGoal() {
      this.goal.pause()
    },
    async playAmbiance() {
      const playlist = this.ambianceList
      let i = 0
      this.ambiance.addEventListener(
        'ended',
        async () => {
          i = i++ < playlist.length ? i : 0
          this.ambiance.src = playlist[i]
          await this.ambiance.play()
        },
        true
      )
      this.ambiance.volume = 0.4
      this.ambiance.loop = false
      this.ambiance.src = './sounds/start.mp3'
      await this.ambiance.play()
    },
    stopAmbiance() {
      this.ambiance.pause()
    },
    async gameWinner() {
      this.win = true
      this.ambiance.pause()
      const final = new Audio('/sounds/Final.mp3')
      final.volume = 1
      await final.play()
      await this.$store.dispatch('match/endMatch')
      setTimeout(() => {
        this.$router.replace('/')
      }, 5000)
    },
    async cancelMatch() {
      if (this.mode === GameMode.RANKED) {
        await rankedGameService.stopAttraction()
      }
      await this.$router.replace('/')
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
