<template>
  <v-container fluid class="container">
    <v-row align="baseline">
      <v-btn to="/" text>
        <v-icon left dark>mdi-arrow-left-bold</v-icon>
        Back
      </v-btn>
      <h2 class="title">Creating Ranked Game</h2>
    </v-row>
    <v-row justify="center" align="center">
      <teams :teams="teams" />
    </v-row>
    <v-row justify="center" align="center"
      ><v-btn v-if="ready" to="match">Lancer la partie</v-btn></v-row
    >
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Teams from '@/components/Teams.vue'

export default {
  components: {
    Teams,
  },
  data() {
    return {
      ready: true,
    }
  },
  computed: mapGetters('match', ['teams']),
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
</style>
