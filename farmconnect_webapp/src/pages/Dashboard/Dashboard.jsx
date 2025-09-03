import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Package, ShoppingCart, TrendingUp, Users, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard/stats')
      return response.data
    }
  })

  const getRoleBasedGreeting = () => {
    switch (user?.role) {
      case 'farmer':
        return 'Manage your farm products and track sales'
      case 'trader':
        return 'Monitor your trading activities and inventory'
      case 'buyer':
        return 'Track your orders and discover new products'
      default:
        return 'Welcome to your dashboard'
    }
  }

  const getRoleBasedActions = () => {
    switch (user?.role) {
      case 'farmer':
        return [
          { title: 'Add New Product', icon: Plus, link: '/products/new', color: 'bg-green-500' },
          { title: 'My Products', icon: Package, link: '/products/my', color: 'bg-blue-500' },
          { title: 'Sales Orders', icon: ShoppingCart, link: '/orders?type=sales', color: 'bg-yellow-500' },
          { title: 'Analytics', icon: TrendingUp, link: '/analytics', color: 'bg-purple-500' }
        ]
      case 'trader':
        return [
          { title: 'Browse Products', icon: Package, link: '/products', color: 'bg-green-500' },
          { title: 'My Inventory', icon: Package, link: '/inventory', color: 'bg-blue-500' },
          { title: 'Purchase Orders', icon: ShoppingCart, link: '/orders?type=purchases', color: 'bg-yellow-500' },
          { title: 'Sales Analytics', icon: TrendingUp, link: '/analytics', color: 'bg-purple-500' }
        ]
      case 'buyer':
        return [
          { title: 'Browse Products', icon: Package, link: '/products', color: 'bg-green-500' },
          { title: 'My Orders', icon: ShoppingCart, link: '/orders', color: 'bg-blue-500' },
          { title: 'Favorites', icon: Users, link: '/favorites', color: 'bg-yellow-500' },
          { title: 'Order History', icon: TrendingUp, link: '/orders/history', color: 'bg-purple-500' }
        ]
      default:
        return []
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            {getRoleBasedGreeting()}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Total Products</p>
                <p className="text-3xl font-bold">
                  {stats?.totalProducts || 0}
                </p>
              </div>
              <Package size={32} className="text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1">Active Orders</p>
                <p className="text-3xl font-bold">
                  {stats?.activeOrders || 0}
                </p>
              </div>
              <ShoppingCart size={32} className="text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 mb-1">This Month</p>
                <p className="text-3xl font-bold">
                  ${stats?.monthlyRevenue || 0}
                </p>
              </div>
              <TrendingUp size={32} className="text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Connections</p>
                <p className="text-3xl font-bold">
                  {stats?.connections || 0}
                </p>
              </div>
              <Users size={32} className="text-purple-200" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getRoleBasedActions().map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <action.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {action.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">No recent activity to display.</p>
            <p>
              Start by {user?.role === 'farmer' ? 'adding products' : 'browsing products'} to see activity here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
