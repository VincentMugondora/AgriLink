import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Menu, X, User, LogOut, ShoppingCart, Package } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  // Separate state for mobile nav and user dropdown to avoid conflicts on small screens
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const mobileBtnRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const userBtnRef = useRef(null)
  const userMenuRef = useRef(null)
  const { t } = useTranslation()

  const handleLogout = () => {
    logout()
    navigate('/')
    setUserMenuOpen(false)
    setMobileOpen(false)
  }

  const toggleMobile = () => setMobileOpen(!mobileOpen)
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)

  // Click-outside and ESC to close menus
  useEffect(() => {
    if (!mobileOpen && !userMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setUserMenuOpen(false)
      }
    }
    const onClick = (e) => {
      const target = e.target
      // mobile
      if (
        mobileOpen &&
        mobileMenuRef.current && !mobileMenuRef.current.contains(target) &&
        mobileBtnRef.current && !mobileBtnRef.current.contains(target)
      ) {
        setMobileOpen(false)
      }
      // user dropdown
      if (
        userMenuOpen &&
        userMenuRef.current && !userMenuRef.current.contains(target) &&
        userBtnRef.current && !userBtnRef.current.contains(target)
      ) {
        setUserMenuOpen(false)
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
  }, [mobileOpen, userMenuOpen])

  return (
    <nav className="bg-green-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold hover:text-green-100 transition-colors">
            🌾 {t('nav.brand')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="hover:text-green-100 transition-colors font-medium">
              {t('nav.links.marketplace')}
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-green-100 transition-colors font-medium">
                  {t('nav.auth.dashboard')}
                </Link>
                <Link to="/orders" className="hover:text-green-100 transition-colors font-medium">
                  {t('nav.auth.orders')}
                </Link>
                <div className="relative">
                  <button
                    ref={userBtnRef}
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 hover:text-green-100 transition-colors"
                  >
                    <User size={20} />
                    <span>{user.firstName}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-2" />
                        {t('nav.auth.profile')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        {t('nav.auth.logout')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-green-500 transition-colors"
                >
                  {t('nav.auth.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-white text-green-500 rounded-md hover:bg-green-50 transition-colors"
                >
                  {t('nav.auth.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileBtnRef}
            onClick={toggleMobile}
            className="md:hidden p-2 rounded-md hover:bg-green-600 transition-colors"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation (animated slide/fade) */}
        <div
          id="mobile-menu"
          aria-hidden={!mobileOpen}
          ref={mobileMenuRef}
          className={`md:hidden border-t border-green-400 overflow-hidden transform-gpu transition-all duration-200 ease-out ${mobileOpen ? 'opacity-100 translate-y-0 max-h-[420px] py-4 pointer-events-auto' : 'opacity-0 -translate-y-2 max-h-0 py-0 pointer-events-none'}`}
        >
          <div className={`flex flex-col space-y-2 ${mobileOpen ? 'opacity-100 transition-opacity duration-200 delay-75' : 'opacity-0 transition-opacity duration-150'}`}>
              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
              >
                {t('nav.links.marketplace')}
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.dashboard')}
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.orders')}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.profile')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left hover:bg-red-500 rounded-md transition-colors"
                  >
                    {t('nav.auth.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
