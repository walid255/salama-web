import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import ContentImage from '../components/ContentImage';
import {
  Search,
  Filter,
  Pill,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  FileText,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CatalogPage() {
  const {
    products,
    siteContent,
    activeProductSlug,
    setActiveProductSlug,
    navigate,
    copyToClipboard,
    showConfirm
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedForm, setSelectedForm] = useState('All');
  const [activeProduct, setActiveProduct] = useState(null);
  const catalogPage = siteContent.catalogPage || {};

  // Sync active product modal from activeProductSlug or deep URL
  useEffect(() => {
    if (activeProductSlug) {
      const found = products.find((p) => p.slug === activeProductSlug);
      if (found) {
        setActiveProduct(found);
      }
    } else {
      setActiveProduct(null);
    }
  }, [activeProductSlug, products]);

  // Categories list
  const categories = ['All', ...new Set(products.map((product) => product.category).filter(Boolean))];

  // Dosage forms
  const dosageForms = ['All', ...new Set(products.map((product) => product.dosageForm).filter(Boolean))];

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesForm = selectedForm === 'All' || p.dosageForm.toLowerCase().includes(selectedForm.toLowerCase());
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.genericName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tmdaRegNo.toLowerCase().includes(q) ||
      p.keyHighlight.toLowerCase().includes(q) ||
      (p.indications && p.indications.some((ind) => ind.toLowerCase().includes(q)));

    return matchesCategory && matchesForm && matchesSearch;
  });

  const openProductModal = (product) => {
    setActiveProduct(product);
    setActiveProductSlug(product.slug);
    window.history.pushState(null, '', `/catalog/${product.slug}`);
  };

  const closeProductModal = () => {
    setActiveProduct(null);
    setActiveProductSlug(null);
    window.history.pushState(null, '', '/catalog');
  };

  // Schema.org Product data for active product
  const activeProductSchema = activeProduct
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: activeProduct.name,
        image: activeProduct.image,
        description: `${activeProduct.genericName} - ${activeProduct.keyHighlight}`,
        sku: activeProduct.tmdaRegNo,
        brand: {
          '@type': 'Brand',
          name: activeProduct.brand || 'Salama / neoMedic'
        },
        category: activeProduct.category,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'TZS',
          price: '0.00',
          availability: 'https://schema.org/InStock',
          eligibleRegion: 'Tanzania'
        }
      }
    : null;

  return (
    <div className="space-y-12 pb-20">
      <SEOHead
        title={activeProduct ? `${activeProduct.name} (${activeProduct.genericName})` : 'Pharmaceutical Catalog'}
        description="Search Salama Pharmaceuticals' catalog of 100+ TMDA-approved molecules: Ceftriaxone, Amoxicillin-Clavulanate, Latanoprost, Cefixime, Losartan, and Meloxicam."
        canonicalUrl={activeProduct ? `/catalog/${activeProduct.slug}` : '/catalog'}
        schemaData={activeProductSchema}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-salama-teal-light/50 to-transparent dark:from-salama-dark py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-salama-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Pill className="w-3.5 h-3.5" />
            <span>Tanzania STG-Aligned Formulary</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {catalogPage.title || 'Pharmaceutical Catalog & Molecule Directory'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {catalogPage.description || 'Every molecule is registered with TMDA, manufactured under WHO-GMP compliance, and stocked across our 5 nationwide zonal distribution centers.'}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          
          {/* Search Row */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by molecule name, generic formula, brand, indication, or TMDA registration number..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-salama-teal dark:focus:ring-salama-orange transition-all"
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

          {/* Category Tabs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Therapeutic Area:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-salama-teal text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dosage Form Tabs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Dosage Form:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {dosageForms.map((form) => (
                <button
                  key={form}
                  onClick={() => setSelectedForm(form)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedForm === form
                      ? 'bg-salama-orange text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {form}
                </button>
              ))}
            </div>
          </div>

          {/* Filter summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {products.length} registered molecules
            </span>
            {(selectedCategory !== 'All' || selectedForm !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedForm('All');
                  setSearchQuery('');
                }}
                className="text-salama-orange hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
            <Pill className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No molecules found</h3>
            <p className="text-xs mt-1 max-w-md mx-auto">
              We couldn’t find any medicines matching your filters. Try clearing your search or switching therapeutic categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedForm('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-salama-teal text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openProductModal(product)}
                className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-teal dark:hover:border-salama-orange shadow-sm hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative w-full h-52 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 flex items-center justify-center p-4 overflow-hidden">
                    <ContentImage
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                      placeholderClass="h-52 w-full rounded-2xl"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-salama-teal text-white text-[10px] font-bold tracking-wider uppercase">
                        {product.dosageForm}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(product.tmdaRegNo, `TMDA Reg No ${product.tmdaRegNo} copied!`);
                        }}
                        className="p-1.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-salama-orange border border-slate-200 dark:border-slate-700 text-[10px] font-mono flex items-center gap-1 shadow-sm"
                        title="Copy TMDA Registration No"
                      >
                        <span>{product.tmdaRegNo}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-salama-orange uppercase tracking-wider">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {product.brand}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-salama-teal dark:group-hover:text-salama-orange transition-colors">
                      {product.name}
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                      {product.genericName}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 pt-1">
                      {product.keyHighlight}
                    </p>
                  </div>
                </div>

                {/* Footer specs & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">
                    {product.strength}
                  </div>
                  <div className="text-salama-teal dark:text-salama-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Clinical Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Modal Dialog */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-product-title"
        >
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-salama-teal text-white text-[10px] font-bold uppercase tracking-wider">
                  {activeProduct.dosageForm}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  TMDA Registration: {activeProduct.tmdaRegNo}
                </span>
              </div>
              <button
                onClick={closeProductModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close medicine detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Product Image */}
                <div className="md:col-span-5 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800 p-6 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <ContentImage
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="max-h-64 object-contain"
                    placeholderClass="min-h-64 w-full rounded-2xl"
                  />
                </div>

                {/* Right Product Overview */}
                <div className="md:col-span-7 space-y-3">
                  <p className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                    {activeProduct.category}
                  </p>
                  <h3 id="active-product-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {activeProduct.name}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {activeProduct.genericName}
                  </p>
                  <p className="text-xs text-salama-teal dark:text-salama-orange font-bold">
                    {activeProduct.strength} • Brand: {activeProduct.brand}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Clinical Highlight:</strong> {activeProduct.keyHighlight}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(activeProduct.tmdaRegNo, `TMDA Reg No ${activeProduct.tmdaRegNo} copied!`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-salama-orange" />
                      <span>Copy TMDA Reg No</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(window.location.origin + `/catalog/${activeProduct.slug}`, 'Product link copied!')}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-salama-teal dark:text-salama-orange" />
                      <span>Copy Share Link</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Indications List */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Approved Indications & Clinical Uses
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {activeProduct.indications?.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pharmacological Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Packaging & Presentation</span>
                  <span className="text-slate-600 dark:text-slate-300">{activeProduct.presentation}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Pharmacological Mechanism</span>
                  <span className="text-slate-600 dark:text-slate-300">{activeProduct.mechanism}</span>
                </div>
              </div>

              {/* Update Metadata */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Last medically reviewed by Salama Clinical Board: {activeProduct.updatedAt || '2026-10'}</span>
                </div>
                <span>Tanzania Standard Treatment Guidelines Aligned</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  showConfirm({
                    title: `Request Dossier: ${activeProduct.name}`,
                    message: `Analytical Certificate of Analysis (CoA) and clinical monographs for ${activeProduct.genericName} will be dispatched to your hospital email.\nProceed to contact zonal representative?`,
                    confirmText: 'Contact Zonal Representative',
                    type: 'primary',
                    onConfirm: () => {
                      closeProductModal();
                      navigate('/contacts');
                    }
                  });
                }}
                className="px-4 py-2.5 rounded-xl border border-salama-teal text-salama-teal dark:text-salama-orange hover:bg-salama-teal/10 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Request Product Dossier
              </button>

              <button
                onClick={() => {
                  closeProductModal();
                  navigate('/contacts');
                }}
                className="px-6 py-2.5 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Inquire Institutional Supply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
