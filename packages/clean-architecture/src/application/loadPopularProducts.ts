import type { Product } from '../domain/product'
import type { ProductService, ProductStorageService } from './ports'

interface Props {
  productService: ProductService
  productStorageService: ProductStorageService
}

export function useLoadPopularProducts({ productService, productStorageService }: Props) {
  async function load(): Promise<Product[]> {
    productStorageService.setLoadingState(true)

    const products = await productService.loadPopularProducts()

    productStorageService.upsertProducts(products)
    productStorageService.setLoadingState(false)

    return products
  }

  return { load }
}
