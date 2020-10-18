export const state = () => ({
  teams: [
    { color: 'black', name: 'batman', players: [], points: 0 },
    { color: 'purple', name: 'joker', players: [], points: 0 },
  ],
})

export const getters = {
  teams: (state) => state.teams,
  score: (state) => (team) => state.teams.find((t) => t.name === team).points,
}

export const mutations = {
  setTeams(state, teams) {
    state.teams = teams
  },
  incrementTeamPoints(state, name) {
    const team = state.teams.find((t) => t.name === name)
    if (team) {
      team.points++
    }
  },
}
