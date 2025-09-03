import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-400 mb-4">🌾 Farm Connect</h3>
            <p className="text-gray-300 leading-relaxed">
              Connecting farmers, traders, and buyers for better agricultural commerce.
              Building sustainable food systems through technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Browse Products
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-300 hover:text-green-400 transition-colors">
                  Join as Farmer
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-300 hover:text-green-400 transition-colors">
                  Join as Buyer
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: support@farmconnect.com</li>
              <li className="text-gray-300">Phone: +263 123 456 789</li>
              <li className="text-gray-300">WhatsApp: +263 123 456 789</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 mt-8 text-center text-gray-400">
          <p>&copy; 2024 Farm Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
