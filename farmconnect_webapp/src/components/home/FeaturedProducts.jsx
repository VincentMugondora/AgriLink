import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const featured = [
  { id: 1, name: 'Maize Grain', category: 'Grains', price: 12.5, unit: 'kg', grade: 'A' },
  { id: 2, name: 'Tomatoes', category: 'Vegetables', price: 2.2, unit: 'kg', grade: 'A' },
  { id: 3, name: 'Bananas', category: 'Fruits', price: 1.8, unit: 'kg', grade: 'B' },
  { id: 4, name: 'Sunflower Seeds', category: 'Grains', price: 3.5, unit: 'kg', grade: 'A' },
  { id: 5, name: 'Potatoes', category: 'Vegetables', price: 1.4, unit: 'kg', grade: 'A' },
  { id: 6, name: 'Oranges', category: 'Fruits', price: 2.1, unit: 'kg', grade: 'B' },
]

const ProductCard = ({ product }) => {
  const { t } = useTranslation()
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-5xl">
        🌾
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.grade === 'A' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {/* i18n: Grade */}
            <>{t('featured.grade')} {product.grade}</>
          </span>
        </div>
        <div className="text-sm text-gray-500 mb-3">{product.category}</div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm"> / {product.unit}</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star size={16} className="fill-current" />
            <Star size={16} className="fill-current" />
            <Star size={16} className="fill-current" />
            <Star size={16} className="fill-current" />
            <Star size={16} className="text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

const FeaturedProducts = () => {
  const { t } = useTranslation()
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('featured.title')}</h2>
          <Link to="/products" className="text-green-700 hover:text-green-800 font-medium">{t('featured.browse')}</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
