import type { Money } from '@monorepo/shared'

export interface Product {
  id: string
  name: string
  image: string
  weight: number
  description: string
  price: Money
  stock: number
}
