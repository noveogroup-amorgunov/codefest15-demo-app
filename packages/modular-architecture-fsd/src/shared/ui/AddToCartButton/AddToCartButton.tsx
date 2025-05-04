import type { Money } from '@monorepo/shared'
import { Price } from '../Price/Price'
import audioUrl from './mixkit-on-or-off-light-switch-tap-2585.wav?url'
import styles from './AddToCartButton.module.css'

// FIXME: change props naming
type Props = {
  price: Money
  outOfStock: boolean
  canAddToCart: boolean
  showQuantity?: boolean
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
  withAudioEffects?: boolean
}

let audioCached: ArrayBuffer | null = null

async function playAudio() {
  if (!audioCached) {
    const response = await fetch(audioUrl)
    audioCached = await response.arrayBuffer()
  }

  const blob = new Blob([audioCached], { type: 'audio/wav' })
  const blobUrl = URL.createObjectURL(blob)

  new Audio(blobUrl).play()
}

export function AddToCartButton({ withAudioEffects, price, outOfStock, canAddToCart, showQuantity, quantity, increaseQuantity, decreaseQuantity }: Props) {
  const handleIncreaseQuantity = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation()
    increaseQuantity()

    if (withAudioEffects) {
      playAudio()
    }
  }

  const handleDecreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    decreaseQuantity()

    if (withAudioEffects) {
      playAudio()
    }
  }

  if (outOfStock) {
    return <div className={styles.root_outOfStock}>Out of stock</div>
  }

  return (
    <div onClick={canAddToCart ? handleIncreaseQuantity : undefined} className={`${styles.root} ${quantity === 0 ? styles.root_notInCart : ''}`}>
      <button disabled={quantity === 0} className={styles.button} type="button" onClick={handleDecreaseQuantity}>-</button>
      <span className={styles.amount}>{quantity > 0 && showQuantity ? quantity : <Price {...price} />}</span>
      <button disabled={!canAddToCart} className={styles.button} type="button" onClick={handleIncreaseQuantity}>+</button>
    </div>
  )
}
