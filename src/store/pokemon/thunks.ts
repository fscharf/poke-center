import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import {
  Pokemon,
  PokemonResponseResult,
  RemotePokemonResponse
} from 'models/pokemon'
import { pokemonService } from 'services'
import { State } from './slice'

const handleResult = async (results: PokemonResponseResult[]) => {
  return await Promise.all(
    results.map(async result => {
      const response = await pokemonService.getDetails(result.url)
      return response.data
    })
  )
}

export const search = createAsyncThunk<Pokemon[] | undefined, string | void>(
  'pokemon/search',
  async (queryString, { dispatch }) => {
    if (!queryString) {
      dispatch(getPokemons())
      return
    }

    const response = await pokemonService.get('/pokemon', 1500)

    const filteredPokemons = response.data.results.filter(pokemon =>
      pokemon.name.startsWith(queryString.toLowerCase())
    )

    const pokemons = await handleResult(filteredPokemons)

    return new Promise((resolve, reject) => {
      if (pokemons.length) {
        resolve(pokemons)
      } else {
        reject()
      }
    })
  }
)

export const getCurrentPage = createAsyncThunk<
  number,
  { url: string; count: number }
>('pokemon/getCurrentPage', ({ url, count }) => {
  const { searchParams } = new URL(url)
  const offset = Number(searchParams.get('offset'))
  const limit = Number(searchParams.get('limit'))
  const currentPage = offset >= count ? -1 : offset / limit + 1
  return currentPage
})

export const getPokemons = createAsyncThunk<
  RemotePokemonResponse,
  { url?: string; limit?: number } | void
>('pokemon/getPokemons', async (params, { dispatch }) => {
  const response = await pokemonService.get(params?.url, params?.limit)
  const pokemons = await handleResult(response.data.results)

  dispatch(
    getCurrentPage({
      url: params?.url || 'url.com?offset=0&limit=16',
      count: response.data.count
    })
  )

  return {
    next: response.data.next || '',
    previous: response.data.previous || '',
    count: response.data.count,
    pokemons
  }
})

export const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(getPokemons.pending, state => {
    state.isLoading = true
  })
  builder.addCase(getPokemons.fulfilled, (state, action) => {
    state.isLoading = false
    state.next = action.payload.next
    state.previous = action.payload.previous
    state.pokemons = action.payload.pokemons
  })
  builder.addCase(getPokemons.rejected, state => {
    state.isLoading = false
  })
  builder.addCase(getCurrentPage.fulfilled, (state, action) => {
    state.currentPage = action.payload
  })
  builder.addCase(search.pending, state => {
    state.isLoading = true
    state.isNotFound = false
  })
  builder.addCase(search.fulfilled, (state, action) => {
    if (action.payload) state.pokemons = action.payload
    state.isLoading = false
    state.currentPage = 1
  })
  builder.addCase(search.rejected, state => {
    state.isNotFound = true
    state.isLoading = false
  })
}
