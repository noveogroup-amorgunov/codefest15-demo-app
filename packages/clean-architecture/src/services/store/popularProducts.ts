import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './reduxStore'
import type { Product } from '~/domain/product'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { useLoadPopularProducts } from '~/application/loadPopularProducts'
import { createAppAsyncThunk } from './createAppAsyncThunk'

interface PopularProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: PopularProductsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchPopularProducts = createAppAsyncThunk<void, void>(
  'fetchPopularProducts',
  async (_, { extra: diContainer }) => {
    const productService = diContainer.get('PRODUCT_SERVICE_TOKEN')
    const productStorageService = diContainer.get('PRODUCT_STORAGE_SERVICE_TOKEN')

    // FIXME: hooks should not be used in the store,
    // change API in application layer
    const { load } = useLoadPopularProducts({
      productService,
      productStorageService,
    })

    await load()
  },
)

export const popularProductsSlice = createSlice({
  name: 'popularProducts',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      action.payload.forEach((product) => {
        if (state.items.find(p => p.id === product.id)) {
          return
        }

        state.items.push(product)
      })
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

const selectPopularProductsState = (state: RootState) => state.popularProducts

export const selectPopularProducts = createSelector(
  [selectPopularProductsState],
  state => state.items,
)

export const selectPopularProductsLoading = createSelector(
  [selectPopularProductsState],
  state => state.loading,
)

export const selectPopularProductsError = createSelector(
  [selectPopularProductsState],
  state => state.error,
)

export const popularProductsReducer = popularProductsSlice.reducer
