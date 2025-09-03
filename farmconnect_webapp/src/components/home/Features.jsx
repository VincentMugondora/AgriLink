import React from 'react'
import { Leaf, Users, TrendingUp, Shield } from 'lucide-react'

const Features = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Farm Connect?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Fresh Produce</h3>
          <p className="text-gray-600 leading-relaxed">Direct from farm to table. Get the freshest produce with complete traceability and quality assurance from verified farmers.</p>
        </div>
        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Trusted Community</h3>
          <p className="text-gray-600 leading-relaxed">Join a verified community of farmers, traders, and buyers. Build lasting relationships and grow your agricultural business.</p>
        </div>
        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={32} className="text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Fair Pricing</h3>
          <p className="text-gray-600 leading-relaxed">Transparent pricing with real-time market rates. Farmers get fair prices and buyers get competitive deals.</p>
        </div>
        <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
          <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Transactions</h3>
          <p className="text-gray-600 leading-relaxed">Safe and secure payment processing with escrow protection. Your money is protected until delivery is confirmed.</p>
        </div>
      </div>
    </div>
  </section>
)

export default Features
