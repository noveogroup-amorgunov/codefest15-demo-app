import type { Money } from '@monorepo/shared'

export interface Product {
  id: string
  image: string
  name: string
  weight: string
  description: string
  price: Money
  stock: number
}

export function isAvailable(product: Product): boolean {
  return product.stock > 0
}
