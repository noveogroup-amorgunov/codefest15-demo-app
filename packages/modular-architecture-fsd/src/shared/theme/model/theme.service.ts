import { signal } from '@preact/signals'
import { container } from '~/shared/di'

type Theme = 'dark' | 'light'

export const themeStore = signal<Theme>('light')

export const themeService = {
  init: () => {
    document.documentElement.setAttribute('data-theme', themeStore.value)
  },
  get: () => themeStore.value,
  set: (theme: Theme) => {
    themeStore.value = theme
    document.documentElement.setAttribute('data-theme', theme)
  },
  toggle: () => {
    themeStore.value = themeStore.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', themeStore.value)
  },
}

container.register('THEME_SERVICE_TOKEN', themeService)

declare module '~/shared/di/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface DIContainerService {
    THEME_SERVICE_TOKEN: typeof themeService
  }
}
