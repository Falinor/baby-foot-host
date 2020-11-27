<template>
  <audio ref="audio" :src="current" :loop="loop" @ended="onEnd" />
</template>

<script>
import { delay } from '@/core'

export default {
  props: {
    playlist: {
      type: Array,
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    volume: {
      type: Number,
      default: 1,
    },
    duration: {
      type: Number,
      default: 5000,
    },
    fadeIn: {
      type: Boolean,
      default: false,
    },
    fadeOut: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    i: 0,
    current: null,
  }),
  watch: {
    volume(val) {
      this.$refs.audio.volume = val
    },
  },
  methods: {
    async next() {
      this.current = this.playlist[this.i++]
      await this.$nextTick()
      await this.$refs.audio.play()
      if (this.fadeIn) {
        await this.startFadeIn()
      }
      if (this.fadeOut) {
        await delay(this.duration)
        await this.startFadeOut()
      }
    },
    pause() {
      return this.$refs.audio.pause()
    },
    async onEnd() {
      if (this.autoplay) {
        await this.next()
      }
      this.$emit('ended')
    },
    startFadeIn() {
      return new Promise((resolve) => {
        this.$refs.audio.volume = 0
        const interval = setInterval(() => {
          this.$refs.audio.volume = Number(
            (this.$refs.audio.volume + 0.1).toFixed(1)
          )
          if (this.$refs.audio.volume === 1) {
            clearInterval(interval)
            resolve()
          }
        }, 100)
      })
    },
    startFadeOut() {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          this.$refs.audio.volume = Number(
            (this.$refs.audio.volume - 0.1).toFixed(1)
          )
          if (this.$refs.audio.volume === 0) {
            clearInterval(interval)
            this.pause()
            resolve()
            this.$refs.audio.volume = 1
            this.current = ''
            this.$emit('ended')
          }
        }, 100)
      })
    },
  },
}
</script>
