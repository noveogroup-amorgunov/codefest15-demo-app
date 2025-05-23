import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: [
      'src/shared/redux/**',
      'src/shared/theme/**',
      'src/shared/feature-flags/**',
      'src/shared/di/**',
    ],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
    },
  },
])
