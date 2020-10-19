<template>
  <v-container fluid class="container">
    <v-btn to="/" text>
      <v-icon left dark>mdi-arrow-left-bold</v-icon>
      Back
    </v-btn>
    <v-btn v-if="ready1 & ready2 & ready3 & ready4" x-large to="/Match"
      >Ready</v-btn
    >
    <div>
      <div>
        <v-btn @click="ready1 = true">Add Player</v-btn>
        <v-progress-circular
          v-if="!ready1"
          size="90"
          width="8"
          indeterminate
          color="blue"
          ><div>Player 1</div></v-progress-circular
        >
      </div>
      <div>
        <v-btn @click="ready2 = true">Add Player</v-btn>
        <v-progress-circular
          v-if="!ready2"
          size="90"
          width="8"
          indeterminate
          color="red"
          ><div>Player 2</div></v-progress-circular
        >
      </div>
      <div>
        <v-btn @click="ready3 = true">Add Player</v-btn>
        <v-progress-circular
          v-if="!ready3"
          size="90"
          width="8"
          indeterminate
          color="blue"
          ><div>Player 3</div></v-progress-circular
        >
      </div>
      <div>
        <v-btn @click="ready4 = true">Add Player</v-btn>
        <v-progress-circular
          v-if="!ready4"
          size="90"
          width="8"
          indeterminate
          color="red"
          ><div>Player 4</div></v-progress-circular
        >
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
