import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, ShoppingCart, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{
      backgroundColor: '#10b981',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: 'white'
        }}>
          🌾 Farm Connect
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-nav">
          <Link to="/products" style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: '500'
          }}>
            Products
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '500'
              }}>
                Dashboard
              </Link>
              <Link to="/orders" style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '500'
              }}>
                Orders
              </Link>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={toggleMenu}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <User size={20} />
                  {user.firstName}
                </button>
                
                {isMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    color: '#1a202c',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    padding: '0.5rem',
                    minWidth: '150px',
                    zIndex: 1000
                  }}>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        textDecoration: 'none',
                        color: '#1a202c',
                        borderRadius: '0.25rem'
                      }}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        borderRadius: '0.25rem',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="btn btn-outline" style={{
                color: 'white',
                borderColor: 'white'
              }}>
                Login
              </Link>
              <Link to="/register" className="btn" style={{
                backgroundColor: 'white',
                color: '#10b981'
              }}>
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={{
          backgroundColor: '#059669',
          padding: '1rem',
          marginTop: '1rem'
        }} className="mobile-nav">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.25rem'
              }}
            >
              Products
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fed7d7',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    textAlign: 'left',
                    borderRadius: '0.25rem'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
