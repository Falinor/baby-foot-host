import { Status } from '@/core'

export class FakeRankedGameService {
  getAttraction() {
    return {
      players: [
        'Jean-Renaud de la Fougère',
        'Melville de la Villardière',
        'Maicépapossible',
        'Inprénomossilon',
      ],
      status: Status.FREE,
    }
  }
}
