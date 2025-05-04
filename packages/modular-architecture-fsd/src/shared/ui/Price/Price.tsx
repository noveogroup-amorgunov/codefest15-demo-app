import type { Money } from '@monorepo/shared'

type Props = Money

const moneyCurrencyMap: Record<Money['currency'], string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
}

export function Price({ amount, currency }: Props) {
  return (
    <span>
      {amount}
      {' '}
      {moneyCurrencyMap[currency]}
    </span>
  )
}
