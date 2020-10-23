<template>
  <leaderboard title="Player leaderboard" :items="players" :loading="loading" />
</template>

<script>
import Leaderboard from '@/components/Leaderboard'
import { playerService } from '@/services'

export default {
  components: { Leaderboard },
  data: () => ({
    loading: false,
    players: [],
  }),
  async mounted() {
    try {
      this.loading = true
      this.players = await playerService.find()
    } catch (err) {
    } finally {
      this.loading = false
    }
  },
}
</script>
