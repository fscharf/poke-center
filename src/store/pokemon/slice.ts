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
    }
  },
  extraReducers
})

export const { actions, reducer } = slice
