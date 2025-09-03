import React from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import img1 from '../../assets/home/harvesting.jpg'
import img2 from '../../assets/home/about.webp'

const services = [
  {
    id: 1,
    tag: 'Fertilizer',
    title: 'Harvest Concepts',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: img1,
  },
  {
    id: 2,
    tag: 'Fruits',
    title: 'Farming Products',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: img2,
  },
  {
    id: 3,
    tag: 'Fertilizer',
    title: 'Soil Fertilization',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: img1,
  },
]

const Services = () => {
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
                Our Services
              </span>
              <h2 className="text-white text-2xl md:text-4xl font-extrabold mt-3">Best Agriculture Services</h2>
            </div>

            <div className="flex items-center gap-2">
              <button aria-label="Previous" className="h-8 w-8 md:h-9 md:w-9 inline-flex items-center justify-center rounded-md bg-white/80 text-gray-900 border border-white/50 hover:bg-white transition">
                <ChevronLeft size={16} />
              </button>
              <button aria-label="Next" className="h-8 w-8 md:h-9 md:w-9 inline-flex items-center justify-center rounded-md bg-white/80 text-gray-900 border border-white/50 hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s) => (
              <div key={s.id} className="relative bg-white rounded-[24px] shadow-lg hover:shadow-xl transition-shadow p-4 md:p-5">
                <img src={s.image} alt={s.title} className="w-full aspect-[4/3] object-cover rounded-[22px]" />

                <div className="mt-4">
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8C651]" />
                    <span>{s.tag}</span>
                  </div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
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
