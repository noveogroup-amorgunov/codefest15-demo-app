import type { Money } from '@monorepo/shared'
import { featureFlagService } from '~/services/featureFlagService'
import { Price } from '../Price/Price'
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

export function AddToCartButton(props: Props) {
  const audioEffects = featureFlagService.get('audioEffects')

  const handleIncreaseQuantity = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation()
    props.increaseQuantity()

    if (audioEffects) {
      playAudio()
    }
  }

  const handleDecreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    props.decreaseQuantity()

    if (audioEffects) {
      playAudio()
    }
  }

  if (props.outOfStock) {
    return <div className={styles.root_outOfStock}>Out of stock</div>
  }

  return (
    <div onClick={props.canAddToCart ? handleIncreaseQuantity : undefined} className={`${styles.root} ${props.quantity === 0 ? styles.root_notInCart : ''}`}>
      <button disabled={props.quantity === 0} className={styles.button} type="button" onClick={handleDecreaseQuantity}>-</button>
      <span className={styles.amount}>{props.quantity > 0 && props.showQuantity ? props.quantity : <Price {...props.price} />}</span>
      <button disabled={!props.canAddToCart} className={styles.button} type="button" onClick={handleIncreaseQuantity}>+</button>
    </div>
  )
}
