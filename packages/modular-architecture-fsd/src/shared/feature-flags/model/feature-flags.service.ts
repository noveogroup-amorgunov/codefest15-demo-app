import { signal } from '@preact/signals'
import { container } from '~/shared/di'
import type { FeatureFlag } from './types'

export type FeatureFlagsStore = Record<FeatureFlag, boolean>

export const featureFlagsStore = signal<FeatureFlagsStore>({
  darkTheme: true,
  cart: true,
  audioEffects: false,
})

export const featureFlagService = {
  getAll: () => Object.entries(featureFlagsStore.value).map(([key, value]) => ({
    id: key,
    name: key,
    description: key,
    enabled: value,
  })),
  get: (featureFlag: keyof FeatureFlagsStore) => featureFlagsStore.value[featureFlag],
  toggle: (featureFlag: keyof FeatureFlagsStore) => {
    featureFlagsStore.value = {
      ...featureFlagsStore.value,
      [featureFlag]: !featureFlagsStore.value[featureFlag],
    }
  },
}

container.register('FEATURE_FLAGS_SERVICE_TOKEN', featureFlagService)

declare module '~/shared/di/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface DIContainerService {
    FEATURE_FLAGS_SERVICE_TOKEN: typeof featureFlagService
  }
}
