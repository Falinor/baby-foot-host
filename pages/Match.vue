<template>
  <v-container fluid class="container">
    <v-btn x-large @click="cancelMatch">Cancel Match</v-btn>
    <div>
      <score :teams="teams" @goal="onGoal"></score>
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
import { sumBy } from 'lodash'
import { mapGetters } from 'vuex'

import Notification from '@/components/Notification'
import { config, delay, GameMode, Scene } from '@/core'
import { matchService, rankedGameService, recorderService } from '@/services'

export default {
  components: { Notification },
  data() {
    return {
      sceneRotation: true,
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
      // await recorderService.startRecording()
    } catch (err) {
      this.notification.text = 'Stream unavailable'
      this.notification.show = true
    }
    if (this.mode === GameMode.RANKED) {
      await rankedGameService.startAttraction()
    }
  },
  async mounted() {
    await this.playAmbiance()
    await this.startSceneRotation()

    matchService.onMatchUpdate((teamName) => {
      const scoringTeam = this.teams.find((team) => team.name !== teamName)
      this.onGoal(scoringTeam)
    })
  },
  async destroyed() {
    await recorderService.switchScene(Scene.HOST)
    // await recorderService.stopRecording()
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
      this.goal.addEventListener(
        'ended',
        () => {
          this.ambiance.play()
          this.startSceneRotation()
        },
        {
          once: true,
        }
      )
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
      this.ambiance.src = '/sounds/start.mp3'
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
      await Promise.all([final.play(), this.$store.dispatch('match/endMatch')])
      await delay(5000)
      await this.$router.replace('/')
    },
    async cancelMatch() {
      if (this.mode === GameMode.RANKED) {
        await rankedGameService.stopAttraction()
      }
      await this.$router.replace('/')
    },
    async onGoal(team) {
      this.stopSceneRotation()
      await recorderService.switchScene(`Camera ${team.name}`)
      await this.playGoal()
      this.$store.commit('match/incrementTeamPoints', team.name)

      if (team.points === 10) {
        this.winner = team
        this.dialog = true
      }
    },
    async startSceneRotation() {
      this.sceneRotation = true
      const scenes = [
        { name: Scene.HOST, duration: 2000 },
        { name: Scene.CAMERA_BATMAN, duration: 5000 },
        { name: Scene.CAMERA_JOKER, duration: 5000 },
      ]
      const doSwitch = async (i) => {
        try {
          if (this.sceneRotation) {
            const scene = scenes[i]
            await recorderService.switchScene(scene.name)
            await delay(scene.duration)
            await doSwitch((i + 1) % scenes.length)
          }
        } catch (err) {}
      }
      await doSwitch(0)
    },
    stopSceneRotation() {
      this.sceneRotation = false
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
