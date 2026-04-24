import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react'
import type { Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; size: string }
  | { type: 'REMOVE_ITEM'; productId: number; size: string }
  | { type: 'UPDATE_QUANTITY'; productId: number; size: string; delta: number }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = state.items.findIndex(
        (i) => i.product.id === action.product.id && i.size === action.size
      )
      if (idx >= 0) {
        const items = [...state.items]
        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 }
        return { ...state, items, isOpen: true }
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, size: action.size },
        ],
        isOpen: true,
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.size === action.size)
        ),
      }
    case 'UPDATE_QUANTITY': {
      const idx = state.items.findIndex(
        (i) => i.product.id === action.productId && i.size === action.size
      )
      if (idx < 0) return state
      const newQty = state.items[idx].quantity + action.delta
      if (newQty <= 0) {
        return { ...state, items: state.items.filter((_, i) => i !== idx) }
      }
      const items = [...state.items]
      items[idx] = { ...items[idx], quantity: newQty }
      return { ...state, items }
    }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (product: Product, size: string) => void
  removeItem: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, delta: number) => void
  openCart: () => void
  closeCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  })

  const addItem = (product: Product, size: string) =>
    dispatch({ type: 'ADD_ITEM', product, size })
  const removeItem = (productId: number, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId, size })
  const updateQuantity = (productId: number, size: string, delta: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, size, delta })
  const openCart = () => dispatch({ type: 'OPEN_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const count = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        openCart,
        closeCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
