import { Pokemon, PokemonResponse, RemotePokemonResponse } from 'models/pokemon'
import store, { actions, selectors, thunks } from 'store'
import { mockAdapter } from '__mocks__/mock-adapter'

const pokemonResponseMock: PokemonResponse = {
  count: 1,
  next: 'null',
  previous: '',
  results: [
    {
      url: 'test.com',
      name: 'bulbasaur'
    }
  ]
}

const pokemonMock: Pokemon = {
  base_experience: 100,
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'test.png'
  }
}

const mockNetworkResponse = (limit = 16) => {
  mockAdapter
    .onGet(`/pokemon`, { params: { limit } })
    .reply(200, pokemonResponseMock)
  mockAdapter.onGet(`test.com`).reply(200, pokemonMock)
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
    it('fulfilled: should return all pokemons and currentPage if url is provided', async () => {
      mockNetworkResponse()
      const getCurrentPageSpy = jest.spyOn(actions.pokemon, 'getCurrentPage')
      const result = await store.dispatch(
        thunks.pokemon.getPokemons({ url: 'https://pokeapi.co/api/v2/pokemon' })
      )
      const payload = result.payload as RemotePokemonResponse
      expect(result.type).toBe('pokemon/getPokemons/fulfilled')
      const state = store.getState().pokemon
      expect(state.pokemons).toEqual(payload.pokemons)
      expect(getCurrentPageSpy).toBeCalledTimes(1)
    })
    it('rejected: should return isLoading only', async () => {
      mockAdapter.onGet(`/pokemon`, { params: { limit: 16 } }).networkError()
      const result = await store.dispatch(thunks.pokemon.getPokemons())
      expect(result.type).toBe('pokemon/getPokemons/rejected')
      const state = store.getState().pokemon
      expect(state.isLoading).toBeFalsy()
    })
  })

  describe('search thunk', () => {
    beforeEach(jest.clearAllMocks)

    it('fulfilled: should return undefined if no query string', async () => {
      mockNetworkResponse()
      const result = await store.dispatch(thunks.pokemon.search(''))
      expect(result.type).toBe('pokemon/search/fulfilled')
      expect(result.payload).toBeUndefined()
    })
    it('fulfilled: should return filtered pokemons', async () => {
      mockNetworkResponse(1500)
      const result = await store.dispatch(thunks.pokemon.search('bulbasaur'))
      expect(result.type).toBe('pokemon/search/fulfilled')
      const state = store.getState().pokemon
      expect(result.payload).toEqual(state.pokemons)
    })
    it('fulfilled: should return not found if query string match no pokemons', async () => {
      mockNetworkResponse(1500)
      const result = await store.dispatch(thunks.pokemon.search('notfound'))
      expect(result.type).toBe('pokemon/search/rejected')
      const state = store.getState().pokemon
      expect(state.isNotFound).toBeTruthy()
      expect(state.isLoading).toBeFalsy()
    })
  })

  describe('addPicked action', () => {
    beforeEach(jest.clearAllMocks)

    it('should add pokemons to array', () => {
      store.dispatch(actions.pokemon.addPicked(pokemonMock))
      const state = store.getState().pokemon
      expect(state.pickedPokemons).toEqual([pokemonMock])
    })
  })

  describe('removePicked action', () => {
    beforeEach(jest.clearAllMocks)

    it('should add pokemons to array', () => {
      store.dispatch(actions.pokemon.addPicked(pokemonMock))
      store.dispatch(actions.pokemon.removePicked(pokemonMock.id))
      const state = store.getState().pokemon
      expect(state.pickedPokemons).toEqual([])
    })
  })

  describe('getCurrentPage action', () => {
    beforeEach(jest.clearAllMocks)

    it('should set current page as 1 correctly', () => {
      store.dispatch(
        actions.pokemon.getCurrentPage({
          url: 'https://test.com?offset=0&limit=16',
          count: 32
        })
      )
      const state = store.getState().pokemon
      expect(state.currentPage).toEqual(1)
    })
    it('should set current page as 2 correctly', () => {
      store.dispatch(
        actions.pokemon.getCurrentPage({
          url: 'https://test.com?offset=16&limit=16',
          count: 32
        })
      )
      const state = store.getState().pokemon
      expect(state.currentPage).toEqual(2)
    })
    it('should set current page correctly', () => {
      store.dispatch(
        actions.pokemon.getCurrentPage({
          url: 'https://test.com?offset=32&limit=16',
          count: 32
        })
      )
      const state = store.getState().pokemon
      expect(state.currentPage).toEqual(-1)
    })
  })

  describe('isPickedFull selector', () => {
    beforeEach(jest.clearAllMocks)

    it('should return true if pickedPokemos length is equal to 6', () => {
      const state = store.getState()
      const result = selectors.pokemon.isPickedFull({
        ...state,
        pokemon: {
          ...state.pokemon,
          pickedPokemons: Array.from({ length: 6 }).map(() => pokemonMock)
        }
      })
      expect(result).toBeTruthy()
    })
    it('should return false if pickedPokemos length is below 6', () => {
      const state = store.getState()
      const result = selectors.pokemon.isPickedFull({
        ...state,
        pokemon: {
          ...state.pokemon,
          pickedPokemons: [pokemonMock]
        }
      })
      expect(result).toBeFalsy()
    })
  })

  describe('getState selector', () => {
    beforeEach(jest.clearAllMocks)

    it('should return all default from root state', () => {
      const state = store.getState()
      const result = selectors.pokemon.getState(state)
      expect(result).toEqual(state.pokemon)
    })
  })
})
