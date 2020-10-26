import { GameMode } from '@/core'
import { matchService } from '@/services'

export const getInitialState = () => {
  return {
    mode: GameMode.QUICKPLAY,
    teams: [
      { color: 'black', name: 'batman', players: [], points: 0 },
      { color: 'purple', name: 'joker', players: [], points: 0 },
    ],
  }
}

export const state = () => getInitialState()

export const getters = {
  teams: (state) => state.teams,
  score: (state) => (team) => state.teams.find((t) => t.name === team).points,
}

export const mutations = {
  setGameMode(state, mode) {
    state.mode = mode
  },
  setTeams(state, teams) {
    state.teams = teams
  },
  incrementTeamPoints(state, name) {
    const team = state.teams.find((t) => t.name === name)
    if (team) {
      team.points++
    }
  },
  decrementTeamPoints(state, name) {
    const team = state.teams.find((t) => t.name === name)
    if (team) {
      team.points -= 1
    }
  },
  endMatch(state) {
    state = { ...getInitialState() }
  },
}

export const actions = {
  async endMatch(store) {
    await matchService.create(store.state)
    store.commit('match/endMatch')
  },
}
