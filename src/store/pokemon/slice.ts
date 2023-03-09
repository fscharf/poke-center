import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from 'models/pokemon'
import { extraReducers } from './thunks'

export type State = {
  pokemons: Pokemon[]
  isNotFound: boolean
  isLoading: boolean
  pickedPokemons: Pokemon[]
  next: string
  previous: string
  currentPage: number
}

const initialState: State = {
  pokemons: [],
  next: '',
  previous: '',
  isNotFound: false,
  isLoading: false,
  pickedPokemons: [],
  currentPage: 1
}

export const slice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPicked: (state, action: PayloadAction<Pokemon>) => {
      state.pickedPokemons.push(action.payload)
    },
    removePicked: (state, action: PayloadAction<number>) => {
      state.pickedPokemons = state.pickedPokemons.filter(
        pokemon => pokemon.id !== action.payload
      )
    },
    getCurrentPage: (
      state,
      action: PayloadAction<{ url: string; count: number }>
    ) => {
      const { count, url } = action.payload
      const { searchParams } = new URL(url)
      const offset = Number(searchParams.get('offset'))
      const limit = Number(searchParams.get('limit'))
      const currentPage = offset >= count ? -1 : offset / limit + 1
      state.currentPage = currentPage
    }
  },
  extraReducers
})

export const { actions, reducer } = slice
