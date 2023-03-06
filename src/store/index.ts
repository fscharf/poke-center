import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as pokemonSlice from './pokemon'

const persistConfig = {
  key: 'pokemon',
  storage
}

const rootReducer = combineReducers({
  pokemon: pokemonSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)

export const actions = Object.freeze({
  pokemon: pokemonSlice.actions
})

export const selectors = Object.freeze({
  pokemon: pokemonSlice.selectors
})

export const thunks = Object.freeze({
  pokemon: pokemonSlice.thunks
})

export default store
