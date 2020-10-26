export const config = {
  babyfootAPI: process.env.BABYFOOT_API ?? 'http://localhost:9000/v1',
  battlemythe: {
    api:
      process.env.BATTLEMYTHE_API ??
      'https://dev.battlemythe.net/api/anniv/2020',
    userId: process.env.BATTLEMYTHE_USERID,
    password: process.env.BATTLEMYTHE_PASSWORD,
  },
  maxPoints: 10,
  obs: process.env.OBS ?? 'localhost:4444',
  record: process.env.NODE_ENV === 'production',
  websocketServer: process.env.WEBSOCKET_SERVER ?? 'ws://localhost:4000',
}
