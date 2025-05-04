import type { ProductStorageService as ProductStorageServicePort } from '~/application/ports'
import type { Product } from '~/domain/product'
import { popularProductsSlice } from './store/popularProducts'
import { store } from './store/reduxStore'

interface ProductStorageService extends ProductStorageServicePort {
  setLoadingState: (loading: boolean) => void
}

export function productStorageServiceAdapter(): ProductStorageService {
  const getDispatch = () => store.dispatch

  return {
    setLoadingState: (loading: boolean) => {
      getDispatch()(popularProductsSlice.actions.setLoadingState(loading))
    },

    upsertProducts: async (products: Product[]) => {
      getDispatch()(popularProductsSlice.actions.setProducts(products))
    },
  }
}
