import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: [
      'src/shared/redux/types.ts',
      'src/shared/di/useDi.tsx',
    ],
    rules: {
      'fsd/forbidden-imports': 'off',
      'fsd/no-public-api-sidestep': 'off',
    },
  },
  {
    files: [
      'src/shared/theme/**',
      'src/shared/feature-flags/**',
      'src/shared/di/**',
    ],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
    },
  },
])
