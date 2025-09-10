import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Package, ShoppingCart, TrendingUp, Users, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

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
        return t('dashboard.greeting.farmer')
      case 'trader':
        return t('dashboard.greeting.trader')
      case 'buyer':
        return t('dashboard.greeting.buyer')
      default:
        return t('dashboard.greeting.default')
    }
  }

  const getRoleBasedActions = () => {
    switch (user?.role) {
      case 'farmer':
        return [
          { title: t('dashboard.actions.addProduct'), icon: Plus, link: '/products/new', color: 'bg-green-500' },
          { title: t('dashboard.actions.myProducts'), icon: Package, link: '/products/my', color: 'bg-blue-500' },
          { title: t('dashboard.actions.salesOrders'), icon: ShoppingCart, link: '/orders?type=sales', color: 'bg-yellow-500' },
          { title: t('dashboard.actions.analytics'), icon: TrendingUp, link: '/analytics', color: 'bg-purple-500' }
        ]
      case 'trader':
        return [
          { title: t('dashboard.actions.browseProducts'), icon: Package, link: '/products', color: 'bg-green-500' },
          { title: t('dashboard.actions.myInventory'), icon: Package, link: '/inventory', color: 'bg-blue-500' },
          { title: t('dashboard.actions.purchaseOrders'), icon: ShoppingCart, link: '/orders?type=purchases', color: 'bg-yellow-500' },
          { title: t('dashboard.actions.salesAnalytics'), icon: TrendingUp, link: '/analytics', color: 'bg-purple-500' }
        ]
      case 'buyer':
        return [
          { title: t('dashboard.actions.browseProducts'), icon: Package, link: '/products', color: 'bg-green-500' },
          { title: t('dashboard.actions.myOrders'), icon: ShoppingCart, link: '/orders', color: 'bg-blue-500' },
          { title: t('dashboard.actions.favorites'), icon: Users, link: '/favorites', color: 'bg-yellow-500' },
          { title: t('dashboard.actions.orderHistory'), icon: TrendingUp, link: '/orders/history', color: 'bg-purple-500' }
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
            {t('dashboard.welcome', { name: user?.firstName || '' })}
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
                <p className="text-green-100 mb-1">{t('dashboard.stats.totalProducts')}</p>
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
                <p className="text-blue-100 mb-1">{t('dashboard.stats.activeOrders')}</p>
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
                <p className="text-yellow-100 mb-1">{t('dashboard.stats.thisMonth')}</p>
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
                <p className="text-purple-100 mb-1">{t('dashboard.stats.connections')}</p>
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
            {t('dashboard.quickActions')}
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
            {t('dashboard.recentActivity')}
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">{t('dashboard.noActivity')}</p>
            <p>
              {t('dashboard.startBy', { action: user?.role === 'farmer' ? t('dashboard.startActions.addProducts') : t('dashboard.startActions.browseProducts') })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
