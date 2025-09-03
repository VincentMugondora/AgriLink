import React from 'react'
import { ChevronRight, CheckCircle, Leaf } from 'lucide-react'

// Assets
import heroImg from '../assets/home/about.webp'
import devImg from '../assets/home/harvesting.jpg'
import ctaBg from '../assets/home/inputs.jpg'

// Reused sections
import AboutSection from '../components/home/About'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'

const Stat = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl font-extrabold text-gray-900 signika">{value}</div>
    <div className="mt-1 text-gray-600">{label}</div>
  </div>
)

const Step = ({ idx, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="h-10 w-10 shrink-0 rounded-lg bg-white/90 text-gray-900 flex items-center justify-center font-bold">
      {String(idx).padStart(2, '0')}
    </div>
    <div>
      <div className="font-semibold text-white">{title}</div>
      <p className="text-sm text-white/90 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
)

const About = () => {
  return (
    <div className="pb-16">
      {/* Hero banner */}
      <section className="pt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[28px] min-h-[260px] md:min-h-[340px]">
            <img src={heroImg} alt="Greenhouse tomatoes" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />

            <div className="relative z-10 p-6 md:p-10 lg:p-12 flex h-full flex-col justify-end">
              <div className="inline-flex items-center gap-2 bg-white/90 text-gray-800 border border-white/60 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide w-fit">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-300" />
                About Us
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight">About Us</h1>
              <div className="mt-2 flex items-center gap-2 text-white/85 text-sm">
                <a href="/" className="hover:underline">Home</a>
                <ChevronRight size={16} />
                <span className="font-medium">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are + marquee (reused component) */}
      <AboutSection />

      {/* Services (green carousel block) */}
      <section className="pt-6">
        <Services />
      </section>

      {/* Development/Steps section (green split) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[28px] bg-[#5F8F52]">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left image + copy */}
              <div className="relative">
                <img src={devImg} alt="Farmers in the field" className="h-full w-full object-cover md:rounded-l-[28px] rounded-t-[28px] md:rounded-t-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5F8F52]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-white/95 text-gray-800 border border-white/60 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide">
                    <Leaf size={14} className="text-[#5F8F52]" />
                    Future of Development
                  </div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white leading-tight max-w-xl">
                    Agriculture matters to the future of development
                  </h3>
                </div>
              </div>

              {/* Right steps */}
              <div className="p-6 md:p-10 lg:p-12">
                <div className="grid gap-6">
                  <Step idx={1} title="Plan production" desc="We help farmers plan crops using weather, soil and demand data to maximize yield and profits." />
                  <Step idx={2} title="Grow sustainably" desc="Guidance, inputs and advisory services ensure sustainable and resilient farming practices." />
                  <Step idx={3} title="Deliver on time" desc="Integrated logistics and marketplace tools connect produce to buyers quickly and reliably." />
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {[
                    'Soil-friendly practices',
                    'Cold-chain options',
                    'Verified farmer network',
                    'Secure payments',
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/95">
                      <CheckCircle size={18} className="text-yellow-300" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-14 bg-[#FBFBF7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat value="1.3K+" label="Verified Farmers" />
            <Stat value="6.4K+" label="Successful Deliveries" />
            <Stat value="2.8K+" label="Active Buyers" />
            <Stat value="4.0K+" label="Monthly Listings" />
          </div>
        </div>
      </section>

      {/* Popular Leader CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[24px]">
            <img src={ctaBg} alt="Wheat field" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#5F8F52]/40 mix-blend-multiply" />
            <div className="relative z-10 p-8 md:p-12 flex items-center justify-between gap-6">
              <div className="inline-flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-yellow-300 text-gray-900 signika text-2xl md:text-3xl font-extrabold shadow">
                125
              </div>
              <div className="text-white">
                <div className="inline-block bg-white/90 text-gray-800 px-3 py-1 rounded-full text-[10px] md:text-xs uppercase tracking-wide border border-white/60">Achievement</div>
                <h3 className="mt-3 text-2xl md:text-3xl font-extrabold leading-tight">We’re popular leaders in agriculture market globally</h3>
              </div>
              <a href="#contact" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-yellow-50 transition">
                Read More
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-32">
        <Testimonials title="What our customers say" />
      </section>
    </div>
  )
}

export default About
