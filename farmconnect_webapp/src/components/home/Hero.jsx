import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import bgUrl from '../../assets/home/harvesting.jpg'
const Hero = ({ user }) => {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative h-[520px] md:h-[620px] rounded-3xl overflow-hidden shadow-xl bg-center bg-cover"
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/45 to-black/25" />

          {/* Optional soft vignette */}
          <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_120px_40px_rgba(0,0,0,0.35)] rounded-3xl" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full md:w-2/3 px-6 md:px-12">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white uppercase tracking-wider text-[10px] md:text-xs px-3 py-1 rounded-full mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Connecting Farmers & Buyers
              </div>

              <h1 className="text-white font-extrabold leading-tight text-4xl md:text-6xl lg:text-5xl drop-shadow-md">
                Farm-to-market, simplified.
                <br className="hidden sm:block" />
                <span className="text-white">Trade directly with verified farmers</span>
              </h1>

              <p className="mt-5 text-gray-200/90 text-base md:text-lg max-w-xl">
                Discover, buy, and sell fresh produce at fair prices. Farm Connect links
                smallholder farmers, traders, and businesses with secure payments and reliable
                delivery.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="mailto:support@farmconnect.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-6 py-3 font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Contact Us
                  <span className="relative inline-flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <ArrowRight size={16} />
                  </span>
                </a>

                {!user ? (
                  <Link
                    to="/products"
                    className="text-white/90 hover:text-white underline-offset-4"
                  >
                    Browse Marketplace
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="text-white/90 hover:text-white underline-offset-4"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
