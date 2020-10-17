export const config = {
  babyfootAPI: process.env.BABYFOOT_API ?? 'http://localhost:5000',
  battlemytheAPI:
    process.env.BATTLEMYTHE_API ?? 'https://dev.battlemythe.net/api/anniv/2020',
  websocketServer: process.env.WEBSOCKET_SERVER ?? 'ws://localhost:4000',
}
