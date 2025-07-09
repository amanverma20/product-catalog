import { formatPrice, truncateText } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [imgSrc, setImgSrc] = useState(product.image)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)
    addItem(product)
    
    // Add a small delay for better UX
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 600)
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-blue-200 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={imgSrc || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={() => setImgSrc('/placeholder.png')}
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/btn">
                <Heart className="h-4 w-4 text-gray-600 group-hover/btn:text-red-500 transition-colors duration-200" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/btn">
                <Eye className="h-4 w-4 text-gray-600 group-hover/btn:text-blue-500 transition-colors duration-200" />
              </button>
            </div>
          </div>
          
          {/* Quick Add to Cart Button */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
            >
              <ShoppingCart className={`h-4 w-4 ${isAddingToCart ? 'animate-bounce' : ''}`} />
              <span>{isAddingToCart ? 'Adding...' : 'Quick Add'}</span>
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-5">
          <div className="mb-3">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1 capitalize">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
              {truncateText(product.title, 60)}
            </h3>
          </div>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!.rate)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-xs text-gray-500">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          )}
          
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              aria-label="Add to cart"
            >
              <ShoppingCart className={`h-4 w-4 ${isAddingToCart ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}