import type { Product } from '~/types/product'
import { productMocks } from '@monorepo/shared'
import { fakeApi } from '~/core/services/api'

export async function getPopularProducts() {
  return fakeApi(productMocks as unknown as Product[])
}
