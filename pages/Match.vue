<template>
  <v-container fluid class="container">
    <v-btn x-large to="/">Match End </v-btn>
    <div>
      <center>{{ Math.trunc(timerCount / 60) }}:{{ timerCount % 60 }}</center>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      timerCount: 0,
    }
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value < 120) {
          setTimeout(() => {
            this.timerCount++
          }, 1000)
        }
      },
      immediate: true,
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
