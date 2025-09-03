import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'

import SERVICES from '../data/services'
import heroImg from '../assets/home/about.webp'

const NumberItem = ({ n, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="h-10 w-10 shrink-0 rounded-lg bg-[#E8C651] text-gray-900 flex items-center justify-center font-extrabold signika">
      {String(n).padStart(2, '0')}
    </div>
    <div>
      <div className="font-semibold text-gray-900">{title}</div>
      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
)

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2 text-gray-700">
    <CheckCircle2 size={18} className="text-[#5F8F52] mt-0.5" />
    <span>{children}</span>
  </li>
)

const AccordionItem = ({ idx, title, body, open, onToggle }) => (
  <div className="border-b border-gray-200">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-3 text-left">
      <span className={`font-medium ${open ? 'text-gray-900' : 'text-gray-700'}`}>{String(idx).padStart(2,'0')}. {title}</span>
      <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={18} />
    </button>
    {open && <div className="pb-4 text-sm text-gray-600 leading-relaxed">{body}</div>}
  </div>
)

const ServiceDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const service = useMemo(() => SERVICES.find(s => s.slug === slug), [slug])

  if (!service) {
    navigate('/services', { replace: true })
    return null
  }

  const [openIdx, setOpenIdx] = useState(1)

  return (
    <div className="pb-16">
      {/* Hero banner */}
      <section className="pt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[28px] min-h-[260px] md:min-h-[340px]">
            <img src={heroImg} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />

            <div className="relative z-10 p-6 md:p-10 lg:p-12 flex h-full flex-col justify-end gap-3">
              <div className="inline-flex items-center gap-2 bg-white/90 text-gray-800 border border-white/60 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide w-fit">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-300" />
                Service
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{service.title}</h1>
              <div className="mt-1 flex items-center gap-2 text-white/85 text-sm">
                <Link to="/" className="hover:underline">Home</Link>
                <ChevronRight size={16} />
                <Link to="/services" className="hover:underline">Services</Link>
                <ChevronRight size={16} />
                <span className="hover:underline">{service.tag}</span>
                <ChevronRight size={16} />
                <span className="font-medium">{service.title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Our Service</h3>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services/${s.slug}`} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 ${s.slug === service.slug ? 'border-[#E8C651] bg-yellow-50' : 'border-gray-200'}`}>
                      <span className="truncate">{s.title}</span>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E8C651] text-gray-900">
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="rounded-xl bg-gradient-to-br from-[#5F8F52] to-[#4b7841] text-white p-5 text-center">
                <div className="text-[13px] uppercase tracking-wide opacity-90">Innovative Solutions</div>
                <div className="mt-1 font-semibold">for agriculture</div>
                <p className="mt-2 text-white/90 text-sm">Discover how we combine advisory, inputs and logistics to deliver end-to-end outcomes.</p>
                <a href="#contact" className="inline-flex items-center justify-center mt-4 px-4 py-2 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-yellow-50">Contact Us Now</a>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">Company Profile</h3>
              <div className="mt-3 grid gap-2">
                <a href="#" className="inline-flex items-center justify-between rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
                  <span>Download .PDF file</span>
                  <ArrowRight size={16} />
                </a>
                <a href="#" className="inline-flex items-center justify-between rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
                  <span>Download .DOC file</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </aside>

          {/* Main area */}
          <div className="lg:col-span-2 space-y-8">
            <img src={service.image} alt={service.title} className="w-full rounded-2xl border border-gray-100 object-cover" />

            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Why Choose Our Services</h3>
              <p className="mt-2 text-gray-600">We focus on friendly, modern and sustainable techniques, backed by data and expert agronomists to deliver measurable outcomes to farms and agribusinesses.</p>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <NumberItem n={1} title="Schedule Your Experience" desc="Complete end-to-end project planning tailored to farm needs." />
                <NumberItem n={2} title="Get Professional Advice" desc="Certified agronomists with local knowledge and seasonality in mind." />
                <NumberItem n={3} title="Meet Our Expert People" desc="Trusted field teams and partners across growing regions." />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Modern Technique Work Points</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <Bullet>Make ridge deep ploughing program at the first level.</Bullet>
                  <Bullet>Healthy cover of soil with an A-prospect to excellent.</Bullet>
                  <Bullet>Keep soil covered and use best of nutrients through layers.</Bullet>
                  <Bullet>Raise the earth dam; water to benefit plants.</Bullet>
                </ul>
                <ul className="space-y-2">
                  <Bullet>Bring in drought, heat, speciality and experience to market.</Bullet>
                  <Bullet>Dedicated & sustainable services; ongoing integrity.</Bullet>
                  <Bullet>Deliver clear and consistent farming guidance.</Bullet>
                  <Bullet>Orcharding dreams through exceptional agriculture.</Bullet>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">Frequently asked questions</h3>
              <div className="mt-3 rounded-xl border border-gray-200 bg-white">
                {[1,2,3].map((i) => (
                  <AccordionItem
                    key={i}
                    idx={i}
                    title={i === 1 ? 'What is agricultural biotechnology?' : i === 2 ? 'Can the pesticide be applied during rainy season?' : 'What vegetables can I grow in my greenhouse?'}
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis autem vel eum iusto aut, quia consequuntur magni dolores."
                    open={openIdx === i}
                    onToggle={() => setOpenIdx(openIdx === i ? 0 : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer yellow band */}
      <section className="bg-[#E8C651] text-gray-900">
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
      </section>
    </div>
  )
}

export default ServiceDetail
