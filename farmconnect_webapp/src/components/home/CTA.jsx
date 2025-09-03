import React from 'react'
import { Link } from 'react-router-dom'

const CTA = ({ user }) => (
  <section className="py-16 bg-gray-800 text-white text-center">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-xl mb-8 text-gray-300">Join thousands of farmers, traders, and buyers already using Farm Connect</p>
      {!user && (
        <Link to="/register" className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors inline-block">
          Join Farm Connect Today
        </Link>
      )}
    </div>
  </section>
)

export default CTA
