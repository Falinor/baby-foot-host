<template>
  <leaderboard title="Team leaderboard" :items="teams" :loading="loading" />
</template>

<script>
import Leaderboard from '@/components/Leaderboard'
import { teamService } from '@/services'

export default {
  components: { Leaderboard },
  data: () => ({
    loading: false,
    teams: [],
  }),
  async mounted() {
    try {
      this.loading = true
      this.teams = await teamService.find()
    } catch (err) {
    } finally {
      this.loading = false
    }
  },
}
</script>
