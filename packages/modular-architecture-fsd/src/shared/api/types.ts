import type { Money } from '@monorepo/shared'

export type Product = {
  id: string
  name: string
  image: string
  weight: number
  description: string
  price: Money
  stock: number
}
