import { fetchProduct } from '@/lib/api'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'

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
    return <ProductPageClient product={product} />
  } catch (error) {
    notFound()
  }
}