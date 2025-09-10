import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Search, ChevronDown, Leaf, Menu, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const HeroNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileBtnRef = useRef(null)
  const mobileMenuRef = useRef(null)

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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Click-outside and ESC-to-close for mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    const onClick = (e) => {
      const target = e.target
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileBtnRef.current &&
        !mobileBtnRef.current.contains(target)
      ) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('touchstart', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('touchstart', onClick)
    }
  }, [mobileOpen])

  const shell = scrolled
    ? 'bg-white/30 backdrop-blur-xl border-white/50 shadow-lg'
    : 'bg-white/15 backdrop-blur-md border-white/30'

  const linkBase =
    'hidden md:inline-flex items-center text-[12px] lg:text-sm font-semibold tracking-wide uppercase text-gray-900/90 hover:text-gray-900 transition-colors'

  const Dot = () => (
    <span className="hidden lg:inline-block h-1 w-1 rounded bg-yellow-300 mx-3" />
  )

  const { user, logout, loading } = useAuth()
  const { t } = useTranslation()

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
            <span className="signika text-gray-900 font-bold text-lg md:text-xl">{t('nav.brand')}</span>
          </Link>

          {/* Center menu */}
          <div className="hidden md:flex items-center">
            <Link to="/" className={linkBase}>{t('nav.links.home')}</Link>
            <Dot />
            <Link to="/products" className={linkBase}>{t('nav.links.marketplace')}</Link>
            <Dot />
            <Link to="/services" className={linkBase}>{t('nav.links.services')}</Link>
            <Dot />
            <Link to="/about" className={linkBase}>{t('nav.links.about')}</Link>
            {/* <Dot />
            <Link to="/#portfolio" className={linkBase}>Featured</Link>
            <Dot /> */}
            {/* <Link to="/#testimonials" className={linkBase}>Testimonials</Link> */}
            <Dot />
            <Link to="/contact" className={linkBase}>{t('nav.links.contact')}</Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-gray-900/90">
              <Phone size={16} className="text-yellow-300" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase opacity-80">{t('nav.auth.support')}</div>
                <div className="text-sm font-semibold tracking-wide">+1 (212) 255-511</div>
              </div>
            </div>

            <button
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-900 hover:bg-white transition"
            >
              <Search size={16} />
            </button>

            {/* Mobile hamburger */}
            <button
              ref={mobileBtnRef}
              onClick={() => setMobileOpen(v => !v)}
              className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-white/85 text-gray-900 hover:bg-white transition"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="hero-mobile-menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Auth actions */}
            {!loading && !user && (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3 py-1.5 text-[12px] md:text-sm font-semibold rounded-full bg-white text-gray-900 hover:bg-yellow-50 border border-white/70">
                  {t('nav.auth.signIn')}
                </Link>
                <Link to="/register" className="px-3 py-1.5 text-[12px] md:text-sm font-semibold rounded-full bg-yellow-300 text-gray-900 hover:bg-yellow-400">
                  {t('nav.auth.signUp')}
                </Link>
              </div>
            )}

            {!loading && user && (
              <div className="hidden sm:block">
                <UserMenu user={user} onLogout={logout} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown (animated slide/fade) */}
        <div
          id="hero-mobile-menu"
          aria-hidden={!mobileOpen}
          ref={mobileMenuRef}
          className={`md:hidden mt-2 rounded-2xl border ${scrolled ? 'border-white/60 bg-white/95' : 'border-white/40 bg-white/85'} backdrop-blur-xl shadow-lg overflow-hidden transform-gpu transition-all duration-200 ease-out ${mobileOpen ? 'opacity-100 translate-y-0 max-h-[420px] p-3 pointer-events-auto' : 'opacity-0 -translate-y-2 max-h-0 p-0 pointer-events-none'}`}
        >
          <div className={`flex flex-col divide-y divide-gray-200/60 ${mobileOpen ? 'opacity-100 transition-opacity duration-200 delay-75' : 'opacity-0 transition-opacity duration-150'}`}>
            <div className="py-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.links.home')}</Link>
              <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.links.marketplace')}</Link>
              <Link to="/services" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.links.services')}</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.links.about')}</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.links.contact')}</Link>
            </div>
            <div className="py-1">
              {!loading && !user && (
                <div className="flex flex-col">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.auth.login')}</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.auth.register')}</Link>
                </div>
              )}
              {!loading && user && (
                <div className="flex flex-col">
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.auth.dashboard')}</Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.auth.orders')}</Link>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.auth.profile')}</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin/users" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-50">{t('nav.auth.adminUsers')}</Link>
                  )}
                  <button onClick={() => { setMobileOpen(false); logout() }} className="text-left block w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50">{t('nav.auth.logout')}</button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroNav

// Small user menu component
const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const btnRef = useRef(null)
  const menuRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e) => {
      const target = e.target
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        btnRef.current && !btnRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('touchstart', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('touchstart', onClick)
    }
  }, [open])
  const initials = (user?.firstName?.[0] || user?.name?.[0] || 'U').toUpperCase()
  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 pl-2 pr-2 md:pr-3 py-1.5 rounded-full bg-white/85 text-gray-900 hover:bg-white border border-white/70"
      >
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-yellow-300 font-bold text-gray-900">{initials}</span>
        <span className="hidden md:inline text-sm font-semibold max-w-[120px] truncate">{user?.firstName || user?.name || 'Account'}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div ref={menuRef} className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden z-50">
          <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('nav.auth.dashboard')}</Link>
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('nav.auth.profile')}</Link>
          <Link to="/profile#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('nav.auth.settings')}</Link>
          {user?.role === 'admin' && (
            <Link to="/admin/users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('nav.auth.adminUsers')}</Link>
          )}
          <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">{t('nav.auth.logout')}</button>
        </div>
      )}
    </div>
  )
}
