<template>
  <v-container fluid class="container">
    <v-btn x-large to="/"> Retour </v-btn>
    <v-row justify="space-around">
      <v-col cols="6">
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
      </v-col>
      <v-col cols="6">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
      </v-col>
      <v-col cols="6">
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
      </v-col>
      <v-col cols="6">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background: center/contain no-repeat url('/soccer-field-from-above.jpg');
}
</style>
