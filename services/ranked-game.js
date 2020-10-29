import axios from 'axios'

import { config } from '@/core'
import { playerService } from '@/services'

export class RankedGameService {
  constructor() {
    this.http = axios.create({
      baseURL: config.battlemythe.api,
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

  async startAttraction() {
    await this.http.post('/attractions/babyfoot/start', {
      userId: config.battlemythe.userId,
      password: config.battlemythe.password,
    })
  }

  async stopAttraction() {
    await this.http.post('/attractions/babyfoot/cancel', {
      userId: config.battlemythe.userId,
      password: config.battlemythe.password,
    })
  }
}
