import { useSignals } from '@preact/signals-react/runtime'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '~/services/store/reduxStore'
import { FeatureToggle } from '~/ui/FeatureToggle/FeatureToggle'
import { ThemeToggle } from '~/ui/ThemeToggle/ThemeToggle'
import styles from './App.module.css'
import { useDi } from './services/di/useDi'
import { Cart } from './ui/Cart/Cart'
import { ProductList } from './ui/ProductList/ProductList'

function App() {
  useSignals()
  const featureFlagsService = useDi('FEATURE_FLAGS_SERVICE_TOKEN')
  const themeService = useDi('THEME_SERVICE_TOKEN')

  useEffect(() => {
    themeService.init()
  }, [themeService])

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <h1 className={styles.title}>HolyJS workshop (clean architecture)</h1>
        <div className={styles.layout}>
          <ProductList />
          {featureFlagsService.get('cart') && <div className={styles.sidebar}><Cart /></div>}
        </div>
        <div className={styles.actions}>
          {featureFlagsService.get('darkTheme') && <ThemeToggle />}
          <FeatureToggle />
        </div>
      </div>
    </Provider>
  )
}

export default App
