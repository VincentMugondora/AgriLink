import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Menu, X, User, LogOut, ShoppingCart, Package } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 hover:text-green-100 transition-colors"
                  >
                    <User size={20} />
                    <span>{user.firstName}</span>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
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
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-400">
            <div className="flex flex-col space-y-2">
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
              >
                {t('nav.links.marketplace')}
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.dashboard')}
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.orders')}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
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
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 hover:bg-green-600 rounded-md transition-colors"
                  >
                    {t('nav.auth.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
