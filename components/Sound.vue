<template>
  <audio ref="audio" :src="current" :loop="loop" @ended="onEnd" />
</template>

<script>
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
      this.current = this.playlist[this.i]
      await this.$nextTick()
      await this.$refs.audio.play()
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
  },
}
</script>
