<template>
  <video autoplay @ended="onEnd">
    <source src="/olive-et-tom-generique-2011-hd-youtube.mp4" />
  </video>
</template>

<script>
export default {
  methods: {
    onEnd() {
      this.$store.commit('app/disableOpening')
    },
  },
}
</script>

<style>
video {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>
