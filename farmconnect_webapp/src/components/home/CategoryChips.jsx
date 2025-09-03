import React from 'react'
import { Link } from 'react-router-dom'

const categories = ['Grains', 'Vegetables', 'Fruits', 'Livestock', 'Inputs', 'Equipment']

const CategoryChips = () => (
  <section className="bg-white">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <Link
            key={cat}
            to="/products"
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors text-sm font-medium"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  </section>
)

export default CategoryChips
