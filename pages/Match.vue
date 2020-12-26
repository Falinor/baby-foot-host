<template>
  <v-container fluid class="container">
    <soccer-ball />
    <goal-animation ref="batmanAnimation" src="/batman.mp4" />
    <goal-animation ref="jokerAnimation" src="/joker.mp4" />
    <v-btn x-large @click="cancelMatch">Cancel Match</v-btn>
    <div>
      <score
        :teams="teams"
        :started-at="startedAt"
        @increment="increment"
        @decrement="decrement"
      />
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
          <center v-if="teams && teams.length">
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
import GoalAnimation from '@/components/GoalAnimation.vue'
import Notification from '@/components/Notification.vue'
import SoccerBall from '@/components/SoccerBall.vue'
import { config } from '@/core'
import { matchService, streamService } from '@/services'
import { maxBy } from 'lodash'
import { mapGetters } from 'vuex'
import { delay } from '../core'

export default {
  components: { GoalAnimation, Notification, SoccerBall },
  data() {
    return {
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
    ...mapGetters('match', ['teams', 'mode', 'startedAt']),
    dialog() {
      return this.teams?.some((team) => team.points === config.maxPoints)
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
  },
  mounted() {
    matchService.onGoalScored(async (teamName) => {
      const team = this.$store.getters['match/team'](teamName)
      if (team.points < config.maxPoints) {
        team.name === 'Batman'
          ? await this.$refs.batmanAnimation.play()
          : await this.$refs.jokerAnimation.play()
        this.$store.commit('match/increment', team.name)
      }
    })
  },
  destroyed() {
    matchService.removeListeners()
  },
  methods: {
    async gameWinner() {
      this.win = true
      const final = new Audio('/sounds/Final.mp3')
      final.volume = 1
      await Promise.all([final.play(), this.$store.dispatch('match/end')])
      await delay(5)
      await this.$router.replace('/')
    },
    async cancelWinner() {
      this.win = false
      const team = maxBy(this.teams, 'points')
      await this.$store.dispatch('match/decrement', team.name)
    },
    async cancelMatch() {
      await this.$store.dispatch('match/cancel')
      await this.$router.replace('/')
    },
    async increment(team) {
      if (team.points < config.maxPoints) {
        team.name === 'Batman'
          ? await this.$refs.batmanAnimation.play()
          : await this.$refs.jokerAnimation.play()
        await this.$store.dispatch('match/increment', team.name)
      }
    },
    async decrement(team) {
      await this.$store.dispatch('match/decrement', team.name)
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
