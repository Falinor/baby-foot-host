import { Status } from '@/core'

export function state() {
  return {
    playOpening: false,
    status: Status.FREE,
  }
}

export const getters = {
  playOpening: (state) => state.playOpening,
}

export const mutations = {
  disableOpening(state) {
    state.playOpening = false
  },
  setStatus(state, status) {
    state.status = status
  },
}
