import { Category, Product, ProductsResponse } from '@/types'

const BASE_URL = 'https://fakestoreapi.in'

export async function fetchProducts(page: number = 1, limit: number = 8): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/products?page=${page}&limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    return {
      products: data.products,
      status: 'success',
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      totalProducts: data.totalProducts
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function fetchProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/products/category`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    // Transform the response to match our Category interface
    const categories = data.categories.map((category: string, index: number) => ({
      id: index + 1,
      category: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      slug: category
    }))
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function fetchProductsByCategory(categorySlug: string, page: number = 1, limit: number = 8): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/products/category?type=${categorySlug}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products by category')
    }
    const data = await response.json()
    return {
      products: data.products,
      status: 'success',
      totalPages: 1, // Categories don't support pagination
      currentPage: 1,
      totalProducts: data.products.length
    }
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}