import type { Money } from '@monorepo/shared'
import { useDi } from '~/core/di/useDi'
import { Price } from '~/core/ui/Price/Price'
import styles from './AddToCartButton.module.css'
import audioUrl from './mixkit-on-or-off-light-switch-tap-2585.wav?url'

interface Props {
  price: Money
  outOfStock: boolean
  canAddToCart: boolean
  showQuantity?: boolean
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
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

export function AddToCartButton({ price, outOfStock, canAddToCart, showQuantity, quantity, increaseQuantity, decreaseQuantity }: Props) {
  const audioEffects = useDi('FEATURE_FLAGS_SERVICE_TOKEN').get('audioEffects')

  const handleIncreaseQuantity = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation()
    increaseQuantity()

    if (audioEffects) {
      playAudio()
    }
  }

  const handleDecreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    decreaseQuantity()

    if (audioEffects) {
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
