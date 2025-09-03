import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Leaf, Users, TrendingUp, Shield } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            🌾 Welcome to Farm Connect
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Connecting farmers, traders, and buyers for better agricultural commerce.
            Join our platform to buy and sell fresh produce directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link 
                  to="/register" 
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  to="/products" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
                >
                  Browse Products
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  to="/products" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
                >
                  Browse Products
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Farm Connect?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fresh Produce</h3>
              <p className="text-gray-600 leading-relaxed">
                Direct from farm to table. Get the freshest produce with complete traceability
                and quality assurance from verified farmers.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Trusted Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a verified community of farmers, traders, and buyers. Build lasting
                relationships and grow your agricultural business.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fair Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Transparent pricing with real-time market rates. Farmers get fair prices
                and buyers get competitive deals.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Transactions</h3>
              <p className="text-gray-600 leading-relaxed">
                Safe and secure payment processing with escrow protection. Your money
                is protected until delivery is confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Register & Verify</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up as a farmer, trader, or buyer. Complete KYC verification
                to join our trusted community.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">List or Browse</h3>
              <p className="text-gray-600 leading-relaxed">
                Farmers list their produce with photos and details.
                Buyers browse and find exactly what they need.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Trade & Deliver</h3>
              <p className="text-gray-600 leading-relaxed">
                Place orders, make secure payments, and arrange delivery.
                Track your orders from farm to doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of farmers, traders, and buyers already using Farm Connect
          </p>
          {!user && (
            <Link 
              to="/register" 
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors inline-block"
            >
              Join Farm Connect Today
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
