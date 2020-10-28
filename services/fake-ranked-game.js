export class FakeRankedGameService {
  getAttraction() {
    return {
      APIType: 'X_JOUEURS_AUTONOME',
      attractionId: 'babyfoot',
      creators: ['5ce73a6aa8c99f55d9f2a29c', '5cfd1811a8c99f55d9f2a2c0'],
      name: 'Baby Connecté',
      nbMaxPlayer: 4,
      nbMinPlayer: 4,
      players: [
        { nickname: 'P1' },
        { nickname: 'P2' },
        { nickname: 'P3' },
        { nickname: 'P4' },
      ],
      scoreType: 'ELO',
      status: 'FREE',
      _id: '5f7af388b3c2e8fffeb1b510',
    }
  }

  startAttraction() {
    console.log('Attraction started')
  }

  stopAttraction() {
    console.log('Attraction stopped')
  }
}
