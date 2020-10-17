<template>
  <v-container fluid class="container">
    <v-row align="baseline">
      <v-btn to="/" text>
        <v-icon left dark>mdi-arrow-left-bold</v-icon>
        Back
      </v-btn>
      <h2 class="title">Creating Ranked Game</h2>
    </v-row>
    <v-row class="players">
      <v-col>
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
        <v-progress-circular indeterminate color="red"> </v-progress-circular>
        <v-progress-circular indeterminate color="red"> </v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    teams: [],
    status: null,
  }),
  async created() {
    await this.fetchAttraction()
  },
  mounted() {
    setInterval(this.fetchAttraction, 5000)
  },
  methods: mapActions('app', ['fetchAttraction']),
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/cover no-repeat url('/test.jpg');
}

.title {
  padding: 0 2rem;
}

.players {
}
</style>
