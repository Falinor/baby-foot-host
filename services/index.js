import { MatchService } from '@/services/match'
import { FakeRankedGameService } from '@/services/fake-ranked-game'
import { PlayerService } from '@/services/player'
import { TeamService } from '@/services/team'

export const playerService = new PlayerService()
export const teamService = new TeamService()
export const matchService = new MatchService()
export const rankedGameService = new FakeRankedGameService()
