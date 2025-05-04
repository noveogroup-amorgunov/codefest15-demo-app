import type { ProductService } from '~/application/ports'
import type { Product } from '~/domain/product'
import { productMocks } from '@monorepo/shared'
import { fakeApi } from './api'

export function productServiceAdapter(): ProductService {
  return {
    loadPopularProducts: () => {
      return fakeApi<Product[]>(productMocks as Product[])
    },
  }
}
