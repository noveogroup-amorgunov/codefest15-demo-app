import { signal } from '@preact/signals'

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
