'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Product, ProductVariant, Cart, Currency } from '@/lib/types'

interface CartContextType {
  cart: Cart
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: Currency
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeFromCart: (itemId: string) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (itemId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  currency: 'EUR',
}

function calculateCart(items: CartItem[], currency: Currency): Cart {
  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.price ?? item.product.price
    return sum + price * item.quantity
  }, 0)
  const tax = subtotal * 0.05 // 5% tax
  const shipping = subtotal >= 100 ? 0 : 9.99
  const discount = 0
  const total = subtotal + tax + shipping - discount

  return {
    items,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    currency,
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const existingIndex = prev.items.findIndex(
        item => item.product.id === product.id && item.variant?.id === variant?.id
      )

      let newItems: CartItem[]
      if (existingIndex >= 0) {
        newItems = prev.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${variant?.id ?? 'default'}-${Date.now()}`,
          product,
          quantity,
          variant,
        }
        newItems = [...prev.items, newItem]
      }

      return calculateCart(newItems, prev.currency)
    })
    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.id !== itemId)
      return calculateCart(newItems, prev.currency)
    })
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number, variantId?: string) => {
    if (quantity < 1) return
    setCart(prev => {
      const newItems = prev.items.map(item =>
        item.id === itemId || (item.product.id === itemId && item.variant?.id === variantId)
          ? { ...item, quantity }
          : item
      )
      return calculateCart(newItems, prev.currency)
    })
  }, [])

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(
        item => !(item.product.id === productId && item.variant?.id === variantId)
      )
      return calculateCart(newItems, prev.currency)
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart(initialCart)
  }, [])

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        discount: cart.discount,
        total: cart.total,
        currency: cart.currency,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        addItem: addToCart,
        removeFromCart,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
