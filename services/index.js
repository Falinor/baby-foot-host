import { config } from '@/core'
import { FakeRankedGameService } from '@/services/fake-ranked-game'
import { FakeStreamService } from '@/services/fake-stream'
import { MatchService } from '@/services/match'
import { PlayerService } from '@/services/player'
import { RankedGameService } from '@/services/ranked-game'
import { StreamService } from '@/services/stream'
import { TeamService } from '@/services/team'

export const playerService = new PlayerService()
export const teamService = new TeamService()
export const matchService = new MatchService()
export const rankedGameService = config.features.ranked
  ? new RankedGameService()
  : new FakeRankedGameService()
export const streamService = config.features.stream
  ? new StreamService()
  : new FakeStreamService()
