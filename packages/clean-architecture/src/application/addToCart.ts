import type { Product } from '../domain/product'
import type { CartStorageService, NotificationService } from './ports'
import { addProduct, removeProduct } from '../domain/cart'

interface Props {
  cartStorageService: CartStorageService
  notificationService: NotificationService
}

export function useAddToCart({ cartStorageService, notificationService }: Props) {
  function addToCart(product: Product, quantity?: number): void {
    notificationService.notify(`Add ${product.name} to cart`)

    // TODO: Add stocks check
    const cart = cartStorageService.getCart()

    if (quantity === 0) {
      const updated = removeProduct(cart, product)
      cartStorageService.updateCart(updated)
      return
    }

    const updated = addProduct(cart, product, quantity)
    cartStorageService.updateCart(updated)
  }

  return { addToCart }
}
