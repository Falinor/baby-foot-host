const isTrue = (envVar) => envVar === 'true'

export const config = {
  babyfootAPI: process.env.BABYFOOT_API ?? 'http://localhost:9000/v1',
  battlemythe: {
    api:
      process.env.BATTLEMYTHE_API ??
      'https://dev.battlemythe.net/api/anniv/2020',
    userId: process.env.BATTLEMYTHE_USERID,
    password: process.env.BATTLEMYTHE_PASSWORD,
  },
  env: process.env.NODE_ENV,
  features: {
    match: isTrue(process.env.FEATURES_MATCH),
    ranked: isTrue(process.env.FEATURES_RANKED),
    stream: isTrue(process.env.FEATURES_STREAM),
  },
  maxPoints: process.env.MAX_POINTS ?? 10,
  obs: process.env.OBS ?? 'localhost:4444',
  websocketServer: process.env.WEBSOCKET_SERVER ?? 'ws://localhost:4000',
}
