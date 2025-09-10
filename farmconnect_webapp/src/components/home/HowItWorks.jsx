import React from 'react'
import { useTranslation } from 'react-i18next'

const HowItWorks = () => {
  const { t } = useTranslation()
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">{t('howItWorks.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.steps.one.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('howItWorks.steps.one.desc')}</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.steps.two.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('howItWorks.steps.two.desc')}</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('howItWorks.steps.three.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('howItWorks.steps.three.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
