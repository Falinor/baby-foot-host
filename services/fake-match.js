export class FakeMatchService {
  create(match) {
    console.log('Creating match', match)
  }

  onMatchUpdate() {
    console.log('onMatchUpdate registered')
  }
}
