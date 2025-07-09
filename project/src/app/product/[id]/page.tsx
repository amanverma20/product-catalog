import { fetchProduct } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { ArrowLeft, RotateCcw, Shield, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import AddToCartButton from './AddToCartButton'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params
    const product = await fetchProduct(id)

    if (!product) {
      notFound()
    }

    // Fallback image logic
    const [imgSrc, setImgSrc] = useState(product.image)

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <Image
                  src={imgSrc || '/placeholder.png'}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setImgSrc('/placeholder.png')}
                />
              </div>
              
              {/* Thumbnail Gallery - Placeholder for future enhancement */}
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 opacity-60">
                    <Image
                      src={imgSrc || '/placeholder.png'}
                      alt={`${product.title} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                      onError={() => setImgSrc('/placeholder.png')}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {product.category}
                    </span>
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating!.rate)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating.rate} ({product.rating.count} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.title}
                  </h1>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline space-x-3 mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price * 1.2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-sm font-semibold">
                      17% OFF
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                <div className="mb-8">
                  <AddToCartButton product={product} />
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl border border-green-200">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800 text-sm">Free Shipping</p>
                      <p className="text-xs text-green-600">On orders over $50</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800 text-sm">Warranty</p>
                      <p className="text-xs text-blue-600">2 year guarantee</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-2xl border border-purple-200">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <RotateCcw className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-800 text-sm">Easy Returns</p>
                      <p className="text-xs text-purple-600">30 day policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}