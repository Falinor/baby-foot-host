<template>
  <v-container fluid class="container">
    <v-btn to="/"> Retour </v-btn>
    <h1>Creating Ranked Game</h1>
    <h1>Waiting for players</h1>
    <v-row>
      <v-col>
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
        <v-progress-circular indeterminate color="red"> </v-progress-circular>
        <v-progress-circular indeterminate color="red"> </v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  height: 100%;
  background: center/contain no-repeat url('/soccer-field-from-above.jpg');
}
</style>
