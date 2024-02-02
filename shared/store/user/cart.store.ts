import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { Product } from '@feature/product'
import { GENERAL_ERROR_MESSAGE } from '@shared/util'

interface ICart {
  product: Product
  quantity: number
}

interface IWishlist {
  product: Product
}

interface ICartStore {
  addToCart: (product: Product) => void | ICartStore | Partial<ICartStore>
  addToFavorites: (product: Product) => void | ICartStore | Partial<ICartStore>
  cart: ICart[] | []
  decrease: (productId: string) => void
  error: string | null
  favorites: IWishlist[] | []
  increase: (productId: string) => void
  removeFromCart: (productId: string) => void
  removeFromFavorites: (productId: string) => void
}

const initial = {
  cart: [],
  error: null,
  favorites: [],
  showCart: false,
  showFavorites: false,
}

const useCartStore = create(
  devtools(
    persist<ICartStore>(
      set => ({
        ...initial,
        addToCart: (product: Product) => {
          try {
            set((state: ICartStore) => {
              const cartItemIndex = state.cart.findIndex(
                cartItem => cartItem.product.id === product.id
              )
              if (cartItemIndex === -1) {
                return {
                  ...state,
                  cart: [
                    ...state.cart,
                    {
                      product,
                      quantity: 1,
                    },
                  ],
                }
              } else {
                // if product is already in cart --> quantity++
                // no more than 5 of the same products per order
                if (state.cart[cartItemIndex].quantity < 5) {
                  const newCart = state.cart
                  newCart[cartItemIndex].quantity =
                    newCart[cartItemIndex].quantity + 1
                  return {
                    ...state,
                    cart: newCart,
                  }
                } else {
                  return {
                    ...state,
                  }
                }
              }
            })
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error }))
          }
        },
        addToFavorites: (product: Product) => {
          try {
            set(state => {
              const wishlistItemIndex = state.favorites.findIndex(
                wishlistItem => wishlistItem.product.id === product.id
              )
              if (wishlistItemIndex === -1) {
                return {
                  ...state,
                  favorites: [
                    ...state.favorites,
                    {
                      product,
                    },
                  ],
                }
              } else return {}
            })
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error }))
          }
        },
        decrease: (productId: string) => {
          try {
            set(state => {
              const cartItemIndex = state.cart.findIndex(
                (e: ICart) => e.product.id === productId
              )
              const cart = [...state.cart]
              if (cart[cartItemIndex].quantity > 1) {
                cart[cartItemIndex] = {
                  ...cart[cartItemIndex],
                  quantity: cart[cartItemIndex].quantity - 1,
                }
              }

              return {
                ...state,
                cart,
              }
            })
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error }))
          }
        },
        increase: (productId: string) => {
          try {
            set(state => {
              const cartItemIndex = state.cart.findIndex(
                (e: ICart) => e.product.id === productId
              )
              const cart = [...state.cart]
              if (cart[cartItemIndex].quantity < 5) {
                cart[cartItemIndex] = {
                  ...cart[cartItemIndex],
                  quantity: cart[cartItemIndex].quantity + 1,
                }
              }

              return {
                ...state,
                cart,
              }
            })
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error }))
          }
        },
        removeFromCart: (productId: string) => {
          try {
            set(state => {
              return {
                ...state,
                cart: state.cart.filter(
                  cartItem => cartItem.product.id !== productId
                ),
              }
            })
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error }))
          }
        },
        removeFromFavorites: (productId: string) => {
          try {
            set(state => {
              return {
                ...state,
                favorites: state.favorites.filter(
                  wishlistItem => wishlistItem.product.id !== productId
                ),
              }
            })
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error }))
          }
        },
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'Cart Store' }
  )
)

export const useCartItems = () =>
  useCartStore((state): number => {
    let total = 0
    Array.isArray(state.cart) &&
      state.cart.map(cartItem => {
        total += cartItem.quantity
      })
    return total
  })

export const useWishlistItems = () =>
  useCartStore((state): number => {
    return state.favorites.length
  })

export const useCartTotal = () =>
  useCartStore(state => {
    let total = 0
    Array.isArray(state.cart) &&
      state.cart.map(cartItem => {
        total += cartItem.product?.price * cartItem.quantity
      })
    return total
  })

export default useCartStore
