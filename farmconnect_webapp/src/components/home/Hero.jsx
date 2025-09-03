import React from 'react'
import { Link } from 'react-router-dom'

const Hero = ({ user }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-700 text-white">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute -left-1/4 top-0 w-[600px] h-[600px] rounded-full bg-white blur-3xl" />
      <div className="absolute -right-1/4 bottom-0 w-[600px] h-[600px] rounded-full bg-white blur-3xl" />
    </div>
    <div className="max-w-7xl mx-auto px-4 py-20 text-center relative">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Farm Connect</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
        Connecting farmers, traders, and buyers for better agricultural commerce.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {!user ? (
          <>
            <Link to="/register" className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors">
              Get Started
            </Link>
            <Link to="/products" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-colors">
              Browse Products
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors">
              Go to Dashboard
            </Link>
            <Link to="/products" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-700 transition-colors">
              Browse Products
            </Link>
          </>
        )}
      </div>
    </div>
  </section>
)

export default Hero
