import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  Building2,
  FileText,
  MapPin,
  Stethoscope,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function Navbar() {
  const {
    currentRoute,
    navigate,
    activeDropdown,
    setActiveDropdown,
    darkMode,
    setDarkMode,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setActiveDropdown]);

  const toggleDropdown = (name) => {
    // All dropdown menus auto hide when another is opened
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const isActive = (path) => {
    if (path === '/') return currentRoute === '/';
    return currentRoute.startsWith(path);
  };

  return (
    <>
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-salama-orange focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-semibold focus:outline-none focus:ring-4 focus:ring-salama-orange/50 transition-all"
      >
        Skip to main content
      </a>

      {/* Top Clinical Announcement Bar */}
      <div className="bg-salama-teal-dark text-emerald-100 text-xs py-2 px-4 border-b border-salama-teal/40 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-salama-orange animate-pulse"></span>
            <span className="font-medium">
              40+ Years of Trusted Pharmaceutical Service in Tanzania • 100+ TMDA Registered Molecules
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-emerald-200/80">
            <span>MSD Prime Supplier (Arusha, Dodoma, Lake Zone)</span>
            <span className="text-white/20">|</span>
            <button
              onClick={() => navigate('/contacts')}
              className="hover:text-white transition-colors underline"
            >
              5 National Zonal Centers
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Picture-based Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-salama-teal rounded-xl p-1"
                aria-label="Salama Pharmaceuticals Home"
              >
                <img
                  src="/assets/brand/salama-logo.webp"
                  alt="Salama Pharmaceuticals Logo"
                  width="180"
                  height="56"
                  className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/brand/salama-logo.png';
                  }}
                />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {/* Home */}
              <button
                onClick={() => navigate('/')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/') && currentRoute === '/'
                    ? 'text-salama-teal dark:text-salama-orange bg-salama-teal-light dark:bg-salama-surface-dark'
                    : 'text-slate-700 dark:text-slate-200 hover:text-salama-teal dark:hover:text-salama-orange hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Home
              </button>

              {/* About Us with Dropdown for Company Profile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => toggleDropdown('about')}
                  aria-expanded={activeDropdown === 'about'}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive('/about')
                      ? 'text-salama-teal dark:text-salama-orange bg-salama-teal-light dark:bg-salama-surface-dark'
                      : 'text-slate-700 dark:text-slate-200 hover:text-salama-teal dark:hover:text-salama-orange hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'about' ? 'rotate-180 text-salama-orange' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu (Auto-hides when another is opened or clicked) */}
                {activeDropdown === 'about' && (
                  <div
                    className="absolute left-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
                    role="menu"
                    aria-label="About Us Submenu"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-salama-orange">
                        Company Profile & Heritage
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Deep roots in Tanzania since 1984
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('/about')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      role="menuitem"
                    >
                      <div className="p-2 rounded-lg bg-salama-teal-light dark:bg-slate-800 text-salama-teal dark:text-salama-orange group-hover:bg-salama-teal group-hover:text-white transition-colors">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-salama-teal dark:group-hover:text-salama-orange">
                          Our Story & 40+ Years Legacy
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Evolution of healthcare service in Tanzania
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/about/profile')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      role="menuitem"
                    >
                      <div className="p-2 rounded-lg bg-orange-50 dark:bg-slate-800 text-salama-orange group-hover:bg-salama-orange group-hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-salama-orange">
                          Company Profile (Interactive)
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Digital corporate deck & download
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/about/zones')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      role="menuitem"
                    >
                      <div className="p-2 rounded-lg bg-salama-teal-light dark:bg-slate-800 text-salama-teal dark:text-salama-orange group-hover:bg-salama-teal group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-salama-teal dark:group-hover:text-salama-orange">
                          National Supply & 5 Zonal Centers
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Dar, Arusha, Mbeya, Dodoma & Mwanza HQs
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/about/clinical-freedom')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      role="menuitem"
                    >
                      <div className="p-2 rounded-lg bg-salama-teal-light dark:bg-slate-800 text-salama-teal dark:text-salama-orange group-hover:bg-salama-teal group-hover:text-white transition-colors">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-salama-teal dark:group-hover:text-salama-orange">
                          Doctor Choice & STG Alignment
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Restoring prescribing autonomy to clinicians
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/about/quality')}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      role="menuitem"
                    >
                      <div className="p-2 rounded-lg bg-salama-teal-light dark:bg-slate-800 text-salama-teal dark:text-salama-orange group-hover:bg-salama-teal group-hover:text-white transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-salama-teal dark:group-hover:text-salama-orange">
                          Quality Assurance & TMDA
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          WHO-GMP compliance and laboratory testing
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Catalogy */}
              <button
                onClick={() => navigate('/catalog')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/catalog')
                    ? 'text-salama-teal dark:text-salama-orange bg-salama-teal-light dark:bg-salama-surface-dark'
                    : 'text-slate-700 dark:text-slate-200 hover:text-salama-teal dark:hover:text-salama-orange hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Catalogy
              </button>

              {/* Contacts */}
              <button
                onClick={() => navigate('/contacts')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/contacts')
                    ? 'text-salama-teal dark:text-salama-orange bg-salama-teal-light dark:bg-salama-surface-dark'
                    : 'text-slate-700 dark:text-slate-200 hover:text-salama-teal dark:hover:text-salama-orange hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Contacts & Map
              </button>

              {/* FAQ */}
              <button
                onClick={() => navigate('/faq')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/faq')
                    ? 'text-salama-teal dark:text-salama-orange bg-salama-teal-light dark:bg-salama-surface-dark'
                    : 'text-slate-700 dark:text-slate-200 hover:text-salama-teal dark:hover:text-salama-orange hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                FAQs
              </button>
            </nav>

            {/* Utility Actions (Search, Dark Mode, Contact CTA, Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Full Site Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-salama-teal dark:hover:text-salama-orange bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all border border-slate-200/60 dark:border-slate-700/60 group"
                aria-label="Search website and medicines (Ctrl+K)"
                title="Search website and medicines (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-slate-500 group-hover:text-salama-orange transition-colors" />
                <span className="hidden lg:inline text-xs font-medium text-slate-500 dark:text-slate-400">
                  Search catalog...
                </span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Dark Mode Toggle */}
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-salama-orange bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition-all"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-300" />
                )}
              </button>

              {/* Quick Inquiry / Contact CTA Button */}
              <button
                onClick={() => navigate('/contacts')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Request Supply
              </button>

              {/* Mobile Drawer Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
