import type { Money } from '@monorepo/shared'

type Props = Money

const moneyCurrencyMap: Record<Money['currency'], string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
}

export function Price(props: Props) {
  return (
    <span>
      {props.amount}
      {' '}
      {moneyCurrencyMap[props.currency]}
    </span>
  )
}
