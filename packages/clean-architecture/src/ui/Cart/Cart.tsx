import { useAddToCart } from '~/application/addToCart'
import { useDi } from '~/services/di/useDi'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { Price } from '../Price/Price'
import styles from './Cart.module.css'

export function Cart() {
  const cartStorageService = useDi('CART_STORAGE_SERVICE_TOKEN')
  const notificationService = useDi('NOTIFICATION_SERVICE_TOKEN')

  const { addToCart } = useAddToCart({
    cartStorageService,
    notificationService,
  })

  const items = cartStorageService.getItems()
  const total = cartStorageService.getTotal()

  return (
    <div className={styles.cart}>
      <h2>
        Shopping Cart
        {items.length > 0 && (
          <span className={styles.cartCount}>
            {' '}
            (total:
            &nbsp;
            <Price amount={total} currency={items.length > 0 ? items[0].product.price.currency : 'USD'} />
            )
          </span>
        )}
      </h2>
      {items.length === 0
        ? (
            <p>Your cart is empty</p>
          )
        : (
            <>
              <div className={styles.cartItems}>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className={styles.cartItem}>
                    <div className={styles.image}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={styles.itemActions}>
                      <AddToCartButton
                        showQuantity
                        price={product.price}
                        outOfStock={product.stock === 0}
                        canAddToCart={quantity < product.stock}
                        quantity={quantity}
                        increaseQuantity={() => addToCart(product, quantity + 1)}
                        decreaseQuantity={() => addToCart(product, quantity - 1)}
                      />

                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
    </div>
  )
}
