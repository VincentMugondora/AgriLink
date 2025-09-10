import React from 'react'
import { Users, ShoppingCart, Truck, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const StatsBar = () => {
  const { t } = useTranslation()
  const items = [
    { icon: Users, label: t('stats.verifiedFarmers'), value: '5k+' },
    { icon: ShoppingCart, label: t('stats.ordersCompleted'), value: '45k+' },
    { icon: Truck, label: t('stats.onTimeDeliveries'), value: '9k+' },
    { icon: Star, label: t('stats.avgRating'), value: '4.8/5' },
  ]
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar
