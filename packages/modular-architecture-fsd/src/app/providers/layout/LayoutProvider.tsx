import { useSignals } from '@preact/signals-react/runtime'
import { useDi } from '~/shared/di'
import { Layout } from '~/shared/ui'
import { Cart } from '~/widgets/cart'
import { ProductList } from '~/widgets/popular-products'

export function LayoutProvider() {
  useSignals()

  const featureFlagsService = useDi('FEATURE_FLAGS_SERVICE_TOKEN')

  return (
    <Layout rightSidebarSlot={featureFlagsService.get('cart') && <Cart />}>
      <ProductList />
    </Layout>
  )
}
