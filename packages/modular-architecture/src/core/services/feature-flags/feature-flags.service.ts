import type { FeatureFlag } from '~/types/featureFlags'
import { signal } from '@preact/signals'

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
