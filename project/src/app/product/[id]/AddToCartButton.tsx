'use client'

import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface AddToCartButtonProps {
  readonly product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = () => {
    // Add the specified quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2">
          <button
            onClick={decrementQuantity}
            className="p-2 rounded-xl hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          
          <span className="w-12 text-center font-semibold text-gray-900 bg-white py-2 rounded-xl">
            {quantity}
          </span>
          
          <button
            onClick={incrementQuantity}
            className="p-2 rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isAdded ? (
          <>
            <Check className="h-5 w-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Add {quantity > 1 ? `${quantity} ` : ''}to Cart</span>
          </>
        )}
      </button>

      {/* Buy Now Button */}
      <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        Buy Now
      </button>
    </div>
  )
}