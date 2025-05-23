import { combineSlices, configureStore } from '@reduxjs/toolkit'

// eslint-disable-next-line ts/consistent-type-definitions
export interface LazyLoadedReduxSlices {}

export const rootReducer
  = combineSlices().withLazyLoadedSlices<LazyLoadedReduxSlices>()

export const store = configureStore({
  reducer: rootReducer,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
