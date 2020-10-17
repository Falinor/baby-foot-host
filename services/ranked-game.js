import axios from 'axios'

import { config } from '@/core'

export class RankedGameService {
  constructor() {
    this.http = axios.create({
      baseURL: config.battlemytheAPI,
    })
  }

  getAttraction() {
    return this.http
      .get('/attractions/babyfoot')
      .then((res) => res.data.attraction)
  }
}
