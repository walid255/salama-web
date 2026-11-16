import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import { Pill, Home, Search, ArrowRight, MapPin } from 'lucide-react';

export default function NotFoundPage() {
  const { navigate, setIsSearchOpen } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <SEOHead
        title="Page Not Found (404)"
        description="The requested page could not be located on Salama Pharmaceuticals."
        canonicalUrl="/404"
      />

      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-salama-orange/10 text-salama-orange mx-auto flex items-center justify-center">
          <Pill className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-salama-orange font-mono">
            Error 404: Page Missing
          </span>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Looking for a Specific Molecule?
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you requested may have moved or had its URL updated. Use full site search or choose a destination below:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Formulary</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-2">
          <p className="font-semibold">Quick Clinical Shortcuts:</p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-salama-teal dark:text-salama-orange">
            <button onClick={() => navigate('/catalog')} className="hover:underline">Browse Catalog</button>
            <span>•</span>
            <button onClick={() => navigate('/about/profile')} className="hover:underline">Company Profile</button>
            <span>•</span>
            <button onClick={() => navigate('/contacts')} className="hover:underline">5 Zonal HQs</button>
          </div>
        </div>
      </div>
    </div>
  );
}
