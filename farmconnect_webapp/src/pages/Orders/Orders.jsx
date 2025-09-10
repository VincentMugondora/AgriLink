import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Orders = () => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('')

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', { tab: activeTab, status: statusFilter, role: user?.role, id: user?.id }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)

      // Determine endpoint based on role and selected tab
      let endpoint = ''
      if (user?.role === 'admin') {
        // Admin can access all orders
        endpoint = `/api/orders` // optional status
      } else if (user?.role === 'buyer') {
        // Buyer can view their purchases
        if (activeTab === 'sales') {
          // No sales for buyers; return an empty result
          return { data: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } }
        }
        endpoint = `/api/orders/buyer/${user.id}`
      } else if (user?.role === 'farmer' || user?.role === 'trader') {
        // Seller can view their sales
        if (activeTab === 'purchases') {
          // No purchases for sellers; return an empty result
          return { data: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } }
        }
        endpoint = `/api/orders/seller/${user.id}`
      } else {
        // Unknown role -> empty
        return { data: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } }
      }

      const url = params.toString() ? `${endpoint}?${params}` : endpoint
      const response = await axios.get(url)
      return response.data
    }
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />
      case 'accepted':
        return <CheckCircle size={20} className="text-blue-500" />
      case 'payment_pending':
        return <Clock size={20} className="text-orange-500" />
      case 'paid':
        return <CheckCircle size={20} className="text-green-600" />
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
      case 'accepted':
        return 'bg-blue-100 text-blue-800'
      case 'payment_pending':
        return 'bg-orange-100 text-orange-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
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
    { id: 'all', label: t('ordersPage.tabs.all') },
    { id: 'purchases', label: t('ordersPage.tabs.purchases') },
    { id: 'sales', label: t('ordersPage.tabs.sales') }
  ]

  const statuses = ['pending', 'accepted', 'payment_pending', 'paid', 'shipped', 'delivered', 'cancelled', 'rejected', 'disputed', 'refunded']

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
            {t('ordersPage.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('ordersPage.subtitle')}
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
                {t('ordersPage.filters.status')}
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">{t('ordersPage.filters.allStatuses')}</option>
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
              {t('ordersPage.empty.none')}
            </p>
            <p className="text-gray-500">
              {activeTab === 'purchases' 
                ? t('ordersPage.empty.noPurchases') 
                : activeTab === 'sales'
                ? t('ordersPage.empty.noSales')
                : t('ordersPage.empty.noOrders')
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
                        {t('ordersPage.labels.orderHash')}{order.id}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t('ordersPage.labels.product')}</p>
                        <p className="text-gray-900">{order.product?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t('ordersPage.labels.quantity')}</p>
                        <p className="text-gray-900">
                          {order.quantity} {order.product?.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t('ordersPage.labels.totalAmount')}</p>
                        <p className="text-gray-900 font-semibold">
                          ${order.totalPrice}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {activeTab === 'sales' ? t('ordersPage.labels.buyer') : t('ordersPage.labels.seller')}
                        </p>
                        <p className="text-gray-900">
                          {activeTab === 'sales' 
                            ? `${order.buyer?.firstName} ${order.buyer?.lastName}`
                            : `${order.seller?.firstName} ${order.seller?.lastName}`
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t('ordersPage.labels.deliveryAddress')}</p>
                        <p className="text-gray-900">{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t('ordersPage.labels.estimatedDelivery')}</p>
                        <p className="text-gray-900">
                          {order.estimatedDeliveryDate 
                            ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                            : t('ordersPage.labels.tbd')
                          }
                        </p>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">{t('ordersPage.labels.notes')}</p>
                        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
                          {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-6">
                    <button className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                      <Eye size={16} className="mr-2" />
                      {t('ordersPage.actions.viewDetails')}
                    </button>
                    
                    {order.status === 'pending' && (
                      <button className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        <XCircle size={16} className="mr-2" />
                        {t('ordersPage.actions.cancel')}
                      </button>
                    )}
                    
                    {order.status === 'paid' && activeTab === 'sales' && (
                      <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        <Package size={16} className="mr-2" />
                        {t('ordersPage.actions.markShipped')}
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
