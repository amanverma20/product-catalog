'use client'

import { useCartStore } from '@/store/cartStore'
import { Heart, Search, ShoppingCart, Store, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const itemCount = useCartStore(state => state.itemCount)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gradient">ShopHub</span>
              <p className="text-xs text-gray-500 -mt-1">Premium Store</p>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                suppressHydrationWarning={true}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            
            {/* Wishlist - Hidden on mobile */}
            <button className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors duration-200">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Wishlist</span>
            </button>
            
            {/* Account - Hidden on mobile */}
            <button className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <User className="h-5 w-5" />
              <span className="font-medium">Account</span>
            </button>
            
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-full transition-all duration-200 group"
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold hidden sm:block">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              suppressHydrationWarning={true}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </header>
  )
}