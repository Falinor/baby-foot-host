import axios from 'axios'

import { config } from '@/core'

export class RankedGameService {
  constructor() {
    this.http = axios.create({
      baseURL: config.battlemytheAPI,
    })
  }

  async getAttraction() {
    const { data } = await this.http.get('/attractions/babyfoot')
    return data.attraction
  }
}
