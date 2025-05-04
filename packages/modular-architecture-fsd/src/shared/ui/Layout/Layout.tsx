import { useEffect } from 'react'
import { useDi } from '~/shared/di'
import { FeatureToggle } from '~/shared/feature-flags'
import { ThemeToggle } from '~/shared/theme'
import styles from './Layout.module.css'

export function Layout({ children, rightSidebarSlot }: { children: React.ReactNode, rightSidebarSlot: React.ReactNode }) {
  const featureFlagsService = useDi('FEATURE_FLAGS_SERVICE_TOKEN')
  const themeService = useDi('THEME_SERVICE_TOKEN')

  useEffect(() => {
    themeService.init()
  }, [themeService])

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>CodeFest shop</h1>
      <div className={styles.layout}>
        {children}
        {rightSidebarSlot && (
          <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              {rightSidebarSlot}
            </div>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        {featureFlagsService.get('darkTheme') && <ThemeToggle />}
        <FeatureToggle />
      </div>
    </div>
  )
}
