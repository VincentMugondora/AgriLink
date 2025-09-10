import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CTA = ({ user }) => {
  const { t } = useTranslation()
  return (
    <section className="py-16 bg-gray-800 text-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-xl mb-8 text-gray-300">{t('cta.subtitle')}</p>
        {!user && (
          <Link to="/register" className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors inline-block">
            {t('cta.join')}
          </Link>
        )}
      </div>
    </section>
  )
}

export default CTA
