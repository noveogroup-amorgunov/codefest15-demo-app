import type { Cart } from '~/domain/cart'
import type { Product } from '~/domain/product'
import type { User } from '~/domain/user'

export interface CartStorageService {
  getCart: () => Cart
  updateCart: (cart: Cart) => void
}

export interface NotificationService {
  notify: (message: string) => void
}

export interface UserStorageService {
  updateUser: (user: User) => void
  getUser: () => User
}

export interface AuthenticationService {
  login: (payload: {
    login: string
    password: string
  }) => Promise<User>
}

export interface ProductService {
  loadPopularProducts: () => Promise<Product[]>
}

export interface ProductStorageService {
  upsertProducts: (products: Product[]) => Promise<void>
  setLoadingState: (loading: boolean) => void
}
