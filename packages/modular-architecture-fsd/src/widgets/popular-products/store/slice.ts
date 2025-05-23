import type { WithSlice } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '~/shared/api'
import { rootReducer } from '~/shared/redux'
import { getPopularProducts } from '../api/getPopularProducts'

type PopularProductsState = {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: PopularProductsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchPopularProducts = createAsyncThunk(
  'popularProducts/fetch',
  async () => {
    return await getPopularProducts()
  },
)

const slice = createSlice({
  name: 'popularProducts',
  initialState,
  reducers: {},
  selectors: {
    popularProducts: state => state.items,
    popularProductsLoading: state => state.loading,
    popularProductsError: state => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchPopularProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products'
        state.loading = false
      })
  },
})

declare module '~/shared/redux/model/store' {
  export type LazyLoadedSlices = {} & WithSlice<typeof popularProductsSlice>
}

export const popularProductsSlice = slice.injectInto(rootReducer)

export const {
  popularProducts: selectPopularProducts,
  popularProductsLoading: selectPopularProductsLoading,
  popularProductsError: selectPopularProductsError,
} = popularProductsSlice.selectors
