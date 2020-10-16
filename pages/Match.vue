<template>
  <v-container fluid class="container">
    <v-btn x-large to="/">Match End </v-btn>
    <div></div>
    <center>Team Batman</center>
    <center>{{ Math.trunc(timerCount / 60) }}:{{ timerCount % 60 }}</center>
    <center>Team Joker</center>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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

  methods: {
    playAmbiance() {
      // <= use this function somewhere
      const audio = new Audio()
      const p = this.playlist
      let i = 0
      audio.addEventListener(
        'ended',
        function () {
          i = ++i < p.length ? i : 0
          audio.src = p[i]
          audio.play()
        },
        true
      )
      audio.volume = 0.3
      audio.loop = false
      audio.src = p[0]
      audio.play()
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
