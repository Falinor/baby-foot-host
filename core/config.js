export const config = {
  babyfootAPI: process.env.BABYFOOT_API ?? 'http://localhost:9000/v1',
  battlemytheAPI:
    process.env.BATTLEMYTHE_API ?? 'https://dev.battlemythe.net/api/anniv/2020',
  maxPoints: 10,
  websocketServer: process.env.WEBSOCKET_SERVER ?? 'ws://localhost:4000',
}
