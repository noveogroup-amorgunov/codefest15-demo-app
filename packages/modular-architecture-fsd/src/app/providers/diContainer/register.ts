import { Container } from '~/shared/di'
import { featureFlagService } from '~/shared/feature-flags'
import { themeService } from '~/shared/theme'
import { cartStore } from '~/widgets/cart'

export const container = new Container({
  FEATURE_FLAGS_SERVICE_TOKEN: featureFlagService,
  THEME_SERVICE_TOKEN: themeService,
  CART_STORE_TOKEN: cartStore,
  // ...
} as const)

declare global {
  type DIContainer = typeof container
}
