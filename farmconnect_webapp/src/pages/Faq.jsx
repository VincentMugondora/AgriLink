import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

// Use the same hero styling as About/Contact for consistency
const Hero = () => (
  <section className="pt-2">
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-[28px] min-h-[260px] md:min-h-[340px]">
        <img src="/imgs/contact.jpg" alt="FAQ hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/10" />
        <div className="relative z-10 p-6 md:p-10 lg:p-12 flex h-full flex-col justify-end">
          <div className="inline-flex items-center gap-2 bg-white/90 text-gray-800 border border-white/60 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide w-fit">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-300" />
            FAQ
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white leading-tight">Faq</h1>
          <div className="mt-2 flex items-center gap-2 text-white/85 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <ChevronRight size={16} />
            <span className="font-medium">Faq</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Item = ({ idx, title, active, onToggle }) => (
  <button onClick={onToggle} className={`w-full text-left rounded-xl border transition-all ${active ? 'bg-[#5F8F52] text-white border-[#5F8F52]' : 'bg-white text-gray-900 border-gray-200'} px-4 py-3 flex items-center justify-between`}> 
    <span className="text-sm md:text-base font-semibold">
      <span className={`inline-flex items-center justify-center h-6 w-8 mr-2 rounded-md text-xs font-bold ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>{String(idx).padStart(2,'0')}</span>
      {title}
    </span>
    <ChevronDown size={18} className={`transition-transform ${active ? 'rotate-180' : ''}`} />
  </button>
)

const Panel = ({ children, open }) => (
  <div className={`overflow-hidden transition-[grid-template-rows] grid ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-300`}>
    <div className="min-h-0">
      <div className="px-4 pb-4 text-sm text-gray-600 bg-white/70 rounded-b-xl">
        {children}
      </div>
    </div>
  </div>
)

const ColumnFaq = ({ title, tag, items }) => {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div>
      <div className="inline-flex items-center gap-2 bg-white/90 text-gray-800 border border-white/60 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide w-fit mb-3">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-300" />
        {tag}
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">{title}</h2>
      <div className="space-y-3">
        {items.map((q, i) => (
          <div key={i} className="rounded-xl">
            <Item idx={i+1} title={q.title} active={openIdx===i} onToggle={() => setOpenIdx(openIdx===i ? -1 : i)} />
            <Panel open={openIdx===i}>
              <p>
                {q.desc}
              </p>
            </Panel>
          </div>
        ))}
      </div>
    </div>
  )
}

// Bottom section accordion: first item expanded and green like screenshot
const HappyFaq = ({ items }) => {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div className="space-y-3">
      {items.map((q, i) => (
        <div key={i} className={`rounded-xl overflow-hidden border ${openIdx===i ? 'border-[#5F8F52] bg-[#5F8F52]' : 'border-gray-200 bg-white'}`}>
          <div className={openIdx===i ? 'text-white' : ''}>
            <button onClick={() => setOpenIdx(openIdx===i ? -1 : i)} className={`w-full text-left px-4 py-3 flex items-center justify-between`}>
              <span className={`text-sm md:text-base font-semibold`}>
                <span className={`inline-flex items-center justify-center h-6 w-8 mr-2 rounded-md text-xs font-bold ${openIdx===i ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>{String(i+1).padStart(2,'0')}</span>
                {q.title}
              </span>
              <ChevronDown size={18} className={`transition-transform ${openIdx===i ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className={`overflow-hidden transition-[grid-template-rows] grid ${openIdx===i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-300`}> 
            <div className="min-h-0">
              <div className={`px-4 pb-4 text-sm ${openIdx===i ? 'text-white/90' : 'text-gray-600'} ${openIdx===i ? '' : 'bg-white/70'} rounded-b-xl`}>
                {q.desc}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Faq = () => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'

  const general = [
    { title: 'What is Agricultural Biotechnology?', desc: lorem },
    { title: 'Can the products be applied during rainy season?', desc: lorem },
    { title: 'What vegetables can I grow in my greenhouse?', desc: lorem },
  ]

  const other = [
    { title: 'What is modern agriculture?', desc: lorem },
    { title: 'What are the 2 main types of farming?', desc: lorem },
    { title: 'What are the different types of greenhouse?', desc: lorem },
  ]

  const happy = [
    { title: 'What are the ideal temperature and humidity conditions for strawberry farming?', desc: lorem },
    { title: 'What are the common diseases and pests that affect strawberry plants?', desc: lorem },
    { title: 'What are the government initiatives in the agriculture sector?', desc: lorem },
    { title: 'How can we adapt agriculture to the impacts of climate change?', desc: lorem },
    { title: 'What can be done to reduce greenhouse gas emissions from agriculture?', desc: lorem },
  ]

  return (
    <div className="pb-16">
      <Hero />

      {/* Two columns section */}
      <section className="py-10 md:py-14 bg-[#FBFBF7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <ColumnFaq tag="Most Ask" title="General Questions" items={general} />
            <ColumnFaq tag="People Know" title="Other Questions" items={other} />
          </div>
        </div>
      </section>

      {/* Happy to answer */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">Happy to Answer All Your Questions</h2>
          <HappyFaq items={happy} />
        </div>
      </section>
    </div>
  )
}

export default Faq
