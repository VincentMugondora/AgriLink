import React from 'react'
import { Mail, PhoneCall, MapPin, ArrowRight, ChevronRight } from 'lucide-react'
import heroImg from '/imgs/contact.jpg'
import leftImg from '../assets/home/advisory.jpg'
import { useTranslation } from 'react-i18next'

const InfoCard = ({ icon: Icon, title, subtitle, children }) => (
  <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
        <Icon size={22} />
      </div>
      <div>
        <div className="text-sm text-gray-500">{subtitle}</div>
        <div className="text-lg font-semibold text-gray-900">{title}</div>
      </div>
    </div>
    <div className="mt-4 text-gray-700">
      {children}
    </div>
    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:gap-3 transition-all cursor-pointer">
      <span>More info</span>
      <ArrowRight size={16} />
    </div>
  </div>
)

const Contact = () => {
  const { t } = useTranslation()
  return (
    <div className="pb-16">
      {/* Hero (aligned with About hero) */}
      <section className="pt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[28px] min-h-[260px] md:min-h-[340px]">
            <img src={heroImg} alt="Contact hero" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />

            <div className="relative z-10 p-6 md:p-10 lg:p-12 flex h-full flex-col justify-end">
              <div className="inline-flex items-center gap-2 bg-white/90 text-gray-800 border border-white/60 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide w-fit">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-300" />
                {t('contact.badge')}
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight">{t('contact.title')}</h1>
              <div className="mt-2 flex items-center gap-2 text-white/85 text-sm">
                <a href="/" className="hover:underline">{t('breadcrumbs.home')}</a>
                <ChevronRight size={16} />
                <span className="font-medium">{t('contact.title')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-10 md:py-14 bg-[#fbfbf6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InfoCard icon={Mail} title={t('contact.cards.email.title')} subtitle={t('contact.cards.email.subtitle')}>
              <div className="space-y-1">
                <div>{t('contact.cards.email.line1')}</div>
                <div>{t('contact.cards.email.line2')}</div>
              </div>
            </InfoCard>
            <InfoCard icon={PhoneCall} title={t('contact.cards.phone.title')} subtitle={t('contact.cards.phone.subtitle')}>
              <div className="space-y-1">
                <div>{t('contact.cards.phone.line1')}</div>
                <div>{t('contact.cards.phone.line2')}</div>
              </div>
            </InfoCard>
            <InfoCard icon={MapPin} title={t('contact.cards.address.title')} subtitle={t('contact.cards.address.subtitle')}>
              <div className="space-y-1">
                <div>{t('contact.cards.address.line1')}</div>
                <div>{t('contact.cards.address.line2')}</div>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Split: image + form */}
      <section className="py-6 md:py-10 bg-[#fbfbf6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <img src={leftImg} alt="Greenhouse" className="w-full h-[360px] md:h-full object-cover" />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('contact.form.getInContact')}</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{t('contact.form.haveQuestions')}</h2>

              <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t('contact.form.yourName')}</label>
                  <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder={t('contact.form.enterName')} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t('contact.form.phoneNumber')}</label>
                  <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder={t('contact.form.enterPhone')} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t('contact.form.email')}</label>
                  <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder={t('contact.form.enterEmail')} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t('contact.form.subject')}</label>
                  <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder={t('contact.form.enterSubject')} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">{t('contact.form.message')}</label>
                  <textarea rows={5} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder={t('contact.form.enterMessage')} />
                </div>
                <div className="md:col-span-2">
                  <button type="button" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold">
                    {t('contact.form.sendMessage')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Logos bar */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center opacity-80">
            {['Rice', 'Farm', 'Fresh', 'Food', 'Eco', 'Tractor'].map((brand) => (
              <div key={brand} className="h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 font-semibold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#fbfbf6] pb-14">
        <div className="w-full h-[420px]">
          <iframe
            title={t('nav.brand') + ' Map'}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12293.155078369419!2d31.0487164!3d-17.8216283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a56b57e0cf6f%3A0x4f783a61b7f9ff1!2sHarare!5e0!3m2!1sen!2sZW!4v1699999999999!5m2!1sen!2sZW"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}

export default Contact
