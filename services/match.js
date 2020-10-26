import axios from 'axios'
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
    this.http = axios.create({ baseURL: config.babyfootAPI })
    console.info(`Socket connected ${this.socket.id}`)
  }

  create(match) {
    return this.http.post('/matches', toAPI(match))
  }

  onMatchUpdate(callback) {
    this.socket.on(Events.MATCH_UPDATE, callback)
  }
}

const toAPI = (match) => ({
  teams: match.teams.map((team) => ({
    points: team.points,
    color: team.color,
    name: team.name,
    players: team.players.map((player) => player.id),
  })),
})
