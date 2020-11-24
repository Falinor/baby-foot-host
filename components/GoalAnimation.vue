<template>
  <transition name="fade-out">
    <video
      v-show="playing"
      ref="animation"
      class="animation"
      :src="src"
      @ended="onEnd()"
    />
  </transition>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    playing: false,
  }),
  methods: {
    play() {
      this.playing = true
      return this.$refs.animation.play()
    },
    onEnd() {
      this.playing = false
      console.log('onEnd')
    },
  },
}
</script>

<style scoped>
.fade-out-enter,
.fade-out-leave-to {
  opacity: 0;
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
