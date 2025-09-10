import React from 'react'
import { Leaf, Star, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const year = new Date().getFullYear()
  const { t } = useTranslation()
  return (
    <footer className="bg-white mt-auto">
      {/* Top promo bar */}
      <div className="bg-[#E8C651] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid gap-4 md:grid-cols-3 text-sm font-medium">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Leaf size={18} className="text-gray-900" /></span>
              <span>{t('footer.promo1')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Phone size={18} className="text-gray-900" /></span>
              <span>{t('footer.promo2')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Send size={18} className="text-gray-900" /></span>
              <span>{t('footer.promo3')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 text-gray-900"><Leaf size={18} /></span>
              <span className="signika font-bold text-xl text-gray-900">{t('nav.brand')}</span>
            </div>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t('homeAbout.desc')}
            </p>
            <div className="mt-4 flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-current" />
              ))}
              <span className="ml-2 text-sm text-gray-600">4.9/5 • Based on 1,200+ reviews</span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-gray-700">
              {['FB', 'TW', 'IG', 'YT'].map((tkn) => (
                <a key={tkn} href="#" aria-label={tkn} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 hover:text-gray-900 transition">
                  <span className="text-[11px] font-semibold">{tkn}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/" className="hover:text-gray-900">{t('footer.links.home')}</a></li>
              <li><a href="/about" className="hover:text-gray-900">{t('footer.links.about')}</a></li>
              <li><a href="/products" className="hover:text-gray-900">{t('footer.links.marketplace')}</a></li>
              <li><a href="/services" className="hover:text-gray-900">{t('footer.links.services')}</a></li>
              <li><a href="/#contact" className="hover:text-gray-900">{t('footer.links.contact')}</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.workingHours')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Clock size={16} /> {t('footer.hours.monFri')}</li>
              <li className="flex items-center gap-2"><Clock size={16} /> {t('footer.hours.sat')}</li>
              <li className="flex items-center gap-2"><Clock size={16} /> {t('footer.hours.sun')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> {t('footer.address')}</li>
              <li className="flex items-center gap-2"><Mail size={16} /> {t('footer.email')}</li>
              <li className="flex items-center gap-2"><Phone size={16} /> {t('footer.phone')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div> {year} {t('nav.brand')}. {t('footer.rightsReserved')}</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-900">{t('footer.privacy')}</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="hover:text-gray-900">{t('footer.terms')}</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="hover:text-gray-900">{t('footer.cookies')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
