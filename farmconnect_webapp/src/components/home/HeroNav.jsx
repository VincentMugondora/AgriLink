import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, Search, ChevronDown, Leaf } from 'lucide-react'

const HeroNav = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shell = scrolled
    ? 'bg-white/30 backdrop-blur-xl border-white/50 shadow-lg'
    : 'bg-white/15 backdrop-blur-md border-white/30'

  const linkBase = scrolled
    ? 'hidden md:inline-flex items-center text-[12px] lg:text-sm font-semibold tracking-wide uppercase text-gray-900/90 hover:text-gray-900 transition-colors'
    : 'hidden md:inline-flex items-center text-[12px] lg:text-sm font-semibold tracking-wide uppercase text-white/90 hover:text-white transition-colors'

  const Dot = () => (
    <span className="hidden lg:inline-block h-1 w-1 rounded-full bg-yellow-300 mx-3" />
  )

  return (
    <div className="fixed top-4 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 pointer-events-auto relative">
        <div
          className={`flex items-center justify-between rounded-full border px-3 md:px-5 py-2 md:py-2.5 transition-all duration-300 ${shell}`}
        >
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 text-gray-900">
              <Leaf size={18} />
            </span>
            <span className={`${scrolled ? 'text-gray-900' : 'text-white'} font-bold text-lg md:text-xl`}>FarmConnect</span>
          </Link>

          {/* Center menu */}
          <div className="hidden md:flex items-center">
            <NavLink to="/" className={linkBase}>Home</NavLink>
            <Dot />
            <NavLink to="#" className={`${linkBase} gap-1`}>
              Pages <ChevronDown size={14} className="opacity-80" />
            </NavLink>
            <Dot />
            <NavLink to="#services" className={linkBase}>Services</NavLink>
            <Dot />
            <NavLink to="#portfolio" className={linkBase}>Portfolio</NavLink>
            <Dot />
            <NavLink to="/blog" className={linkBase}>Blog</NavLink>
            <Dot />
            <NavLink to="/contact" className={linkBase}>Contact Us</NavLink>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className={`hidden lg:flex items-center gap-2 ${scrolled ? 'text-gray-900/90' : 'text-white/90'}`}>
              <Phone size={16} className="text-yellow-300" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase opacity-80">Call us Now</div>
                <div className="text-sm font-semibold tracking-wide">+1 (212) 255-511</div>
              </div>
            </div>

            <button
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-900 hover:bg-white transition"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* CTA removed as requested */}
      </div>
    </div>
  )
}

export default HeroNav
