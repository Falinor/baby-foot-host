import axios from 'axios'

import { config } from '@/core'

export class TeamService {
  constructor() {
    this.http = axios.create({
      baseURL: config.babyfootAPI,
    })
  }

  async find(options = {}) {
    const { data: teams } = await this.http.get('/teams')
    return teams.map(fromAPI)
  }
}

const fromAPI = (team) => ({
  ...team,
  nickname: team.players.map((player) => player.nickname).join(' - '),
})
