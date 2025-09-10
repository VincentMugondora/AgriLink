import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Search, Filter, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Products = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', { searchTerm, selectedCategory, selectedGrade, sortBy }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedGrade) params.append('grade', selectedGrade)
      params.append('sortBy', sortBy)
      
      const response = await axios.get(`/api/products?${params}`)
      return response.data
    }
  })

  const categories = [
    'Vegetables', 'Fruits', 'Grains', 'Legumes', 'Herbs', 'Dairy', 'Livestock'
  ]

  const grades = ['A', 'B', 'C']

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">Error loading products. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('productsPage.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('productsPage.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('productsPage.searchLabel')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('productsPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('productsPage.categoryLabel')}
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">{t('productsPage.allCategories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('productsPage.gradeLabel')}
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="">{t('productsPage.allGrades')}</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{t('productsPage.gradeLabel')} {grade}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('productsPage.sortByLabel')}
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">{t('productsPage.sortOptions.createdAt')}</option>
                <option value="pricePerUnit">{t('productsPage.sortOptions.priceAsc')}</option>
                <option value="-pricePerUnit">{t('productsPage.sortOptions.priceDesc')}</option>
                <option value="name">{t('productsPage.sortOptions.name')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products?.data?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-2">
              {t('productsPage.noResultsTitle')}
            </p>
            <p className="text-gray-500">
              {t('productsPage.noResultsHint')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.data?.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center text-4xl">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    '🌾'
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.grade === 'A' ? 'bg-green-100 text-green-800' : 
                      product.grade === 'B' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      Grade {product.grade}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description?.substring(0, 100)}
                    {product.description?.length > 100 && '...'}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ${product.pricePerUnit}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        /{product.unit}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {product.availableQuantity} {product.unit} {t('productsPage.available')}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>
                      {product.seller?.firstName} {product.seller?.lastName}
                    </span>
                  </div>

                  <Link
                    to={`/products/${product.id}`}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-center block"
                  >
                    {t('productsPage.viewDetails')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {products?.pagination && products.pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: products.pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-4 py-2 rounded-md ${
                  page === products.pagination.page 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
