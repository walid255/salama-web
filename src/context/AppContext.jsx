import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_ZONES,
  INITIAL_FAQS,
  INITIAL_SITE_CONTENT,
  INITIAL_USERS
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation / Routing
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname || '/';
  });

  // Active product slug for deep routing (/catalog/:slug)
  const [activeProductSlug, setActiveProductSlug] = useState(null);

  // Auto-hiding dropdown menu state
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('salama_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('salama_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('salama_theme', 'light');
    }
  }, [darkMode]);

  // UTM tracking preservation
  const [utmParams, setUtmParams] = useState(() => {
    try {
      const search = new URLSearchParams(window.location.search);
      const params = {};
      for (const [k, v] of search.entries()) {
        if (k.startsWith('utm_') || k === 'ref') {
          params[k] = v;
        }
      }
      return params;
    } catch {
      return {};
    }
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentRoute(path);
      if (path.startsWith('/catalog/')) {
        const slug = path.replace('/catalog/', '');
        setActiveProductSlug(slug || null);
      } else {
        setActiveProductSlug(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate function with history pushState and UTM preservation
  const navigate = (path, replace = false) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);

    let finalPath = path;
    if (path.startsWith('/catalog/') && path !== '/catalog') {
      const slug = path.replace('/catalog/', '');
      setActiveProductSlug(slug);
    } else {
      setActiveProductSlug(null);
    }

    // Preserve UTMs in query string if any exist
    const utmEntries = Object.entries(utmParams);
    let queryString = '';
    if (utmEntries.length > 0) {
      queryString = '?' + new URLSearchParams(utmParams).toString();
    }

    if (replace) {
      window.history.replaceState(null, '', finalPath + queryString);
    } else {
      window.history.pushState(null, '', finalPath + queryString);
    }
    setCurrentRoute(finalPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CMS Editable State with LocalStorage persistence
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cms_content_v1');
      if (!saved) return INITIAL_SITE_CONTENT;
      const savedContent = JSON.parse(saved);
      return {
        ...INITIAL_SITE_CONTENT,
        ...savedContent,
        hero: { ...INITIAL_SITE_CONTENT.hero, ...savedContent.hero },
        homePage: { ...INITIAL_SITE_CONTENT.homePage, ...savedContent.homePage },
        aboutPage: { ...INITIAL_SITE_CONTENT.aboutPage, ...savedContent.aboutPage },
        companyProfilePage: { ...INITIAL_SITE_CONTENT.companyProfilePage, ...savedContent.companyProfilePage },
        catalogPage: { ...INITIAL_SITE_CONTENT.catalogPage, ...savedContent.catalogPage },
        contactsPage: { ...INITIAL_SITE_CONTENT.contactsPage, ...savedContent.contactsPage },
        faqPage: { ...INITIAL_SITE_CONTENT.faqPage, ...savedContent.faqPage },
        contactInfo: { ...INITIAL_SITE_CONTENT.contactInfo, ...savedContent.contactInfo }
      };
    } catch {
      return INITIAL_SITE_CONTENT;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cms_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [zones, setZones] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cms_zones_v1');
      if (!saved) return INITIAL_ZONES;
      return JSON.parse(saved).map((zone) => {
        const defaults = INITIAL_ZONES.find((initialZone) => initialZone.id === zone.id);
        const isLegacyHeadquartersLocation = zone.id === 'zone-dar'
          && zone.coordinates?.lat === -6.7924
          && zone.coordinates?.lng === 39.2083;
        const savedZone = isLegacyHeadquartersLocation
          ? { ...zone, coordinates: defaults?.coordinates }
          : zone;
        return defaults ? { ...defaults, ...savedZone } : zone;
      });
    } catch {
      return INITIAL_ZONES;
    }
  });

  const [faqs, setFaqs] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cms_faqs_v1');
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cms_users_v1');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current logged in user (RBAC)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cms_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('salama_cms_content_v1', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('salama_cms_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('salama_cms_zones_v1', JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem('salama_cms_faqs_v1', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('salama_cms_users_v1', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('salama_cms_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('salama_cms_current_user');
    }
  }, [currentUser]);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reusable Confirmation Modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'primary',
    onConfirm: () => {}
  });

  const showConfirm = ({ title, message, confirmText, cancelText, type, onConfirm }) => {
    setConfirmModal({
      isOpen: true,
      title: title || 'Are you sure?',
      message: message || '',
      confirmText: confirmText || 'Proceed',
      cancelText: cancelText || 'Cancel',
      type: type || 'primary',
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeConfirm = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Clipboard helper with automatic toast
  const copyToClipboard = (text, label = 'Copied to clipboard!') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        addToast(label, 'info');
      }).catch(() => {
        // fallback
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text, label) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    addToast(label, 'info');
  };

  // RBAC Login / Logout
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password
    );
    if (user) {
      const sanitized = { ...user };
      delete sanitized.password;
      setCurrentUser(sanitized);
      addToast(`Welcome back, ${user.name} (${user.role})!`, 'success');
      return { success: true, user: sanitized };
    }
    return { success: false, error: 'Invalid email or password. Please verify credentials.' };
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Logged out of Admin Portal successfully', 'info');
    navigate('/');
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Super Admin') return true;
    return currentUser.permissions && currentUser.permissions.includes(permission);
  };

  // Cloudflare Cache Purger
  // Includes exact implementation requested by user
  const purgeCloudflareCache = async (urlsToPurge = null, purgeEverything = false) => {
    const ZONE_ID = siteContent.cloudflare?.zoneId || 'your_cloudflare_zone_id';
    const API_TOKEN = siteContent.cloudflare?.apiToken || 'your_cloudflare_api_token';

    if (!ZONE_ID || ZONE_ID === 'your_cloudflare_zone_id' || !API_TOKEN || API_TOKEN === 'your_cloudflare_api_token') {
      // Simulate successful purge for demo and alert user to configure keys
      setSiteContent((prev) => ({
        ...prev,
        cloudflare: {
          ...prev.cloudflare,
          lastPurgeStatus: `Simulated purge executed at ${new Date().toLocaleTimeString()} (Configure real Cloudflare Zone ID & API Token in CMS)`
        }
      }));
      addToast('Cloudflare Purge simulated. Add your real Cloudflare Zone ID & API Token to invoke live API.', 'info');
      return { success: true, simulated: true };
    }

    try {
      const body = purgeEverything
        ? JSON.stringify({ purge_everything: true })
        : JSON.stringify({ files: urlsToPurge || [window.location.origin + '/*'] });

      const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body
      });

      const result = await response.json();
      if (!result.success) {
        console.error('Cloudflare purge failed:', result.errors);
        addToast(`Cloudflare purge error: ${result.errors?.[0]?.message || 'Unknown error'}`, 'error');
        setSiteContent((prev) => ({
          ...prev,
          cloudflare: {
            ...prev.cloudflare,
            lastPurgeStatus: `Failed at ${new Date().toLocaleTimeString()}: ${result.errors?.[0]?.message || 'Error'}`
          }
        }));
        return { success: false, errors: result.errors };
      }

      addToast('Cloudflare cache purged successfully across edge locations!', 'success');
      setSiteContent((prev) => ({
        ...prev,
        cloudflare: {
          ...prev.cloudflare,
          lastPurgeStatus: `Success at ${new Date().toLocaleTimeString()} (${purgeEverything ? 'Purged all' : `${urlsToPurge.length} URLs`})`
        }
      }));
      return { success: true, result };
    } catch (err) {
      console.error('Cloudflare purge network error:', err);
      addToast(`Cloudflare network error: ${err.message}`, 'error');
      return { success: false, error: err.message };
    }
  };

  // Factory reset and backup methods
  const resetToFactoryDefaults = () => {
    localStorage.removeItem('salama_cms_content_v1');
    localStorage.removeItem('salama_cms_products_v1');
    localStorage.removeItem('salama_cms_zones_v1');
    localStorage.removeItem('salama_cms_faqs_v1');
    localStorage.removeItem('salama_cms_users_v1');
    setSiteContent(INITIAL_SITE_CONTENT);
    setProducts(INITIAL_PRODUCTS);
    setZones(INITIAL_ZONES);
    setFaqs(INITIAL_FAQS);
    setUsers(INITIAL_USERS);
    addToast('All website content restored to factory pharmaceutical defaults.', 'info');
  };

  const exportBackup = () => {
    const backup = {
      siteContent,
      products,
      zones,
      faqs,
      users: users.map((u) => ({ ...u, password: '***' })),
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `salama_pharma_cms_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    addToast('CMS Database backup exported as JSON.', 'success');
  };

  const importBackup = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteContent) setSiteContent(data.siteContent);
      if (data.products) setProducts(data.products);
      if (data.zones) setZones(data.zones);
      if (data.faqs) setFaqs(data.faqs);
      addToast('CMS Database imported and restored successfully.', 'success');
      return true;
    } catch (err) {
      addToast('Failed to import JSON: invalid format.', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        navigate,
        activeProductSlug,
        setActiveProductSlug,
        activeDropdown,
        setActiveDropdown,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        darkMode,
        setDarkMode,
        utmParams,
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
        currentUser,
        login,
        logout,
        hasPermission,
        toasts,
        addToast,
        removeToast,
        confirmModal,
        showConfirm,
        closeConfirm,
        copyToClipboard,
        purgeCloudflareCache,
        resetToFactoryDefaults,
        exportBackup,
        importBackup
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
