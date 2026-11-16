import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  Pill,
  FileText,
  MapPin,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Copy
} from 'lucide-react';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    zones,
    faqs,
    navigate,
    copyToClipboard
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, products, pages, locations, faqs
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Static site pages to search
  const sitePages = [
    { title: 'Home', path: '/', category: 'Page', desc: 'Salama overview, 40+ years heritage, core pillars and featured medicines' },
    { title: 'About Us', path: '/about', category: 'Page', desc: 'Our story, 40+ years legacy, vision and clinical freedom principles' },
    { title: 'Company Profile & Deck', path: '/about/profile', category: 'Page', desc: 'Interactive digital presentation and corporate profile PDF' },
    { title: '5 National Zonal Centers', path: '/about/zones', category: 'Page', desc: 'Dar es Salaam, Arusha, Mbeya, Dodoma & Mwanza supply hubs' },
    { title: 'Doctor Choice & STG Guidelines', path: '/about/clinical-freedom', category: 'Page', desc: 'Prescribing autonomy, ending market-controlled limits, STG alignment' },
    { title: 'Quality Assurance & TMDA', path: '/about/quality', category: 'Page', desc: 'WHO-GMP compliance, TMDA registered molecules, batch testing' },
    { title: 'Pharmaceutical Catalog', path: '/catalog', category: 'Page', desc: 'Browse all registered antibiotics, cardios, diabetes, analgesics' },
    { title: 'Contacts & Zonal Map', path: '/contacts', category: 'Page', desc: 'Interactive geographic map, 5 regional HQs, hospital inquiry form' },
    { title: 'Frequently Asked Questions (FAQ)', path: '/faq', category: 'Page', desc: 'Licensing, MSD supply, cold-chain distribution and pharmacovigilance' }
  ];

  const q = query.toLowerCase().trim();

  // Search Results computation
  let filteredProducts = products.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.genericName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.therapeuticArea.toLowerCase().includes(q) ||
      p.keyHighlight.toLowerCase().includes(q) ||
      p.dosageForm.toLowerCase().includes(q) ||
      p.tmdaRegNo.toLowerCase().includes(q)
    );
  }).map((p) => ({
    type: 'product',
    id: p.id,
    title: `${p.name} (${p.genericName})`,
    subtitle: `${p.category} • ${p.dosageForm} • ${p.tmdaRegNo}`,
    badge: p.dosageForm,
    item: p,
    action: () => {
      setIsSearchOpen(false);
      navigate(`/catalog/${p.slug}`);
    }
  }));

  let filteredPages = sitePages.filter((page) => {
    if (!q) return true;
    return (
      page.title.toLowerCase().includes(q) ||
      page.desc.toLowerCase().includes(q) ||
      page.category.toLowerCase().includes(q)
    );
  }).map((page) => ({
    type: 'page',
    id: page.path,
    title: page.title,
    subtitle: page.desc,
    badge: 'Page',
    item: page,
    action: () => {
      setIsSearchOpen(false);
      navigate(page.path);
    }
  }));

  let filteredZones = zones.filter((z) => {
    if (!q) return true;
    return (
      z.name.toLowerCase().includes(q) ||
      z.hqCity.toLowerCase().includes(q) ||
      z.coverage.some((c) => c.toLowerCase().includes(q))
    );
  }).map((z) => ({
    type: 'location',
    id: z.id,
    title: `${z.name} - HQ: ${z.hqCity}`,
    subtitle: `Coverage: ${z.coverage.join(', ')}`,
    badge: 'Zone Hub',
    item: z,
    action: () => {
      setIsSearchOpen(false);
      navigate('/contacts');
    }
  }));

  let filteredFaqs = faqs.filter((f) => {
    if (!q) return true;
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  }).map((f) => ({
    type: 'faq',
    id: f.id,
    title: f.question,
    subtitle: f.answer,
    badge: f.category,
    item: f,
    action: () => {
      setIsSearchOpen(false);
      navigate('/faq');
    }
  }));

  let allResults = [];
  if (activeFilter === 'all' || activeFilter === 'products') allResults.push(...filteredProducts);
  if (activeFilter === 'all' || activeFilter === 'pages') allResults.push(...filteredPages);
  if (activeFilter === 'all' || activeFilter === 'locations') allResults.push(...filteredZones);
  if (activeFilter === 'all' || activeFilter === 'faqs') allResults.push(...filteredFaqs);

  const handleKeyDownList = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < allResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allResults.length - 1));
    } else if (e.key === 'Enter' && allResults[selectedIndex]) {
      e.preventDefault();
      allResults[selectedIndex].action();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Full website search"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-salama-orange flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
            placeholder="Search medicines, molecules, indications, HQs, FAQs..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'products', label: `Medicines (${filteredProducts.length})` },
            { id: 'pages', label: `Pages (${filteredPages.length})` },
            { id: 'locations', label: `Zonal Hubs (${filteredZones.length})` },
            { id: 'faqs', label: `FAQs (${filteredFaqs.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-salama-teal text-white dark:bg-salama-orange'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {allResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Pill className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
              <p className="font-medium text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for "Ceftriaxone", "Amoxicillin", "Glauconil", "Arusha", or "TMDA".</p>
            </div>
          ) : (
            allResults.map((res, idx) => {
              let Icon = FileText;
              let iconColor = 'text-salama-teal dark:text-salama-orange';
              if (res.type === 'product') {
                Icon = Pill;
                iconColor = 'text-salama-orange';
              } else if (res.type === 'location') {
                Icon = MapPin;
                iconColor = 'text-emerald-500';
              } else if (res.type === 'faq') {
                Icon = HelpCircle;
                iconColor = 'text-indigo-400';
              }

              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={`${res.type}-${res.id}-${idx}`}
                  onClick={res.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start justify-between gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-salama-teal-light/60 dark:bg-salama-surface-dark/90 border border-salama-teal/30 dark:border-salama-orange/30'
                      : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0 mt-0.5 shadow-sm">
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {res.title}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {res.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 self-center">
                    {res.type === 'product' && res.item?.tmdaRegNo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(res.item.tmdaRegNo, `TMDA Reg No ${res.item.tmdaRegNo} copied!`);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-salama-orange hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        title="Copy TMDA Registration No"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate, <strong>Enter</strong> to select</span>
          <span>Press <strong>ESC</strong> to close</span>
        </div>

      </div>
    </div>
  );
}
