const isTrue = (envVar) => envVar === 'true'

export const config = {
  babyfootAPI: process.env.NUXT_ENV_BABYFOOT_API ?? 'http://localhost:9000/v1',
  battlemythe: {
    api:
      process.env.NUXT_ENV_BATTLEMYTHE_API ??
      'https://dev.battlemythe.net/api/anniv/2020',
    userId: process.env.NUXT_ENV_BATTLEMYTHE_USERID,
    password: process.env.NUXT_ENV_BATTLEMYTHE_PASSWORD,
  },
  env: process.env.NODE_ENV,
  features: {
    match: isTrue(process.env.NUXT_ENV_FEATURES_MATCH),
    ranked: isTrue(process.env.NUXT_ENV_FEATURES_RANKED),
    stream: isTrue(process.env.NUXT_ENV_FEATURES_STREAM),
  },
  maxPoints: process.env.NUXT_ENV_MAX_POINTS ?? 10,
  obs: process.env.NUXT_ENV_OBS ?? 'localhost:4444',
  websocketServer:
    process.env.NUXT_ENV_WEBSOCKET_SERVER ?? 'ws://localhost:4000',
}
