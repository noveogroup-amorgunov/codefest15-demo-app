import { productMocks } from '@monorepo/shared'
import type { Product } from '~/shared/api'
import { fakeApi } from '~/shared/api'

export async function getPopularProducts() {
  return fakeApi(productMocks as unknown as Product[])
}
