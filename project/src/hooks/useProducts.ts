import { fetchCategories, fetchProducts, fetchProductsByCategory } from '@/lib/api'
import { Category, Product } from '@/types'
import { useCallback, useEffect, useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true) // Start with loading = true
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loadingRef, setLoadingRef] = useState(false)

  const loadProducts = useCallback(async (page: number, reset: boolean = false) => {
    console.log('loadProducts called:', { page, reset, selectedCategory, loadingRef })
    
    if (loadingRef) {
      console.log('Already loading, returning early')
      return
    }
    
    console.log('Starting to load products...')
    setLoadingRef(true)
    setLoading(true)
    setError(null)

    try {
      if (selectedCategory) {
        console.log('Loading category products for:', selectedCategory)
        const categoryProducts = await fetchProductsByCategory(selectedCategory)
        console.log('Category products received:', categoryProducts.products?.length)
        setProducts(categoryProducts.products)
        setHasMore(false)
      } else {
        console.log('Loading paginated products, page:', page)
        const response = await fetchProducts(page, 8)
        console.log('Products received:', response.products?.length)
        
        if (reset) {
          setProducts(response.products)
          console.log('Products reset with:', response.products.length, 'items')
        } else {
          setProducts(prev => {
            const existingIds = prev.map(p => p.id)
            const newProducts = response.products.filter(p => !existingIds.includes(p.id))
            console.log('Adding new products:', newProducts.length, 'to existing:', prev.length)
            return [...prev, ...newProducts]
          })
        }
        
        setHasMore(response.products.length === 8)
        console.log('Has more:', response.products.length === 8)
      }
    } catch (err) {
      console.error('Error loading products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      console.log('Loading complete')
      setLoading(false)
      setLoadingRef(false)
    }
  }, [selectedCategory])

  const loadMore = useCallback(() => {
    if (!loadingRef && hasMore && !selectedCategory) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      loadProducts(nextPage, false)
    }
  }, [loadingRef, hasMore, currentPage, selectedCategory, loadProducts])

  const filterByCategory = useCallback((category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setHasMore(true)
    setProducts([])
    
    loadProducts(1, true)
  }, [loadProducts])

  useEffect(() => {
    console.log('useProducts initial effect triggered')
    loadProducts(1, true)
  }, [])

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    filterByCategory,
    selectedCategory
  }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return { categories, loading, error }
}