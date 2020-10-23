import io from 'socket.io-client'

import { config } from '@/core'

export const Events = {
  MATCH_UPDATE: 'match:update',
}

export class MatchService {
  constructor() {
    this.socket = io(config.websocketServer, {
      // TODO: find how to time out
      reconnectionAttempts: 3,
    })
    console.info(`Socket connected ${this.socket.id}`)
  }

  onMatchUpdate(callback) {
    this.socket.on(Events.MATCH_UPDATE, callback)
  }
}
