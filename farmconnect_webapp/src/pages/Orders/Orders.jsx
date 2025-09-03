import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react'

const Orders = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('')

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', { tab: activeTab, status: statusFilter }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (activeTab !== 'all') params.append('type', activeTab)
      if (statusFilter) params.append('status', statusFilter)
      
      const response = await axios.get(`/api/orders?${params}`)
      return response.data
    }
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />
      case 'confirmed':
        return <CheckCircle size={20} className="text-blue-500" />
      case 'shipped':
        return <Package size={20} className="text-purple-500" />
      case 'delivered':
        return <CheckCircle size={20} className="text-green-500" />
      case 'cancelled':
        return <XCircle size={20} className="text-red-500" />
      default:
        return <Clock size={20} className="text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'purchases', label: 'My Purchases' },
    { id: 'sales', label: 'My Sales' }
  ]

  const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

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
        <p className="text-red-600">Error loading orders. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Orders 📦
          </h1>
          <p className="text-gray-600 text-lg">
            Track and manage your orders
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Filter by Status:
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders?.data?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              No orders found.
            </p>
            <p className="text-gray-500">
              {activeTab === 'purchases' 
                ? "You haven't made any purchases yet." 
                : activeTab === 'sales'
                ? "You haven't made any sales yet."
                : "You don't have any orders yet."
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders?.data?.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        Order #{order.id}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Product</p>
                        <p className="text-gray-900">{order.product?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Quantity</p>
                        <p className="text-gray-900">
                          {order.quantity} {order.product?.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Total Amount</p>
                        <p className="text-gray-900 font-semibold">
                          ${order.totalAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {activeTab === 'sales' ? 'Buyer' : 'Seller'}
                        </p>
                        <p className="text-gray-900">
                          {activeTab === 'sales' 
                            ? `${order.buyer?.firstName} ${order.buyer?.lastName}`
                            : `${order.seller?.firstName} ${order.seller?.lastName}`
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Delivery Location</p>
                        <p className="text-gray-900">{order.deliveryLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Expected Delivery</p>
                        <p className="text-gray-900">
                          {order.expectedDeliveryDate 
                            ? new Date(order.expectedDeliveryDate).toLocaleDateString()
                            : 'TBD'
                          }
                        </p>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
                          {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-6">
                    <button className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                      <Eye size={16} className="mr-2" />
                      View Details
                    </button>
                    
                    {order.status === 'pending' && (
                      <button className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        <XCircle size={16} className="mr-2" />
                        Cancel
                      </button>
                    )}
                    
                    {order.status === 'confirmed' && activeTab === 'sales' && (
                      <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        <Package size={16} className="mr-2" />
                        Mark Shipped
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {orders?.pagination && orders.pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: orders.pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-4 py-2 rounded-md ${
                  page === orders.pagination.page 
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

export default Orders
