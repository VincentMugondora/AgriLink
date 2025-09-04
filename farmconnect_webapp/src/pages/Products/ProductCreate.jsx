import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

const ProductCreate = () => {
  const { user } = useAuth()

  const isSeller = user?.role === 'farmer' || user?.role === 'trader'

  if (!isSeller) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Not authorized</h1>
          <p className="text-gray-600 mb-6">Only farmers and traders can add new products.</p>
          <Link to="/products" className="text-green-600 hover:text-green-700 font-medium">
            Browse products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Product creation form is coming soon. For now, you can manage your products from the Products page.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/products" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Go to Products</Link>
          <Link to="/dashboard" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
