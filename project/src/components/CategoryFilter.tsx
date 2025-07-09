'use client'

import { useCategories } from '@/hooks/useProducts'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface CategoryFilterProps {
  readonly selectedCategory?: string | null
  readonly onCategoryChange?: (category: string | null) => void
}

export default function CategoryFilter({ selectedCategory: propSelectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { categories, loading, error } = useCategories()
  const [localSelectedCategory, setLocalSelectedCategory] = useState<string | null>(null)
  
  const selectedCategory = propSelectedCategory !== undefined ? propSelectedCategory : localSelectedCategory
  
  const handleCategoryChange = (category: string | null) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      setLocalSelectedCategory(category)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`category-loading-${i}`} className="h-12 w-28 bg-gray-200 rounded-xl animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-red-600 text-sm flex items-center space-x-2">
          <span>⚠️</span>
          <span>Failed to load categories</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Shop by Category</h3>
        <div className="flex space-x-1">
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => handleCategoryChange(null)}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 border",
            selectedCategory === null
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-blue-600"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200 hover:border-gray-300"
          )}
        >
          All Products
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.category)}
            className={cn(
              "px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 capitalize border",
              selectedCategory === category.category
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-blue-600"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200 hover:border-gray-300"
            )}
          >
            {category.category}
          </button>
        ))}
      </div>
    </div>
  )
}