import { Price } from '~/core/ui/Price/Price'
import { cartStore } from '../../store/cart.store'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import styles from './Cart.module.css'

export function Cart() {
  const items = cartStore.getItems()
  const total = cartStore.getTotal()

  const handleQuantityChange = (productId: string, delta: number, currentQuantity: number, maxStock: number) => {
    const newQuantity = currentQuantity + delta
    if (newQuantity > 0 && newQuantity <= maxStock) {
      cartStore.updateQuantity(productId, newQuantity)
    }

    if (newQuantity === 0) {
      cartStore.removeFromCart(productId)
    }
  }

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
                    <div>
                      <div className={styles.image}>
                        <img width={100} height={100} src={product.image} alt={product.name} />
                      </div>
                      <div className={styles.itemActions}>
                        <AddToCartButton
                          showQuantity
                          price={product.price}
                          outOfStock={product.stock === 0}
                          canAddToCart={quantity < product.stock}
                          quantity={quantity}
                          increaseQuantity={() => handleQuantityChange(product.id, 1, quantity, product.stock)}
                          decreaseQuantity={() => handleQuantityChange(product.id, -1, quantity, product.stock)}
                        />
                      </div>
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemName}>
                        {product.name}
                        ,
                        {' '}
                        {product.weight}
                      </div>
                      <div className={styles.itemPrice}>
                        <Price amount={product.price.amount} currency={product.price.currency} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
    </div>
  )
}
