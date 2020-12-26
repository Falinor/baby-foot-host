import axios from 'axios'
import promisify from 'micro-promisify'
import { io } from 'socket.io-client'

import { config } from '@/core'

export const Events = {
  TEAMS_UPDATE: 'teams:update',
  GOAL_SCORED: 'goal:scored',
}

export const Commands = {
  MATCH_CANCEL: 'match:cancel',
  MATCH_GET: 'match:get',
  MATCH_START: 'match:start',
  MATCH_END: 'match:end',
  GOAL_SCORED: Events.GOAL_SCORED,
  GOAL_REMOVED: 'goal:removed',
}

export class MatchService {
  constructor() {
    this.socket = io(config.websocketServer, {
      reconnectionAttempts: 3,
    })
    this.http = axios.create({ baseURL: config.babyfootAPI })
    this.emit = promisify((...args) => this.socket.emit(...args))
    console.info('Socket connected')
  }

  async find() {
    const { data: matches } = await this.http.get('/matches')
    return matches
  }

  current() {
    return this.emit(Commands.MATCH_GET)
  }

  start(mode) {
    return this.emit(Commands.MATCH_START, mode)
  }

  end() {
    return this.emit(Commands.MATCH_END)
  }

  cancel() {
    return this.emit(Commands.MATCH_CANCEL)
  }

  onTeamsUpdate(callback) {
    console.log('onTeamsUpdate registered')
    this.socket.on(Events.TEAMS_UPDATE, callback)
  }

  onGoalScored(callback) {
    console.log('onGoalScored registered')
    this.socket.on(Events.GOAL_SCORED, callback)
  }

  removeListeners() {
    this.socket.off(Events.GOAL_SCORED)
    this.socket.off(Events.TEAMS_UPDATE)
    console.log('Cleared all listeners')
  }

  increment(teamName) {
    return this.emit(
      Commands.GOAL_SCORED,
      // Invert team name to comply with the GOAL_SCORED event.
      // This event takes the team that took a goal, not the one who scored it!
      teamName === 'Batman' ? 'Joker' : 'Batman'
    )
  }

  decrement(teamName) {
    return this.emit(Commands.GOAL_REMOVED, teamName)
  }
}
