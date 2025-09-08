import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LayoutDashboard, ShoppingCart, User as UserIcon, Users as UsersIcon, Menu, X, Plus, Package } from 'lucide-react'

const DashboardLayout = ({ children }) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/profile', label: 'Profile', icon: UserIcon },
  ]

  if (user?.role === 'farmer' || user?.role === 'trader') {
    links.push({ to: '/products/my', label: 'My Products', icon: Package })
    links.push({ to: '/products/new', label: 'Add Product', icon: Plus })
  }

  if (user?.role === 'admin') {
    links.push({ to: '/admin/users', label: 'Admin Users', icon: UsersIcon })
  }

  const LinkItem = ({ to, label, Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
        }`
      }
      onClick={() => setOpen(false)}
    >
      <Icon size={18} className="mr-2" />
      {label}
    </NavLink>
  )

  return (
    <div className="min-h-[calc(100vh-140px)] py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            {open ? <X size={18} className="mr-2" /> : <Menu size={18} className="mr-2" />}
            Menu
          </button>
          {open && (
            <div className="mt-3 bg-white border border-gray-200 rounded-md p-2 shadow-sm space-y-1">
              {links.map((l) => (
                <LinkItem key={l.to} to={l.to} label={l.label} Icon={l.icon} />
              ))}
            </div>
          )}
        </div>

        <div className="md:grid md:grid-cols-[16rem_1fr] md:gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 sticky top-24">
              <div className="px-2 py-2 border-b border-gray-100 mb-2">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="font-semibold text-gray-900 capitalize">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <nav className="space-y-1">
                {links.map((l) => (
                  <LinkItem key={l.to} to={l.to} label={l.label} Icon={l.icon} />
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
