import { MatchService } from '@/services/match'
import { FakeRankedGameService } from '@/services/fake-ranked-game'

export const matchService = new MatchService()
export const rankedGameService = new FakeRankedGameService()
