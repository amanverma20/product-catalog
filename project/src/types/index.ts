export interface Product {
  id: number
  title: string
  image: string
  price: number
  description: string
  category: string
  rating?: {
    rate: number
    count: number
  }
}

export interface ProductsResponse {
  products: Product[]
  totalPages?: number
  currentPage?: number
  totalProducts?: number
  status: string
}

export interface Category {
  id: number
  category: string
  name: string
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}