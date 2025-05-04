import type { AppDispatch } from '~/services/store/reduxStore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddToCart } from '~/application/addToCart'
import { useDi } from '~/services/di/useDi'
import { fetchPopularProducts, selectPopularProducts, selectPopularProductsError, selectPopularProductsLoading } from '~/services/store/popularProducts'
import { ProductListCard } from '../ProductListCard/ProductListCard'
import styles from './ProductList.module.css'

export function ProductList() {
  const dispatch = useDispatch<AppDispatch>()
  const cartStorageService = useDi('CART_STORAGE_SERVICE_TOKEN')
  const notificationService = useDi('NOTIFICATION_SERVICE_TOKEN')
  const products = useSelector(selectPopularProducts)
  const loading = useSelector(selectPopularProductsLoading)
  const error = useSelector(selectPopularProductsError)
  const cartItems = cartStorageService.getItems()

  const { addToCart } = useAddToCart({
    cartStorageService,
    notificationService,
  })

  useEffect(() => {
    dispatch(fetchPopularProducts())
  }, [])

  if (loading) {
    return (
      <div className={styles.root}>
        <h2>Popular Products</h2>
        <div>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.root}>
        <h2>Popular Products</h2>
        <div>Error loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <h2>Popular Products</h2>
      <div className={styles.grid}>
        {products.map((product) => {
          const cartItem = cartItems.find(item => item.product.id === product.id)
          const quantity = cartItem?.quantity || 0
          const availableStock = product.stock - quantity
          const outOfStock = product.stock === 0

          return (
            <ProductListCard
              key={product.id}
              product={product}
              outOfStock={outOfStock}
              canAddToCart={availableStock > 0}
              quantity={quantity}
              increaseQuantity={() => addToCart(product, quantity + 1)}
              decreaseQuantity={() => addToCart(product, quantity - 1)}
            />
          )
        })}
      </div>
    </div>
  )
}
