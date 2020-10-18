import { chunk } from 'lodash'

import { Status } from '@/core'
import { rankedGameService } from '@/services'

export function state() {
  return {
    playOpening: false,
    status: Status.FREE,
    gameMode: null,
  }
}

export const getters = {
  playOpening: (state) => state.playOpening,
  isFree: (state) => state.status === Status.FREE,
  isTeamingUp: (state) => state.status === Status.TEAMING_UP,
  isPlaying: (state) => state.status === Status.PLAYING,
}

export const mutations = {
  disableOpening(state) {
    state.playOpening = false
  },
  setStatus(state, status) {
    state.status = status
  },
}

export const actions = {
  async fetchAttraction(store) {
    const { players, status } = await rankedGameService.getAttraction()
    const teams = chunk(players, Math.ceil(players.length / 2)).map(
      (players, i) => {
        return {
          players,
          color: i === 0 ? 'black' : 'purple',
        }
      }
    )
    store.commit('app/setStatus', status, { root: true })
    store.commit('match/setTeams', teams, { root: true })
  },
}
