<template>
  <v-container fluid class="container">
    <soccer-ball />
    <sound ref="goal" :playlist="goals" @ended="onGoalEnd" />
    <sound ref="ambiance" autoplay :playlist="ambiances" :volume="4" />
    <goal-animation ref="batmanAnimation" src="/batman.mp4" />
    <goal-animation ref="jokerAnimation" src="/joker.mp4" />
    <v-btn x-large @click="cancelMatch">Cancel Match</v-btn>
    <div>
      <score :teams="teams" @increment="increment" @decrement="decrement" />
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
          <v-btn color="yellow darken-1" @click="gameWinner">Yes</v-btn>
          <v-btn color="yellow darken-1" @click="cancelWinner">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <notification v-model="notification.show" :color="notification.color">
      {{ notification.text }}
    </notification>
  </v-container>
</template>

<script>
import { maxBy } from 'lodash'
import { mapGetters } from 'vuex'

import GoalAnimation from '@/components/GoalAnimation.vue'
import Notification from '@/components/Notification.vue'
import SoccerBall from '@/components/SoccerBall.vue'
import Sound from '@/components/Sound'
import { config, delay, GameMode, Scene } from '@/core'
import { matchService, rankedGameService, streamService } from '@/services'

export default {
  components: { GoalAnimation, Notification, Sound, SoccerBall },
  data() {
    return {
      sceneRotation: true,
      goalNb: 0,
      win: false,
      winner: null,
      ambiances: [
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
      goals: [
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
      await streamService.connect()
      await streamService.startRecording()
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
      this.increment(scoringTeam)
    })
  },
  async destroyed() {
    await streamService.switchScene(Scene.HOST)
    await streamService.stopRecording()
    streamService.disconnect()
    this.stopGoal()
    this.stopAmbiance()
    this.$store.commit('match/endMatch', { root: true })
  },
  methods: {
    async playGoal() {
      this.$refs.ambiance.pause()
      await this.$refs.goal.next()
    },
    async onGoalEnd() {
      await Promise.all([this.playAmbiance(), this.startSceneRotation()])
    },
    stopGoal() {
      this.$refs.goal.pause()
    },
    async playAmbiance() {
      await this.$refs.ambiance.next()
    },
    stopAmbiance() {
      this.$refs.ambiance.pause()
    },
    async gameWinner() {
      this.win = true
      this.$refs.ambiance.pause()
      const final = new Audio('/sounds/Final.mp3')
      final.volume = 1
      await Promise.all([final.play(), this.$store.dispatch('match/endMatch')])
      await delay(5000)
      await this.$router.replace('/')
    },
    async cancelWinner() {
      this.win = false
      await this.playAmbiance()
      const team = maxBy(this.teams, 'points')
      this.$store.commit('match/decrementTeamPoints', team.name)
    },
    async cancelMatch() {
      if (this.mode === GameMode.RANKED) {
        await rankedGameService.stopAttraction()
      }
      await this.$router.replace('/')
    },
    async increment(team) {
      if (team.points < config.maxPoints) {
        this.stopSceneRotation()
        team.name === 'Batman'
          ? await this.$refs.batmanAnimation.play()
          : await this.$refs.jokerAnimation.play()
        await streamService.switchScene(`Camera ${team.name}`)
        await this.playGoal()
        this.$store.commit('match/incrementTeamPoints', team.name)

        if (team.points === config.maxPoints) {
          this.winner = team
          this.dialog = true
        }
      }
    },
    decrement(team) {
      this.$store.commit('match/decrementTeamPoints', team.name)
    },
    async startSceneRotation() {
      this.sceneRotation = true
      const scenes = [
        { name: Scene.HOST, duration: 5000 },
        { name: Scene.CAMERA_BATMAN, duration: 10000 },
        { name: Scene.CAMERA_JOKER, duration: 10000 },
      ]
      const doSwitch = async (i) => {
        try {
          if (this.sceneRotation) {
            const scene = scenes[i]
            await streamService.switchScene(scene.name)
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
.animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 9999;
  transition: 1s opacity;
}

.container {
  height: 100%;
  background: center/cover no-repeat url('/soccer-field-from-above.jpg');
}
</style>
