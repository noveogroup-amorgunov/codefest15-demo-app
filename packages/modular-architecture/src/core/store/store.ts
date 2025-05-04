import { configureStore } from '@reduxjs/toolkit'
import { popularProductsReducer } from '../../modules/popular-products/store/popular-products.slice'

export const store = configureStore({
  reducer: {
    popularProducts: popularProductsReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
