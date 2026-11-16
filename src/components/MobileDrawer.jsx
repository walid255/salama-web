import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ChevronDown,
  Building2,
  FileText,
  MapPin,
  Stethoscope,
  ShieldCheck,
  Search,
  Moon,
  Sun,
  PhoneCall,
  Pill,
  HelpCircle,
  Home
} from 'lucide-react';

export default function MobileDrawer() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigate,
    currentRoute,
    darkMode,
    setDarkMode,
    setIsSearchOpen
  } = useApp();

  const [isCompanyProfileOpen, setIsCompanyProfileOpen] = useState(false);

  if (!isMobileMenuOpen) return null;

  const handleNav = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div
      className="fixed inset-0 z-50 md:hidden flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <img
            src="/assets/brand/salama-logo.webp"
            alt="Salama Pharmaceuticals Logo"
            width="140"
            height="44"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = '/assets/brand/salama-logo.png';
            }}
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700"
          >
            <Search className="w-4 h-4 text-salama-orange" />
            <span>Search medicines or pages...</span>
          </button>
        </div>

        {/* Main Links */}
        <nav className="mt-6 flex-1 space-y-1.5" aria-label="Mobile Navigation Links">
          <button
            onClick={() => handleNav('/')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-sm transition-colors ${
              currentRoute === '/'
                ? 'bg-salama-teal-light text-salama-teal dark:bg-salama-surface-dark dark:text-salama-orange font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="w-5 h-5 text-salama-orange" />
            <span>Home</span>
          </button>

          {/* Company Profile Accordion */}
          <div>
            <button
              onClick={() => setIsCompanyProfileOpen(!isCompanyProfileOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-expanded={isCompanyProfileOpen}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-salama-orange" />
                <span>About & Profile</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isCompanyProfileOpen ? 'rotate-180 text-salama-orange' : ''}`}
              />
            </button>

            {isCompanyProfileOpen && (
              <div className="pl-6 pr-2 py-2 space-y-1 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl my-1 border border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleNav('/about')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-salama-teal dark:hover:text-salama-orange"
                >
                  Our Story & 40+ Years Legacy
                </button>
                <button
                  onClick={() => handleNav('/about/profile')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-salama-teal dark:hover:text-salama-orange"
                >
                  Interactive Company Profile Deck
                </button>
                <button
                  onClick={() => handleNav('/about/zones')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-salama-teal dark:hover:text-salama-orange"
                >
                  5 National Zonal Centers
                </button>
                <button
                  onClick={() => handleNav('/about/clinical-freedom')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-salama-teal dark:hover:text-salama-orange"
                >
                  Doctor Choice & STG Guidelines
                </button>
                <button
                  onClick={() => handleNav('/about/quality')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-salama-teal dark:hover:text-salama-orange"
                >
                  Quality Assurance & TMDA
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('/catalog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-sm transition-colors ${
              currentRoute.startsWith('/catalog')
                ? 'bg-salama-teal-light text-salama-teal dark:bg-salama-surface-dark dark:text-salama-orange font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Pill className="w-5 h-5 text-salama-orange" />
            <span>Catalogy (Medicines)</span>
          </button>

          <button
            onClick={() => handleNav('/contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-sm transition-colors ${
              currentRoute.startsWith('/contacts')
                ? 'bg-salama-teal-light text-salama-teal dark:bg-salama-surface-dark dark:text-salama-orange font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-5 h-5 text-salama-orange" />
            <span>Contacts & Map</span>
          </button>

          <button
            onClick={() => handleNav('/faq')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-sm transition-colors ${
              currentRoute.startsWith('/faq')
                ? 'bg-salama-teal-light text-salama-teal dark:bg-salama-surface-dark dark:text-salama-orange font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-5 h-5 text-salama-orange" />
            <span>FAQs</span>
          </button>
        </nav>

        {/* Footer controls inside drawer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Theme</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <button
            onClick={() => handleNav('/contacts')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-salama-teal text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-salama-teal-hover transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Zonal Supply Depot</span>
          </button>
        </div>

      </div>
    </div>
  );
}
