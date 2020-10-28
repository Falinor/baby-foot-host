import { config } from '@/core'
import { FakeMatchService } from '@/services/fake-match'
import { FakeRankedGameService } from '@/services/fake-ranked-game'
import { MatchService } from '@/services/match'
import { RankedGameService } from '@/services/ranked-game'
import { PlayerService } from '@/services/player'
import { FakeRecorderService } from '@/services/fake-recorder'
import { RecorderService } from '@/services/recorder'
import { TeamService } from '@/services/team'

export const playerService = new PlayerService()
export const teamService = new TeamService()
export const matchService =
  config.env === 'production' ? new MatchService() : new FakeMatchService()
export const rankedGameService =
  config.env === 'production'
    ? new RankedGameService()
    : new FakeRankedGameService()
export const recorderService = config.record
  ? new RecorderService()
  : new FakeRecorderService()
