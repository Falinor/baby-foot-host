import { Status } from '../core'

export default async function fetchMatch({ store, route, redirect }) {
  const match = await store.dispatch('match/fetch')
  console.log(match)
  if (route.path === '/match') {
    if (!match || (match && match.status !== Status.PLAYING)) {
      return redirect('/')
    }
  }

  if (route.path !== '/match' && match) {
    if (match.status === Status.PLAYING) {
      return redirect('/match')
    }
  }
}
