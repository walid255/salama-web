import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Pill,
  ShieldCheck,
  Truck,
  Building2,
  Copy,
  MessageCircle,
  X
} from 'lucide-react';

export default function FAQPage() {
  const { faqs, copyToClipboard, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqIds, setOpenFaqIds] = useState(['faq-1', 'faq-3']); // First and third open by default

  const categories = ['All', 'Regulatory & Quality', 'Distribution & Logistics', 'Hospital Procurement', 'Clinical Autonomy', 'Pharmacovigilance', 'Ordering & Verification'];

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <div className="space-y-12 pb-20">
      <SEOHead
        title="Frequently Asked Questions (FAQ)"
        description="Common questions about Salama Pharmaceuticals: TMDA licensing, hospital procurement, MSD tenders, unbroken cold-chain supply, and doctor prescribing freedom in Tanzania."
        canonicalUrl="/faq"
        schemaData={faqSchema}
      />

      {/* Header Banner */}
      <section className="bg-salama-teal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clinical & Supply Help</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            Find immediate answers regarding TMDA molecule registration, MSD partnership, Good Distribution Practice
            (GDP) cold chain, and institutional order procedures.
          </p>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g. MSD, TMDA, Adverse, Cold-Chain)..."
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-salama-teal"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-salama-teal text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p className="font-bold text-slate-800 dark:text-slate-200">No matching questions found</p>
            <p className="text-xs mt-1">Try another keyword or reach out directly to our zonal supply team.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="pr-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-salama-orange">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-salama-orange' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                      
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Was this answer helpful?</span>
                        <button
                          onClick={() => copyToClipboard(faq.answer, 'FAQ answer copied to clipboard!')}
                          className="flex items-center gap-1 text-salama-teal dark:text-salama-orange hover:underline font-semibold"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Answer</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-salama-teal-light dark:bg-salama-surface-dark border border-salama-teal/20 dark:border-salama-teal/40 p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Have a Specific Clinical or Tender Question?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Our regulatory and commercial teams are available to provide analytical dossiers, certificates of analysis,
            or customized hospital credit terms.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/contacts')}
              className="px-6 py-3 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
            >
              Contact Hospital Desk
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
