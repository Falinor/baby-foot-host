import { GameMode } from '@/core'
import { matchService } from '@/services'
import { Status } from '../core'

export const getInitialState = () => {
  return {
    mode: GameMode.QUICKPLAY,
    teams: [],
    createdAt: new Date().toJSON(),
  }
}

export const state = () => getInitialState()

export const getters = {
  mode: (state) => state.mode,
  team: (state) => (team) => state.teams.find((t) => t.name === team),
  teams: (state) => state.teams,
  startedAt: (state) => state.createdAt,
  score: (state) => (team) => state.teams.find((t) => t.name === team).points,
}

export const mutations = {
  setMode(state, mode) {
    state.mode = mode
  },
  setTeams(state, teams) {
    state.teams = teams
  },
  setStartDate(state, createdAt) {
    state.createdAt = createdAt
  },
  increment(state, teamName) {
    const team = state.teams.find((team) => team.name === teamName)
    if (team) {
      team.points++
    }
  },
  decrement(state, teamName) {
    const team = state.teams.find((team) => team.name === teamName)
    if (team) {
      team.points--
    }
  },
}

export const actions = {
  async start(store, gameMode) {
    const match = await matchService.start(gameMode)
    store.commit('setMode', gameMode)
    store.commit('setTeams', match.teams)
    store.commit('app/setStatus', Status.PLAYING, { root: true })
    console.log('Match started')
  },
  async fetch(store) {
    const match = await matchService.current()
    if (match) {
      store.commit('setTeams', match.teams)
      store.commit('setMode', match.mode)
      store.commit('setStartDate', match.createdAt)
      console.log('Match fetched')
    }
    return match
  },
  async increment(store, teamName) {
    const team = await matchService.increment(teamName)
    store.commit('increment', team)
    console.log(`Incremented ${team}'s points`)
  },
  async decrement(store, teamName) {
    const team = await matchService.decrement(teamName)
    store.commit('decrement', team)
    console.log(`Decremented ${team}'s points`)
  },
  async cancel(store) {
    const match = await matchService.cancel()
    store.commit('setTeams', match.teams)
    store.commit('app/setStatus', match.status, { root: true })
    store.commit('setMode', match.mode)
    console.log('Match cancelled')
  },
  async end(store) {
    await matchService.end()
  },
}
