import { signal } from '@preact/signals'
import type { Product } from '~/shared/api'
import { container } from '~/shared/di'

type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
}

export const cartSignal = signal<CartState>({
  items: [],
})

export const cartStore = {
  addToCart: (product: Product, quantity: number = 1) => {
    const currentItems = [...cartSignal.value.items]
    const existingItemIndex = currentItems.findIndex(
      item => item.product.id === product.id,
    )

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += quantity
    }
    else {
      currentItems.push({ product, quantity: 1 })
    }

    cartSignal.value = { items: currentItems }
  },

  removeFromCart: (productId: string) => {
    cartSignal.value = {
      items: cartSignal.value.items.filter(
        item => item.product.id !== productId,
      ),
    }
  },

  updateQuantity: (productId: string, quantity: number) => {
    cartSignal.value = {
      items: cartSignal.value.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item,
      ),
    }
  },

  // Selectors
  getItems: () => cartSignal.value.items,

  getTotal: () => cartSignal.value.items.reduce(
    (total, item) => total + (item.product.price.amount * item.quantity),
    0,
  ),

  getItemsCount: () => cartSignal.value.items.reduce(
    (count, item) => count + item.quantity,
    0,
  ),

  getItemById: (productId: string) =>
    cartSignal.value.items.find(item => item.product.id === productId),
}

container.register('CART_STORE_TOKEN', cartStore)

declare module '~/shared/di/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface DIContainerService {
    CART_STORE_TOKEN: typeof cartStore
  }
}
