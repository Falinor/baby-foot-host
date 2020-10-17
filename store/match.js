export const state = () => ({
  teams: [],
})

export const getters = {}

export const mutations = {
  setTeams(state, teams) {
    state.teams = teams
  },
}
