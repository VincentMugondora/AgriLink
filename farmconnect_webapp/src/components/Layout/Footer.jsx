import React from 'react'
import { Leaf, Star, Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white mt-auto">
      {/* Top promo bar */}
      <div className="bg-[#E8C651] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid gap-4 md:grid-cols-3 text-sm font-medium">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Leaf size={18} className="text-gray-900" /></span>
              <span>Fresh & organic produce from verified farmers</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Phone size={18} className="text-gray-900" /></span>
              <span>24/7 support • +1 (212) 255-511</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90"><Send size={18} className="text-gray-900" /></span>
              <span>Fast delivery & secure payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 text-gray-900"><Leaf size={18} /></span>
              <span className="signika font-bold text-xl text-gray-900">Farm Connect</span>
            </div>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Connecting farmers, traders, and buyers with a trusted marketplace, logistics,
              and advisory—built for sustainable agriculture.
            </p>
            <div className="mt-4 flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-current" />
              ))}
              <span className="ml-2 text-sm text-gray-600">4.9/5 • Based on 1,200+ reviews</span>
            </div>
            <div className="mt-5 flex items-center gap-3 text-gray-700">
              <a aria-label="Facebook" href="#" className="hover:text-gray-900"><Facebook size={18} /></a>
              <a aria-label="Twitter" href="#" className="hover:text-gray-900"><Twitter size={18} /></a>
              <a aria-label="Instagram" href="#" className="hover:text-gray-900"><Instagram size={18} /></a>
              <a aria-label="YouTube" href="#" className="hover:text-gray-900"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/" className="hover:text-gray-900">Home</a></li>
              <li><a href="/about" className="hover:text-gray-900">About Us</a></li>
              <li><a href="/products" className="hover:text-gray-900">Marketplace</a></li>
              <li><a href="/#services" className="hover:text-gray-900">Services</a></li>
              <li><a href="/#contact" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Working Hours</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Clock size={16} /> Mon - Fri: 08:00 - 18:00</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Saturday: 09:00 - 15:30</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Sunday: Closed</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> 123 Greenway, Harare, Zimbabwe</li>
              <li className="flex items-center gap-2"><Mail size={16} /> support@farmconnect.com</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +263 123 456 789</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div>© {year} Farm Connect. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="hover:text-gray-900">Terms & Conditions</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="hover:text-gray-900">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
