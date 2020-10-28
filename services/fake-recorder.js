export class FakeRecorderService {
  connect() {
    console.log('Connected to the recorder service')
  }

  disconnect() {
    console.log('Disconnected from the recorder service')
  }

  startRecording() {
    console.log('Start recording')
  }

  stopRecording() {
    console.log('Stop recording')
  }

  listRecords() {}

  switchScene(name) {
    console.log('Switching scene to', name)
  }
}
