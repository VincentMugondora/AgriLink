import React from 'react'
import { useTranslation } from 'react-i18next'

const partners = ['AgriBank', 'GreenCo', 'Farmers Union', 'AgriTech', 'FreshMart', 'Harvest Logistics']

const Partners = () => {
  const { t } = useTranslation()
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-gray-500 uppercase tracking-wider text-sm mb-6">{t('partners.heading')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {partners.map((name) => (
            <div key={name} className="h-12 bg-white border border-gray-100 rounded-md shadow-sm flex items-center justify-center text-gray-500 font-medium">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
