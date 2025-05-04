import type { Product } from '~/domain/product'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import styles from './ProductListCard.module.css'

interface Props {
  product: Product
  outOfStock: boolean
  canAddToCart: boolean
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
}

export function ProductListCard(props: Props) {
  return (
    <div className={`${styles.root} ${props.outOfStock ? styles.root_outOfStock : ''}`}>
      <div className={styles.image}>
        {props.quantity > 0 && (
          <div className={styles.imageOverlay}>
            <div>{props.quantity}</div>
            {props.quantity > 0 && !props.canAddToCart && <div>Not more</div>}
          </div>
        )}
        <img src={props.product.image} alt={props.product.name} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{props.product.name}</h3>
        <p className={styles.weight}>{props.product.weight}</p>
      </div>
      <div className={styles.price}>
        <AddToCartButton
          price={props.product.price}
          outOfStock={props.outOfStock}
          canAddToCart={props.canAddToCart}
          quantity={props.quantity}
          increaseQuantity={props.increaseQuantity}
          decreaseQuantity={props.decreaseQuantity}
        />
      </div>
    </div>
  )
}
