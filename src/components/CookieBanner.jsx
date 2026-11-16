import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [hasConsented, setHasConsented] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('salama_cookie_consent');
    if (!saved) {
      setHasConsented(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('salama_cookie_consent', 'accepted_all');
    setHasConsented(true);
  };

  const handleEssential = () => {
    localStorage.setItem('salama_cookie_consent', 'essential_only');
    setHasConsented(true);
  };

  if (hasConsented) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-salama-orange/10 text-salama-orange flex-shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Medical & Analytics Cookies
          </h4>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Salama uses essential cookies to ensure safe clinical portal functionality and anonymous analytics to
            improve medicine availability reporting across Tanzania.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3.5 py-2 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold transition-all shadow-sm"
            >
              Accept All
            </button>
            <button
              onClick={handleEssential}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={handleEssential}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
