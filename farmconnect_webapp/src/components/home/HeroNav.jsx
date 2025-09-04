import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Search, ChevronDown, Leaf } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const HeroNav = () => {
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    if (location.pathname === '/') {
      window.addEventListener('scroll', onScroll)
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    } else {
      setScrolled(true)
      return () => {}
    }
  }, [location.pathname])

  const shell = scrolled
    ? 'bg-white/30 backdrop-blur-xl border-white/50 shadow-lg'
    : 'bg-white/15 backdrop-blur-md border-white/30'

  const linkBase =
    'hidden md:inline-flex items-center text-[12px] lg:text-sm font-semibold tracking-wide uppercase text-gray-900/90 hover:text-gray-900 transition-colors'

  const Dot = () => (
    <span className="hidden lg:inline-block h-1 w-1 rounded bg-yellow-300 mx-3" />
  )

  const { user, logout, loading } = useAuth()

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
            <span className="signika text-gray-900 font-bold text-lg md:text-xl">Farm Connect</span>
          </Link>

          {/* Center menu */}
          <div className="hidden md:flex items-center">
            <Link to="/" className={linkBase}>Home</Link>
            <Dot />
            <Link to="/products" className={linkBase}>Marketplace</Link>
            <Dot />
            <Link to="/services" className={linkBase}>Services</Link>
            <Dot />
            <Link to="/about" className={linkBase}>About</Link>
            {/* <Dot />
            <Link to="/#portfolio" className={linkBase}>Featured</Link>
            <Dot /> */}
            {/* <Link to="/#testimonials" className={linkBase}>Testimonials</Link> */}
            <Dot />
            <Link to="/contact" className={linkBase}>Contact</Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-gray-900/90">
              <Phone size={16} className="text-yellow-300" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase opacity-80">Support</div>
                <div className="text-sm font-semibold tracking-wide">+1 (212) 255-511</div>
              </div>
            </div>

            <button
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-900 hover:bg-white transition"
            >
              <Search size={16} />
            </button>

            {/* Auth actions */}
            {!loading && !user && (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3 py-1.5 text-[12px] md:text-sm font-semibold rounded-full bg-white text-gray-900 hover:bg-yellow-50 border border-white/70">
                  Sign in
                </Link>
                <Link to="/register" className="px-3 py-1.5 text-[12px] md:text-sm font-semibold rounded-full bg-yellow-300 text-gray-900 hover:bg-yellow-400">
                  Sign up
                </Link>
              </div>
            )}

            {!loading && user && (
              <UserMenu user={user} onLogout={logout} />
            )}
          </div>
        </div>

        {/* CTA removed as requested */}
      </div>
    </div>
  )
}

export default HeroNav

// Small user menu component
const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)
  const initials = (user?.firstName?.[0] || user?.name?.[0] || 'U').toUpperCase()
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 pl-2 pr-2 md:pr-3 py-1.5 rounded-full bg-white/85 text-gray-900 hover:bg-white border border-white/70"
      >
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-yellow-300 font-bold text-gray-900">{initials}</span>
        <span className="hidden md:inline text-sm font-semibold max-w-[120px] truncate">{user?.firstName || user?.name || 'Account'}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden z-50">
          <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
          <Link to="/profile#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
          {user?.role === 'admin' && (
            <Link to="/admin/users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Admin Users</Link>
          )}
          <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
        </div>
      )}
    </div>
  )
}
