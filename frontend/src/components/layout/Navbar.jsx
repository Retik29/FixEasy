import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, UserCircle, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (role === 'user') return '/user';
    if (role === 'technician') return '/technician';
    if (role === 'admin') return '/admin';
    return '/';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="navbar"
        style={{
          padding: scrolled ? '0.75rem 2rem' : '1rem 2rem',
          background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <motion.div
            whileHover={{ rotate: -10 }}
            className="navbar-logo-icon"
            style={{
              width: '42px',
              height: '42px',
              background: 'var(--gradient-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
            }}
          >
            <Wrench size={22} />
          </motion.div>
          <span
            className="navbar-logo-text"
            style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            FixEasy
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          className="nav-desktop"
        >
          {isAuthenticated ? (
            <>
              <Link
                to={getDashboardLink()}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: isActive(getDashboardLink()) ? 'var(--primary)' : 'var(--text-primary)',
                  background: isActive(getDashboardLink()) ? 'var(--primary-50)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isActive('/profile') ? 'var(--primary)' : 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive('/profile') ? 'white' : 'var(--text-secondary)',
                  border: '2px solid transparent',
                  borderColor: isActive('/profile') ? 'var(--primary)' : 'var(--border)',
                  transition: 'all 0.2s'
                }}
              >
                <UserCircle size={20} />
              </Link>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '2px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <LogOut size={18} />
              </motion.button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}
              >
                Log In
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  style={{
                    padding: '0.6rem 1.5rem',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              background: 'white',
              borderBottom: '1px solid var(--border)',
              padding: '1rem',
              zIndex: 99,
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: '#dc2626',
                      background: '#fef2f2',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{
                      justifyContent: 'center'
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop > *:not(.mobile-menu-btn) {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
