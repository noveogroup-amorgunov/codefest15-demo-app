import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDi } from '~/shared/di'
import type { AppDispatch } from '~/shared/redux'
import {
  fetchPopularProducts,
  selectPopularProducts,
  selectPopularProductsError,
  selectPopularProductsLoading,
} from '../../store/slice'
import { ProductListCard } from '../ProductListCard/ProductListCard'
import styles from './ProductList.module.css'

export function ProductList() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(selectPopularProducts)
  const loading = useSelector(selectPopularProductsLoading)
  const error = useSelector(selectPopularProductsError)
  const cartStore = useDi('CART_STORE_TOKEN')
  const cartItems = cartStore.getItems()

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
              increaseQuantity={() => cartStore.addToCart(product, 1)}
              decreaseQuantity={() => cartStore.addToCart(product, -1)}
            />
          )
        })}
      </div>
    </div>
  )
}
