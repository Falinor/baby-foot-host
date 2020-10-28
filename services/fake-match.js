export class FakeMatchService {
  create(match) {
    console.log('Creating match', match)
  }

  find() {
    console.log('Finding matches')
  }

  onMatchUpdate() {
    console.log('onMatchUpdate registered')
  }
}
