import { Status } from '../../core'
import fetchMatch from '../fetch-match'

describe('Unit | Middleware | FetchMatch', () => {
  let store
  let route
  let redirect

  beforeEach(() => {
    store = { dispatch: jest.fn() }
    route = {}
    redirect = jest.fn()
  })

  it('should call dispatch', async () => {
    await fetchMatch({ store, route, redirect })
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('should redirect to /match if there is a match in progress and the URL is not /match', async () => {
    const match = { status: Status.PLAYING }
    route.path = '/'
    store.dispatch.mockResolvedValue(match)
    await fetchMatch({ store, route, redirect })
    expect(redirect).toHaveBeenCalledWith('/match')
  })

  it('should redirect to / if there is no match in progress and the URL is /match', async () => {
    const match = { status: Status.FREE }
    route.path = '/match'
    store.dispatch.mockResolvedValue(match)
    await fetchMatch({ store, route, redirect })
    expect(redirect).toHaveBeenCalledWith('/')
  })
})
