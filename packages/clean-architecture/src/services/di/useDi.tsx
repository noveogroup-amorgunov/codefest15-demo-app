import { authAdapter } from '../authAdaper'
import { cartStoreService } from '../cartStoreService'
import { featureFlagService } from '../featureFlagService'
import { notificationAdapter } from '../notificationAdapter'
import { productServiceAdapter } from '../productServiceAdapter'
import { productStorageServiceAdapter } from '../productStorageService'
import { themeService } from '../themeService'
import { Container } from './container'

export const diContainer = new Container({
  FEATURE_FLAGS_SERVICE_TOKEN: featureFlagService,
  THEME_SERVICE_TOKEN: themeService,
  CART_STORAGE_SERVICE_TOKEN: cartStoreService,
  NOTIFICATION_SERVICE_TOKEN: notificationAdapter(),
  AUTH_SERVICE_TOKEN: authAdapter(),
  PRODUCT_SERVICE_TOKEN: productServiceAdapter(),
  PRODUCT_STORAGE_SERVICE_TOKEN: productStorageServiceAdapter(),
} as const)

export function useDi<T extends ReturnType<typeof diContainer.getKeys>[number]>(token: T) {
  return diContainer.get(token)
}
