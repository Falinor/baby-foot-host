export function state() {
  return {
    playOpening: true,
  }
}

export const getters = {
  playOpening: (state) => state.playOpening,
}

export const mutations = {
  disableOpening(state) {
    state.playOpening = false
  },
}
