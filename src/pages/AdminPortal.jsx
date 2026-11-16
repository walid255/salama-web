import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import AdminSiteManager from './AdminSiteManager';
import ContentImage from '../components/ContentImage';
import {
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  CloudLightning,
  Download,
  Upload,
  Globe,
  Share2,
  FileText,
  Pill,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';

export default function AdminPortal() {
  const {
    currentUser,
    login,
    logout,
    hasPermission,
    siteContent,
    setSiteContent,
    products,
    setProducts,
    zones,
    setZones,
    faqs,
    setFaqs,
    users,
    setUsers,
    purgeCloudflareCache,
    resetToFactoryDefaults,
    exportBackup,
    importBackup,
    addToast,
    showConfirm,
    navigate
  } = useApp();

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('products'); // products, content, social, cloudflare, users, seo, backup

  // Product Editing / Adding State
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    genericName: '',
    brand: 'neoMedic',
    category: 'Antibiotics & Infectious Diseases',
    therapeuticArea: 'Infectious Disease',
    dosageForm: 'Tablets',
    strength: '',
    tmdaRegNo: '',
    image: '',
    isFeatured: false,
    keyHighlight: '',
    indications: [''],
    presentation: '',
    mechanism: ''
  });

  // Cloudflare Purge form
  const [cfZoneId, setCfZoneId] = useState(siteContent.cloudflare?.zoneId || '');
  const [cfToken, setCfToken] = useState(siteContent.cloudflare?.apiToken || '');
  const [purgeUrlsText, setPurgeUrlsText] = useState('https://salamapharma.co.tz/*');
  const [isPurging, setIsPurging] = useState(false);

  // Social Links Form
  const [socialForm, setSocialForm] = useState({ ...siteContent.socialLinks });

  // Google Search Console Form
  const [gscMeta, setGscMeta] = useState(siteContent.googleSearchConsole?.verificationMeta || '');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.error);
    }
  };

  // Handle Product Save
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.genericName) {
      addToast('Product name and generic formula are required', 'error');
      return;
    }

    const slug = productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (isAddingProduct) {
      const newProd = {
        ...productForm,
        id: `prod-${Date.now()}`,
        slug,
        updatedAt: new Date().toISOString().slice(0, 10)
      };
      setProducts([newProd, ...products]);
      addToast(`Product ${newProd.name} added to catalog!`, 'success');
      setIsAddingProduct(false);
    } else if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? { ...productForm, id: p.id, slug: p.slug || slug, updatedAt: new Date().toISOString().slice(0, 10) }
          : p
      );
      setProducts(updated);
      addToast(`Product ${productForm.name} updated successfully!`, 'success');
      setEditingProduct(null);
    }
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setIsAddingProduct(false);
    setProductForm({
      ...prod,
      indications: prod.indications && prod.indications.length ? prod.indications : ['']
    });
  };

  const startAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);
    setProductForm({
      name: '',
      genericName: '',
      brand: 'neoMedic',
      category: 'Antibiotics & Infectious Diseases',
      therapeuticArea: 'Infectious Disease',
      dosageForm: 'Tablets',
      strength: '500 mg',
      tmdaRegNo: 'TMDA-TZ-MED-0' + Math.floor(1000 + Math.random() * 9000),
      image: '',
      isFeatured: false,
      keyHighlight: 'First-line registered molecule for Tanzanian healthcare facilities.',
      indications: ['Primary clinical indication compliant with Tanzania STG'],
      presentation: 'Standard blister or dispenser box',
      mechanism: 'Bactericidal cell wall inhibition or therapeutic receptor antagonism'
    });
  };

  const deleteProduct = (prod) => {
    showConfirm({
      title: `Delete Product: ${prod.name}?`,
      message: `Are you sure you want to remove "${prod.name} (${prod.genericName})" from the public formulary?\nThis action cannot be undone.`,
      confirmText: 'Delete Molecule',
      type: 'danger',
      onConfirm: () => {
        setProducts(products.filter((p) => p.id !== prod.id));
        addToast(`Deleted ${prod.name} from catalog.`, 'info');
      }
    });
  };

  // Save Social Links
  const handleSaveSocial = (e) => {
    e.preventDefault();
    setSiteContent((prev) => ({
      ...prev,
      socialLinks: { ...socialForm }
    }));
    addToast('Social media links updated across website and footer!', 'success');
  };

  // Save Search Console
  const handleSaveGSC = (e) => {
    e.preventDefault();
    setSiteContent((prev) => ({
      ...prev,
      googleSearchConsole: {
        verificationMeta: gscMeta,
        verified: true
      }
    }));
    addToast('Google Search Console verification meta tag saved!', 'success');
  };

  // Cloudflare Purge Trigger
  const handlePurgeCloudflare = async (purgeAll = false) => {
    setIsPurging(true);
    // Save keys first
    setSiteContent((prev) => ({
      ...prev,
      cloudflare: {
        ...prev.cloudflare,
        zoneId: cfZoneId,
        apiToken: cfToken
      }
    }));

    const urls = purgeUrlsText
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    await purgeCloudflareCache(urls, purgeAll);
    setIsPurging(false);
  };

  // Import Backup handler
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      importBackup(event.target.result);
    };
    reader.readAsText(file);
  };

  // If NOT Logged in: Render Secure Footer Login Panel
  if (!currentUser) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto">
        <SEOHead
          title="Admin Portal Login"
          description="Authorized clinical and communications staff access only for Salama Pharmaceuticals CMS."
          canonicalUrl="/admin"
        />

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-8 space-y-6 text-left">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-salama-teal/10 dark:bg-salama-orange/15 text-salama-teal dark:text-salama-orange mx-auto flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>
            {/* Strictly 1 h1 tag on the page */}
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Salama Staff & Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Role-Based Access Control (RBAC) System
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Authorized Email Address
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@salama.co.tz"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                />
                {/* MANDATORY REQUIREMENT: Password visibility toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
            >
              Sign In to CMS
            </button>
          </form>

          {/* Quick Demo Pre-filled Credentials */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-2">
            <p className="font-bold text-slate-700 dark:text-slate-300">Quick Test Credentials (RBAC):</p>
            <div className="grid grid-cols-1 gap-1.5 font-mono">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@salama.co.tz');
                  setLoginPassword('Salama@2026!Admin');
                }}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-left hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
              >
                <span><strong>Super Admin:</strong> admin@salama.co.tz</span>
                <span className="text-[10px] text-salama-orange">Click to fill</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('editor@salama.co.tz');
                  setLoginPassword('Salama@Editor2026');
                }}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-left hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
              >
                <span><strong>Content Editor:</strong> editor@salama.co.tz</span>
                <span className="text-[10px] text-salama-orange">Click to fill</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('reviewer@salama.co.tz');
                  setLoginPassword('Salama@Reviewer2026');
                }}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-left hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
              >
                <span><strong>Reviewer:</strong> reviewer@salama.co.tz</span>
                <span className="text-[10px] text-salama-orange">Click to fill</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN: Render Full RBAC CMS
  return (
    <div className="space-y-8 pb-24 text-left">
      <SEOHead
        title="Admin CMS Management Portal"
        description="Salama Pharmaceuticals internal Content Management System with Role-Based Access Control and Cloudflare Cache Purging."
        canonicalUrl="/admin"
      />

      {/* Top Admin Bar */}
      <section className="bg-salama-teal text-white py-8 border-b border-salama-teal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-salama-orange text-white text-[11px] font-bold uppercase tracking-wider">
                {currentUser.role}
              </span>
              <span className="text-xs text-emerald-200">{currentUser.department}</span>
            </div>
            {/* Strictly 1 h1 tag on the page */}
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Salama CMS & Control Center
            </h1>
            <p className="text-xs text-emerald-100 mt-0.5">
              Logged in as <strong>{currentUser.name}</strong> ({currentUser.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Admin Nav Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
          {[
            { id: 'products', label: `Manage Products (${products.length})`, icon: Pill },
            { id: 'content', label: 'Manage Site Pages', icon: FileText },
            { id: 'social', label: 'Social Networks & Channels', icon: Share2 },
            { id: 'cloudflare', label: 'Cloudflare Cache Purge', icon: CloudLightning },
            { id: 'users', label: 'RBAC Access & Roles', icon: ShieldCheck },
            { id: 'seo', label: 'SEO & Backlink Strategy', icon: Globe },
            { id: 'backup', label: 'Backup & Restore', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-salama-teal text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-salama-orange" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab 1: Product Management */}
      {activeTab === 'products' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Pharmaceutical Formulary & Molecules
              </h2>
              <p className="text-xs text-slate-500">
                Add, edit, and update clinical indications, packaging, and TMDA registration numbers.
              </p>
            </div>

            {hasPermission('edit_content') && !isAddingProduct && !editingProduct && (
              <button
                onClick={startAddProduct}
                className="px-4 py-2.5 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Molecule</span>
              </button>
            )}
          </div>

          {/* Add / Edit Form Modal/Drawer */}
          {(isAddingProduct || editingProduct) && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAddingProduct ? 'Add New Pharmaceutical Molecule' : `Editing: ${productForm.name}`}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. ALCEF-SB"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Generic Formula *</label>
                    <input
                      type="text"
                      required
                      value={productForm.genericName}
                      onChange={(e) => setProductForm({ ...productForm, genericName: e.target.value })}
                      placeholder="Ceftriaxone + Sulbactam"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">TMDA Registration No *</label>
                    <input
                      type="text"
                      required
                      value={productForm.tmdaRegNo}
                      onChange={(e) => setProductForm({ ...productForm, tmdaRegNo: e.target.value })}
                      placeholder="TMDA-TZ-MED-04822"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Therapeutic Category</label>
                    <input
                      type="text"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      placeholder="e.g. Cardiovascular & Renal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Dosage Form</label>
                    <input
                      type="text"
                      value={productForm.dosageForm}
                      onChange={(e) => setProductForm({ ...productForm, dosageForm: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      placeholder="e.g. Tablets"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Strength / Pack Size</label>
                    <input
                      type="text"
                      value={productForm.strength}
                      onChange={(e) => setProductForm({ ...productForm, strength: e.target.value })}
                      placeholder="1.5 g (1000mg + 500mg)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Image URL / Asset</label>
                    <input
                      type="url"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="https://example.com/product-image.jpg"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Key Clinical Highlight</label>
                  <input
                    type="text"
                    value={productForm.keyHighlight}
                    onChange={(e) => setProductForm({ ...productForm, keyHighlight: e.target.value })}
                    placeholder="Extended Spectrum β-lactamase (ESBL) producing Gram-negative bacilli..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Indications (One per line)</label>
                  <textarea
                    rows={3}
                    value={productForm.indications ? productForm.indications.join('\n') : ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        indications: e.target.value.split('\n').filter(Boolean)
                      })
                    }
                    placeholder="Enter clinical indications..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="rounded border-slate-700 text-salama-orange focus:ring-salama-orange"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-semibold">
                    Feature on Homepage Carousel
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 rounded-xl border text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-salama-teal text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save Molecule
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Molecule / Brand</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Dosage Form</th>
                    <th className="p-4">TMDA Reg No</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <ContentImage
                            src={p.image}
                            alt=""
                            className="w-10 h-10 object-contain rounded-lg bg-slate-100 dark:bg-slate-800 p-1"
                            placeholderClass="w-10 h-10 rounded-lg"
                            compact
                          />
                          <div>
                            <p className="font-bold">{p.name}</p>
                            <p className="text-[11px] text-slate-500 font-normal">{p.genericName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{p.category}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                          {p.dosageForm}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[11px]">{p.tmdaRegNo}</td>
                      <td className="p-4">
                        {p.isFeatured ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            Featured
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {hasPermission('edit_content') && (
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-salama-teal dark:text-slate-400 dark:hover:text-salama-orange transition-colors"
                            title="Edit Molecule"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {hasPermission('delete_records') && (
                          <button
                            onClick={() => deleteProduct(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Molecule"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'content' && <AdminSiteManager />}

      {/* Tab 3: Social Networks & Channels */}
      {activeTab === 'social' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                Mandatory Requirement
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Manage Social Network Links
              </h2>
              <p className="text-xs text-slate-500">
                All social network links are fully editable through this CMS panel and update instantly in the website footer.
              </p>
            </div>

            <form onSubmit={handleSaveSocial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={socialForm.linkedin || ''}
                  onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                  placeholder="https://www.linkedin.com/company/salama-pharmaceuticals-tz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  value={socialForm.twitter || ''}
                  onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                  placeholder="https://twitter.com/SalamaPharmaTZ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Facebook URL</label>
                <input
                  type="url"
                  value={socialForm.facebook || ''}
                  onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                  placeholder="https://facebook.com/SalamaPharmaTanzania"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={socialForm.instagram || ''}
                  onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                  placeholder="https://instagram.com/salamapharma_tz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={socialForm.youtube || ''}
                  onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                  placeholder="https://youtube.com/@SalamaPharmaTZ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">WhatsApp Direct Hotline</label>
                <input
                  type="text"
                  value={socialForm.whatsapp || ''}
                  onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                  placeholder="https://wa.me/255754000111"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-salama-teal text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Social Channels
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Tab 4: Cloudflare Cache Purge Tool */}
      {activeTab === 'cloudflare' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-salama-orange">
                <CloudLightning className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Cloudflare Edge Cache Purging
                </h2>
                <p className="text-xs text-slate-500">
                  Executes the exact purge API request to ensure updated medicine data is immediately visible worldwide.
                </p>
              </div>
            </div>

            {/* Cloudflare Zone & Token Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Cloudflare Zone ID</label>
                <input
                  type="text"
                  value={cfZoneId}
                  onChange={(e) => setCfZoneId(e.target.value)}
                  placeholder="e.g. 023e105f4ecef8ad9ca31a8372d0c353"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Cloudflare API Token</label>
                <input
                  type="password"
                  value={cfToken}
                  onChange={(e) => setCfToken(e.target.value)}
                  placeholder="Bearer token with Cache Purge permission"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Specific URLs to Purge (One per line)</label>
              <textarea
                rows={4}
                value={purgeUrlsText}
                onChange={(e) => setPurgeUrlsText(e.target.value)}
                placeholder="https://salamapharma.co.tz/catalog&#10;https://salamapharma.co.tz/about/profile"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-300">Last Purge Status:</p>
              <p className="text-slate-500 dark:text-slate-400 font-mono">
                {siteContent.cloudflare?.lastPurgeStatus || 'Ready'}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                disabled={isPurging}
                onClick={() => handlePurgeCloudflare(false)}
                className="px-6 py-2.5 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 transition-all"
              >
                {isPurging ? 'Purging Specific URLs...' : 'Purge Specific URLs'}
              </button>

              <button
                type="button"
                disabled={isPurging}
                onClick={() => {
                  showConfirm({
                    title: 'Purge Entire Cloudflare Cache?',
                    message: 'This will purge everything in your Cloudflare edge cache.\nYour website will fetch all assets fresh from origin.',
                    confirmText: 'Purge Everything',
                    type: 'danger',
                    onConfirm: () => handlePurgeCloudflare(true)
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 transition-all"
              >
                Purge All Cache
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 5: RBAC Access & Roles */}
      {activeTab === 'users' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Role-Based Access Control (RBAC)
              </h2>
              <p className="text-xs text-slate-500">
                Manage user permissions across Executive, Clinical Content, and Regulatory Review roles.
              </p>
            </div>

            <div className="space-y-4">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{u.name}</p>
                      <span className="px-2 py-0.5 rounded-md bg-salama-teal text-white text-[10px] font-bold">
                        {u.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{u.email} • {u.department}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {u.permissions?.map((perm, pi) => (
                        <span key={pi} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    {u.id === currentUser.id ? (
                      <span className="text-emerald-500 font-bold">Current Session</span>
                    ) : (
                      <span>Active Staff Account</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 6: SEO & Backlink Strategy */}
      {activeTab === 'seo' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                Search Engine Optimization
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Google Search Console & Backlink Strategy
              </h2>
              <p className="text-xs text-slate-500">
                Manage search engine meta tags, canonical definitions, and the official backlink outreach blueprint.
              </p>
            </div>

            {/* Google Search Console Tag */}
            <form onSubmit={handleSaveGSC} className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Google Search Console Verification Tag
              </h3>
              <p className="text-xs text-slate-500">
                Paste your verification meta token (e.g. google-site-verification=xxxx):
              </p>
              <input
                type="text"
                value={gscMeta}
                onChange={(e) => setGscMeta(e.target.value)}
                placeholder="google-site-verification=salama_pharma_tz_token"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-salama-teal text-white text-xs font-bold uppercase tracking-wider"
              >
                Save Meta Tag
              </button>
            </form>

            {/* Backlink Strategy Plan */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Official Clinical Backlink Strategy Blueprint
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-salama-teal dark:text-salama-orange text-sm mb-1">
                    1. Tanzanian Ministry of Health & TMDA Portals
                  </p>
                  <p>
                    Anchor registered molecule monographs to official TMDA registry search listings. Ensure hospital
                    procurement guidelines list Salama as an accredited prime vendor with outbound hyperlinks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-salama-teal dark:text-salama-orange text-sm mb-1">
                    2. Medical University & Hospital Links (MUHAS, KCMUCo, Bugando)
                  </p>
                  <p>
                    Collaborate with Tanzanian university clinical pharmacology departments on antimicrobial stewardship
                    research and sponsor accredited CME webinars linking back to our clinical monographs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-salama-teal dark:text-salama-orange text-sm mb-1">
                    3. East African Pharmaceutical Directories & Trade Publications
                  </p>
                  <p>
                    Maintain verified profiles on the Pharmacy Council of Tanzania, East African Community (EAC) Medicines
                    Regulatory Harmonization (MRH) portal, and the Medical Association of Tanzania (MAT).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Tab 7: Backup & Restore */}
      {activeTab === 'backup' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                CMS Data Backup, Export & Factory Reset
              </h2>
              <p className="text-xs text-slate-500">
                Safeguard all website modifications, export full database snapshots, or restore defaults.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <Download className="w-6 h-6 text-salama-teal dark:text-salama-orange" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Export Database Backup</h3>
                <p className="text-xs text-slate-500">
                  Download a comprehensive JSON snapshot containing all products, content, and settings.
                </p>
                <button
                  type="button"
                  onClick={exportBackup}
                  className="px-4 py-2 rounded-xl bg-salama-teal text-white text-xs font-bold uppercase tracking-wider"
                >
                  Download JSON Backup
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <Upload className="w-6 h-6 text-salama-orange" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Restore from Backup</h3>
                <p className="text-xs text-slate-500">
                  Upload a previously saved JSON backup to replace the current CMS database.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-salama-orange file:text-white"
                />
              </div>
            </div>

            {hasPermission('manage_users') && (
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-rose-600">Factory Reset CMS Database</h4>
                  <p className="text-xs text-slate-500">Reverts all products, zones, and content to the initial 40-year presentation state.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    showConfirm({
                      title: 'Reset CMS to Factory Defaults?',
                      message: 'This will reset all products, content, and FAQs to factory pharmaceutical seed data.\nAny unsaved changes will be lost.',
                      confirmText: 'Reset Everything',
                      type: 'danger',
                      onConfirm: resetToFactoryDefaults
                    });
                  }}
                  className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"
                >
                  Reset to Defaults
                </button>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
