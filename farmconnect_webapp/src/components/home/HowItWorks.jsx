import React from 'react'

const HowItWorks = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">How Farm Connect Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Register & Verify</h3>
          <p className="text-gray-600 leading-relaxed">Sign up on Farm Connect as a farmer, trader, or buyer. Complete KYC verification to join our trusted community.</p>
        </div>
        <div className="text-center">
          <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">List or Browse</h3>
          <p className="text-gray-600 leading-relaxed">Farmers list their produce with photos and details on Farm Connect. Buyers browse the marketplace and find exactly what they need.</p>
        </div>
        <div className="text-center">
          <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Trade & Deliver</h3>
          <p className="text-gray-600 leading-relaxed">Place orders, pay securely with escrow, and arrange delivery. Track your orders from farm to doorstep on Farm Connect.</p>
        </div>
      </div>
    </div>
  </section>
)

export default HowItWorks
