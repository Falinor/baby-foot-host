import axios from 'axios'

import { config } from '@/core'
import { playerService } from '@/services/index'

export class RankedGameService {
  constructor() {
    this.http = axios.create({
      baseURL: config.battlemytheAPI,
    })
  }

  async getAttraction() {
    const { data } = await this.http.get('/attractions/babyfoot')
    const { attraction } = data
    const players = await Promise.all(
      attraction.players.map((playerId) => playerService.get(playerId))
    )
    return { ...attraction, players }
  }
}
