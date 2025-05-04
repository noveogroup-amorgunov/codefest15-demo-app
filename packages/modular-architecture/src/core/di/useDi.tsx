import { featureFlagService } from '../services/feature-flags/feature-flags.service'
import { themeService } from '../services/theme/theme.service'
import { Container } from './container'

const container = new Container({
  FEATURE_FLAGS_SERVICE_TOKEN: featureFlagService,
  THEME_SERVICE_TOKEN: themeService,
} as const)

export function useDi<T extends ReturnType<typeof container.getKeys>[number]>(token: T) {
  return container.get(token)
}
