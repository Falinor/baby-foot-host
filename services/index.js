import { config } from '@/core'
import { FakeRankedGameService } from '@/services/fake-ranked-game'
import { FakeRecorderService } from '@/services/fake-recorder'
import { MatchService } from '@/services/match'
import { PlayerService } from '@/services/player'
import { RankedGameService } from '@/services/ranked-game'
import { RecorderService } from '@/services/recorder'
import { TeamService } from '@/services/team'

export const playerService = new PlayerService()
export const teamService = new TeamService()
export const matchService =
  config.env === 'production' ? new MatchService() : new MatchService()
export const rankedGameService =
  config.env === 'production'
    ? new RankedGameService()
    : new FakeRankedGameService()
export const recorderService = !config.record
  ? new RecorderService()
  : new FakeRecorderService()
