import { Product } from '@/types'
import { useEffect, useState } from 'react'

export function useSimpleProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products...')
        const response = await fetch('https://fakestoreapi.in/api/products?page=1&limit=8')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Products fetched:', data)
        
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
