import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const categoryKeys = ['grains', 'vegetables', 'fruits', 'livestock', 'inputs', 'equipment']

const CategoryChips = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryKeys.map((key) => (
            <Link
              key={key}
              to="/products"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors text-sm font-medium"
            >
              {t(`categories.${key}`)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryChips
