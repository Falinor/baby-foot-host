import axios from 'axios'

import { config } from '@/core'

export class PlayerService {
  constructor() {
    this.http = axios.create({
      baseURL: config.babyfootAPI,
    })
  }

  async find(options = {}) {
    const { data: players } = await this.http.get('/players')
    return players
  }

  async get(id) {
    const { data: player } = await this.http.get(`/players/${id}`)
    return player
  }
}
