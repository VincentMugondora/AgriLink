import React, { useMemo, useState } from 'react'
import { ChevronRight, ArrowUpRight, Search } from 'lucide-react'

// Assets
import heroImg from '../assets/home/about.webp'
import imgMarket from '../assets/home/market_place.jpg'
import imgDelivery from '../assets/home/delivery.jpg'
import imgInputs from '../assets/home/inputs.jpg'
import imgAdvisory from '../assets/home/advisory.jpg'
import imgDiagnostics from '../assets/home/diagnostics.jpg'
import imgHarvest from '../assets/home/harvesting.jpg'

const SERVICES = [
  {
    id: 1,
    tag: 'Fertilizer',
    title: 'Harvest Concepts',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgHarvest,
  },
  {
    id: 2,
    tag: 'Fruits',
    title: 'Farming Products',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgInputs,
  },
  {
    id: 3,
    tag: 'Fertilizer',
    title: 'Soil Fertilization',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgDelivery,
  },
  {
    id: 4,
    tag: 'Fruits',
    title: 'Fresh Vegetables',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgAdvisory,
  },
  {
    id: 5,
    tag: 'Farming',
    title: 'Dairy Production',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgDiagnostics,
  },
  {
    id: 6,
    tag: 'Vegetables',
    title: 'Product Supplies',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgMarket,
  },
  {
    id: 7,
    tag: 'Fruits',
    title: 'Natural Carrots',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgMarket,
  },
  {
    id: 8,
    tag: 'Vegetables',
    title: 'Nutrition Solutions',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgInputs,
  },
  {
    id: 9,
    tag: 'Fruits, Vegetables',
    title: 'Organic Vegetables',
    desc: 'Farming and animal husbandry and discuss with farmers and scientists.',
    image: imgAdvisory,
  },
]

const ServiceCard = ({ s }) => (
  <div className="relative bg-white rounded-[22px] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
    <div className="p-4">
      <div className="relative">
        <img src={s.image} alt={s.title} className="w-full aspect-[4/3] object-cover rounded-[18px]" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-white/90 text-gray-700 border border-white/60 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8C651]" />
          {s.tag}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
      </div>
    </div>

    <button
      aria-label="Open"
      className="absolute -bottom-4 right-6 h-10 w-10 rounded-full bg-[#E8C651] text-gray-900 shadow-md flex items-center justify-center hover:brightness-95"
    >
      <ArrowUpRight size={18} />
    </button>
  </div>
)

const ServicesPage = () => {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SERVICES
    return SERVICES.filter(s => (
      s.title.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q)
    ))
  }, [query])

  return (
    <div className="pb-16">
      {/* Hero banner */}
      <section className="pt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[28px] min-h-[260px] md:min-h-[340px]">
            <img src={heroImg} alt="Greenhouse tomatoes" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />

            <div className="relative z-10 p-6 md:p-10 lg:p-12 flex h-full flex-col justify-end gap-4">
              {/* Search bar */}
              <div className="w-full max-w-xs">
                <div className="flex items-center gap-2 rounded-full bg-white/95 border border-white/60 px-3 py-2 shadow-sm">
                  <Search size={16} className="text-gray-500" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Services"
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Services</h1>
                <div className="mt-2 flex items-center gap-2 text-white/85 text-sm">
                  <a href="/" className="hover:underline">Home</a>
                  <ChevronRight size={16} />
                  <span className="font-medium">Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <ServiceCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer yellow band */}
      {/* <section className="bg-[#E8C651] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-medium">
            <div className="flex items-center gap-3">
              <span>Farmers</span>
              <span>•</span>
              <span>Organic</span>
              <span>•</span>
              <span>Fruits</span>
              <span>•</span>
              <span>Product</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+1212255511" className="hover:underline">+1 (212) 255-511</a>
              <a href="mailto:hello@farmconnect.com" className="hover:underline">hello@farmconnect.com</a>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default ServicesPage
