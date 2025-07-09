'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Product } from '@/types'
import LoadingSpinner from './LoadingSpinner'
import ProductCard from './ProductCard'

interface ProductGridProps {
  readonly products: Product[]
  readonly loading: boolean
  readonly error: string | null
  readonly hasMore: boolean
  readonly onLoadMore: () => void
}

export default function ProductGrid(props: ProductGridProps) {
  const { products, loading, error, hasMore, onLoadMore } = props

  const { targetRef } = useIntersectionObserver({
    onIntersect: onLoadMore,
    threshold: 0.1,
    rootMargin: '100px'
  })

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (products.length === 0 && loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={`product-loading-${i}`} className="bg-gray-200 rounded-lg aspect-[3/4] animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      {/* Intersection observer target */}
      {hasMore && (
        <div ref={targetRef} className="flex justify-center py-8">
          {loading && <LoadingSpinner />}
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end of the products</p>
        </div>
      )}
    </div>
  )
}