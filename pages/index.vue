<template>
  <v-container fluid class="container">
    <v-row>
      <opening v-if="playOpening" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Opening from '@/components/Opening'

export default {
  components: {
    Opening,
  },
  data: () => ({
    teams: [
      ['P1', 'P2'],
      ['P3', 'P4'],
    ],
  }),
  computed: {
    ...mapGetters('app', ['playOpening']),
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  background: center/contain no-repeat url('/soccer-field-from-above.jpg');
}
</style>
