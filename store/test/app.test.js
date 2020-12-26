import { splitPlayers } from '../app'

describe('App store', () => {
  describe('#splitPlayers', () => {
    test.each`
      players                     | expected
      ${[]}                       | ${[]}
      ${[1000]}                   | ${[[1000], []]}
      ${[1000, 1200]}             | ${[[1000], [1200]]}
      ${[1200, 800, 1000]}        | ${[[1200], [1000, 800]]}
      ${[1000, 1200, 800, 700]}   | ${[[1200, 700], [1000, 800]]}
      ${[1000, 1200, 1200, 1000]} | ${[[1200, 1000], [1200, 1000]]}
      ${[1000, 1100, 1200, 1000]} | ${[[1200, 1100], [1200, 1000]]}
    `(
      'returns $expected.0 and $expected.1 when players is $players',
      ({ players, expected }) => {
        const actual = splitPlayers(players)
        expect(actual).toStrictEqual(expected)
      }
    )
  })
})
