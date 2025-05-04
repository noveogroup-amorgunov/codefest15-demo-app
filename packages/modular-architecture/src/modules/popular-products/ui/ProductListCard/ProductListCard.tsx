import type { Product } from '~/types/product'
import { AddToCartButton } from '~/modules/cart/ui/AddToCartButton/AddToCartButton'
import styles from './ProductListCard.module.css'

interface Props {
  product: Product
  outOfStock: boolean
  canAddToCart: boolean
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
}

export function ProductListCard({ outOfStock, canAddToCart, quantity, increaseQuantity, decreaseQuantity, product }: Props) {
  return (
    <div className={`${styles.root} ${outOfStock ? styles.root_outOfStock : ''}`}>
      <div className={styles.image}>
        {quantity > 0 && (
          <div className={styles.imageOverlay}>
            <div>{quantity}</div>
            {quantity > 0 && !canAddToCart && <div>Not more</div>}
          </div>
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.weight}>{product.weight}</p>
      </div>
      <div className={styles.price}>
        <AddToCartButton
          price={product.price}
          outOfStock={outOfStock}
          canAddToCart={canAddToCart}
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
    </div>
  )
}
