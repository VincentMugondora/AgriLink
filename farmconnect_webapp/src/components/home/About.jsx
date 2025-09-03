import React from 'react'
import { Sprout, Wrench } from 'lucide-react'
import aboutImg from '../../assets/home/about.webp'

const About = () => {
  return (
    <section id="about" className="relative bg-[#F6F8EE]">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Image + stat card */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="Farm Connect farmers harvesting organic produce"
            className="w-full h-auto rounded-[28px] object-cover aspect-[4/3] shadow-md"
          />

          {/* Stat pill */}
          <div className="absolute -bottom-6 left-8 bg-yellow-300 text-gray-900 rounded-2xl shadow-lg px-6 py-5 min-w-[180px]">
            <div className="signika text-4xl md:text-5xl font-extrabold leading-none">435+</div>
            <div className="text-xs md:text-sm mt-1">Growth Tons of Harvest</div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 rounded-full px-3 py-1 text-[10px] md:text-xs uppercase tracking-wide">
            Who We Are
          </div>

          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Currently we are growing and selling organic food
          </h2>

          <p className="mt-4 text-gray-600 md:text-lg max-w-prose">
            Farm Connect links smallholder farmers, traders, and businesses. We make it easy to
            source fresh, traceable produce at fair prices with secure payments and reliable delivery.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <Sprout size={26} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Eco Farms Worldwide</div>
                <p className="text-sm text-gray-600 mt-1">
                  Verified growers and sustainable practices across regions ensure consistent quality.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <Wrench size={26} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Special Equipment</div>
                <p className="text-sm text-gray-600 mt-1">
                  Cold-chain and handling options available to maintain freshness from farm to market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative marquee band */}
      <div className="border-t border-gray-200 bg-[#F6F8EE] py-6 overflow-hidden">
        <div className="signika font-extrabold uppercase tracking-wide text-[40px] md:text-[64px] text-gray-300/80 whitespace-nowrap flex items-center justify-center gap-8">
          <span>Agriculture</span>
          <span>*</span>
          <span>Farming</span>
          <span>*</span>
          <span>Organic</span>
          <span>*</span>
          <span>Vegetables</span>
          <span>*</span>
          <span>Grains</span>
          <span>*</span>
          <span>Agriculture</span>
          <span>*</span>
          <span>Farming</span>
          <span>*</span>
          <span>Organic</span>
          <span>*</span>
          <span>Vegetables</span>
          <span>*</span>
          <span>Grains</span>
        </div>
      </div>
    </section>
  )
}

export default About
