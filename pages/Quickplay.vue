<template>
  <v-container fluid class="container">
    <v-btn x-large to="/"> Retour </v-btn>
    <v-btn v-if="ready4" x-large to="/Match">Ready</v-btn>
    <div>
      <dir>
        <v-progress-circular size="90" width="8" indeterminate color="blue"
          ><div>Player 1</div></v-progress-circular
        >
        <v-btn @click="ready1 = true">Add Player</v-btn>
      </dir>
      <div>
        <v-progress-circular size="90" width="8" indeterminate color="red"
          ><div>Player 2</div></v-progress-circular
        >
        <v-btn @click="ready2 = true">Add Player</v-btn>
      </div>
      <div>
        <v-progress-circular size="90" width="8" indeterminate color="blue"
          ><div>Player 3</div></v-progress-circular
        >
        <v-btn @click="ready3 = true">Add Player</v-btn>
      </div>
      <div>
        <v-progress-circular size="90" width="8" indeterminate color="red"
          ><div>Player 4</div></v-progress-circular
        >
        <v-btn @click="ready4 = true">Add Player</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ready1: false,
    ready2: false,
    ready3: false,
    ready4: false,
  }),
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/cover no-repeat url('/test.jpg');
}
</style>
