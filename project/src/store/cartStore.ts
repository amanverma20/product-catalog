import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem, Cart } from '@/types'

interface CartStore extends Cart {
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product: Product) => {
        const { items } = get()
        const existingItem = items.find(item => item.product.id === product.id)

        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }))
        } else {
          set(state => ({
            items: [...state.items, { product, quantity: 1 }],
          }))
        }

        // Recalculate totals
        const updatedItems = get().items
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        set({ total, itemCount })
      },

      removeItem: (productId: number) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }))

        // Recalculate totals
        const updatedItems = get().items
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        set({ total, itemCount })
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }))

        // Recalculate totals
        const updatedItems = get().items
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        set({ total, itemCount })
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 })
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)