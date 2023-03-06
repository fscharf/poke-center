import { Pokemon, PokemonResponse, RemotePokemonResponse } from 'models/pokemon'
import store, { thunks } from 'store'
import { mockAdapter } from '__mocks__/mock-adapter'

const mockNetworkResponse = () => {
  mockAdapter.onGet(`/pokemon`, { params: { limit: 16 } }).reply(200, {
    count: 1,
    next: 'null',
    previous: '',
    results: [
      {
        url: 'test.com',
        name: 'bulbasaur'
      }
    ]
  } as PokemonResponse)
  mockAdapter.onGet(`test.com`).reply(200, {
    base_experience: 100,
    id: 1,
    name: 'bulbasaur',
    sprites: {
      front_default: 'test.png'
    }
  } as Pokemon)
}

describe('Pokemon redux state tests', () => {
  it('should initialize with default values', () => {
    const state = store.getState().pokemon
    expect(state.currentPage).toEqual(1)
    expect(state.pickedPokemons).toEqual([])
    expect(state.pokemons).toEqual([])
  })

  describe('getPokemons thunk', () => {
    beforeEach(jest.clearAllMocks)

    it('fulfilled: should return all pokemons', async () => {
      mockNetworkResponse()
      const result = await store.dispatch(thunks.pokemon.getPokemons())
      const payload = result.payload as RemotePokemonResponse
      expect(result.type).toBe('pokemon/getPokemons/fulfilled')
      const state = store.getState().pokemon
      expect(state.pokemons).toEqual(payload.pokemons)
      expect(state.next).toEqual(payload.next)
      expect(state.previous).toEqual(payload.previous)
      expect(state.isLoading).toBeFalsy()
    })
    it('rejected: should return isLoading only', async () => {
      mockAdapter.onGet(`/pokemon`, { params: { limit: 16 } }).networkError()
      const result = await store.dispatch(thunks.pokemon.getPokemons())
      expect(result.type).toBe('pokemon/getPokemons/rejected')
      const state = store.getState().pokemon
      expect(state.isLoading).toBeFalsy()
    })
  })

  describe.skip('getCurrentPage thunk', () => {
    it('should return page correctly', async () => {
      jest.spyOn(URL.prototype as any, 'searchParams').mockReturnValue({
        get: () => '16'
      })

      const result = await store.dispatch(
        thunks.pokemon.getCurrentPage({
          count: 32,
          url: 'test.com?offset=16&limit=16'
        })
      )
      const payload = result.payload as number
      expect(result.type).toBe('pokemon/getCurrentPage/fulfilled')
      const state = store.getState().pokemon
      expect(state.currentPage).toEqual(payload)
    })
  })
})
