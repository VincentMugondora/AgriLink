import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Package, Trash2, Edit3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyProducts = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['my-products', { userId: user.id, status, page, limit }],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products/seller/${user.id}`, {
        params: { status: status || undefined, page, limit }
      })
      return data
    },
    keepPreviousData: true
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/products/${id}`)
    },
    onSuccess: () => {
      toast.success('Product deleted')
      queryClient.invalidateQueries(['my-products'])
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to delete product'
      toast.error(msg)
    }
  })

  const products = data?.data || []
  const pagination = data?.pagination

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">Manage the products you have listed for sale</p>
          </div>
          <Link to="/products/new" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add Product</Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Status:</label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="sold_out">Sold out</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center">Loading...</div>
        ) : isError ? (
          <div className="py-20 text-center text-red-600">Failed to load products</div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-700 mb-2">You have not listed any products yet.</p>
            <Link to="/products/new" className="text-green-600 hover:text-green-700 font-medium">Add your first product</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-20 h-20 object-cover rounded-md border" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-md border flex items-center justify-center">
                      <Package size={24} className="text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-600">{p.category} • Grade {p.grade} • {p.unit}</p>
                    <p className="text-sm text-gray-700 mt-1">${p.pricePerUnit} / {p.unit}</p>
                    <div className="mt-1 text-xs text-gray-500">Qty: {p.quantity} • Available: {p.availableQuantity}</div>
                    <div className="mt-2">
                      {p.status === 'available' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Available</span>}
                      {p.status === 'sold_out' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">Sold out</span>}
                      {p.status === 'inactive' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">Inactive</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  <Link to={`/products/${p.id}`} className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                    <Edit3 size={16} /> View
                  </Link>
                  <button
                    onClick={() => {
                      if (deleteMutation.isLoading) return
                      const confirmed = window.confirm('Delete this product? This action cannot be undone.')
                      if (!confirmed) return
                      deleteMutation.mutate(p.id)
                    }}
                    disabled={deleteMutation.isLoading}
                    className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pg => (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`px-3 py-1.5 rounded-md text-sm ${pg === pagination.page ? 'bg-green-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {pg}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProducts
