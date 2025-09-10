import React, { useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import img1 from '../../assets/home/market_place.jpg'
import img2 from '../../assets/home/delivery.jpg'
import img3 from '../../assets/home/inputs.jpg'
import img4 from '../../assets/home/advisory.jpg'
import img5 from '../../assets/home/diagnostics.jpg'
import { useTranslation } from 'react-i18next'

const services = [
  { id: 1, key: 'marketplace', image: img1 },
  { id: 2, key: 'logistics', image: img2 },
  { id: 3, key: 'inputs', image: img3 },
  { id: 4, key: 'advisory', image: img4 },
  { id: 5, key: 'aiDiagnostics', image: img5 },
]

const Services = () => {
  const { t } = useTranslation()
  const trackRef = useRef(null)
  const slides = [...services, ...services, ...services]

  const scrollByCards = (dir) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).gap || '0') || 0
    const cardWidth = first ? first.getBoundingClientRect().width : Math.round(el.clientWidth * 0.85)
    const step = Math.round(cardWidth + gap)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Center to the middle copy on mount
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const centerToMiddle = () => {
      const first = el.firstElementChild
      if (!first) return
      const gap = parseFloat(getComputedStyle(el).gap || '0') || 0
      const cardWidth = first.getBoundingClientRect().width
      if (!cardWidth) {
        requestAnimationFrame(centerToMiddle)
        return
      }
      const step = Math.round(cardWidth + gap)
      el.scrollTo({ left: services.length * step, behavior: 'auto' })
    }
    centerToMiddle()
  }, [])

  // Keep illusion of infinity by jumping from clones back to middle set
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const first = el.firstElementChild
        if (!first) {
          ticking = false
          return
        }
        const gap = parseFloat(getComputedStyle(el).gap || '0') || 0
        const step = Math.round(first.getBoundingClientRect().width + gap)
        if (!step) {
          ticking = false
          return
        }
        const index = Math.round(el.scrollLeft / step)
        const n = services.length
        if (index < n) {
          // jumped to first clone set -> move to middle
          el.scrollTo({ left: (index + n) * step, behavior: 'auto' })
        } else if (index >= 2 * n) {
          // jumped to last clone set -> move to middle
          el.scrollTo({ left: (index - n) * step, behavior: 'auto' })
        }
        ticking = false
      })
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Autoplay every 10 seconds
  useEffect(() => {
    const id = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const first = el.firstElementChild
      if (!first) return
      const gap = parseFloat(getComputedStyle(el).gap || '0') || 0
      const step = Math.round(first.getBoundingClientRect().width + gap)
      el.scrollBy({ left: step, behavior: 'smooth' })
    }, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl bg-[#5F8F52] p-6 md:p-10 overflow-hidden">
          {/* Decorative leaf pattern at bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 leaf-pattern" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/90 text-gray-800 border border-white/40 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5F8F52]" />
                {t('homeServices.pill')}
              </span>
              <h2 className="text-white text-2xl md:text-4xl font-extrabold mt-3">{t('homeServices.title')}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => scrollByCards(-1)} aria-label="Previous" className="h-8 w-8 md:h-9 md:w-9 inline-flex items-center justify-center rounded-md bg-white/80 text-gray-900 border border-white/50 hover:bg-white transition">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scrollByCards(1)} aria-label="Next" className="h-8 w-8 md:h-9 md:w-9 inline-flex items-center justify-center rounded-md bg-white/80 text-gray-900 border border-white/50 hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div
            ref={trackRef}
            id="services-track"
            className="mt-8 md:mt-10 flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2"
          >
            {slides.map((s, i) => (
              <div key={`${s.id}-${i}`} className="relative bg-white rounded-[24px] shadow-lg hover:shadow-xl transition-shadow p-4 md:p-5 shrink-0 snap-start basis-[85%] sm:basis-[60%] lg:basis-[32%]">
                <img src={s.image} alt={t(`homeServices.items.${s.key}.title`)} className="w-full aspect-[4/3] object-cover rounded-[22px]" />

                <div className="mt-4">
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8C651]" />
                    <span>{t(`homeServices.items.${s.key}.tag`)}</span>
                  </div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold text-gray-900">{t(`homeServices.items.${s.key}.title`)}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{t(`homeServices.items.${s.key}.desc`)}</p>
                </div>

                {/* Yellow FAB */}
                <button
                  aria-label="Open"
                  className="absolute -bottom-4 right-6 h-10 w-10 rounded-full bg-[#E8C651] text-gray-900 shadow-md flex items-center justify-center hover:brightness-95"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
