<template>
  <v-container fluid class="container">
    <v-btn x-large to="/">Match End </v-btn>
    <div>
      <center>Team Batman</center>
      <center>{{ Math.trunc(timerCount / 60) }}:{{ timerCount % 60 }}</center>
      <center>Team Joker</center>
      <webcam-player />
    </div>
  </v-container>
</template>

<script>
import WebcamPlayer from '@/components/WebcamPlayer'

export default {
  components: { WebcamPlayer },
  data() {
    return {
      audio: null,
      timerCount: 0,
      playlist: [
        './Qui ne saute pas.wav',
        './Allezlaval.mp3',
        './Cantona.wav',
        './Strasbourgeois.mp3',
      ],
    }
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
  mounted() {
    this.playAmbiance()
  },
  destroyed() {
    this.stopAmbiance()
  },
  methods: {
    playAmbiance() {
      // <= use this function somewhere
      this.audio = new Audio()
      const p = this.playlist
      let i = 0
      this.audio.addEventListener(
        'ended',
        function () {
          i = ++i < p.length ? i : 0
          this.audio.src = p[i]
          this.audio.play()
        },
        true
      )
      this.audio.volume = 0.3
      this.audio.loop = false
      this.audio.src = p[0]
      this.audio.play()
    },
    stopAmbiance() {
      this.audio.pause()
      delete this.audio
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/cover no-repeat url('/test.jpg');
}
</style>
