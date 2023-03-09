import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'

const rootSelect = (state: RootState) => state.pokemon

export const isPickedFull = createSelector(
  rootSelect,
  state => state.pickedPokemons.length === 6
)

export const getState = createSelector(rootSelect, state => state)
