import io from 'socket.io-client'

export const Events = {
  MATCH_UPDATE: 'match:update',
}

export class MatchService {
  constructor() {
    this.socket = io('ws://localhost:4000')
    console.info(`Socket connected ${this.socket.id}`)
  }

  onMatchUpdate(callback) {
    this.socket.on(Events.MATCH_UPDATE, callback)
  }
}
