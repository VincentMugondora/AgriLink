import React from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Tariro M.',
    role: 'Smallholder Farmer',
    quote: 'Farm Connect has doubled my sales by connecting me to reliable buyers in my area.',
    rating: 5,
  },
  {
    name: 'Kudzai N.',
    role: 'Fresh Produce Trader',
    quote: 'The platform makes sourcing consistent quality produce easy and efficient.',
    rating: 5,
  },
  {
    name: 'Chipo K.',
    role: 'Restaurant Owner',
    quote: 'We now get fresh vegetables delivered on time, every time — at great prices.',
    rating: 4,
  },
]

const TestimonialCard = ({ t }) => (
  <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
    <div className="flex items-center gap-1 mb-3 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className={i < t.rating ? 'fill-current' : 'text-gray-300'} />
      ))}
    </div>
    <p className="text-gray-700 mb-4">“{t.quote}”</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
        {t.name.charAt(0)}
      </div>
      <div>
        <div className="font-medium text-gray-900">{t.name}</div>
        <div className="text-sm text-gray-500">{t.role}</div>
      </div>
    </div>
  </div>
)

const Testimonials = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">What our users say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} t={t} />
        ))}
      </div>
    </div>
  </section>
)

export default Testimonials
