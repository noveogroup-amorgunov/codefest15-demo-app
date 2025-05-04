import { configureStore } from '@reduxjs/toolkit'
import { popularProductsReducer } from '~/widgets/popular-products'

export const store = configureStore({
  reducer: {
    popularProducts: popularProductsReducer,
  },
})

declare global {
  type AppState = ReturnType<typeof store.getState>
  type AppDispatch = typeof store.dispatch
}
