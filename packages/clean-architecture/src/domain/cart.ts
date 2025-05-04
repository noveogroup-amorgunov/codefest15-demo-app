import type { Product } from './product'

export interface Cart {
  items: CartItem[]
}

interface CartItem {
  product: Product
  quantity: number
}

export function addProduct(cart: Cart, product: Product, quantity: number = 1): Cart {
  const item = cart.items.find(item => item.product.id === product.id)

  if (item) {
    return { ...cart, items: cart.items.map(item => item.product.id === product.id ? { ...item, quantity } : item) }
  }

  return { ...cart, items: [...cart.items, { product, quantity }] }
}

export function contains(cart: Cart, product: Product): boolean {
  return cart.items.some(({ product: { id } }) => id === product.id)
}

export function removeProduct(cart: Cart, product: Product): Cart {
  return { ...cart, items: cart.items.filter(({ product: { id } }) => id !== product.id) }
}
