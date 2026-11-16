import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import MobileDrawer from './components/MobileDrawer';
import ScrollToTop from './components/ScrollToTop';
import FloatingContact from './components/FloatingContact';
import StickyHelp from './components/StickyHelp';
import CookieBanner from './components/CookieBanner';
import ToastContainer from './components/Toast';
import ConfirmationModal from './components/Modal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import ZonalSupplyPage from './pages/ZonalSupplyPage';
import ClinicalFreedomPage from './pages/ClinicalFreedomPage';
import QualityAssurancePage from './pages/QualityAssurancePage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import FAQPage from './pages/FAQPage';
import AdminPortal from './pages/AdminPortal';
import NotFoundPage from './pages/NotFoundPage';
import LegalPage from './pages/LegalPage';

export default function App() {
  const { currentRoute } = useApp();

  // Route selector
  const renderCurrentPage = () => {
    if (currentRoute === '/') return <HomePage />;
    if (currentRoute === '/about') return <AboutPage />;
    if (currentRoute === '/about/profile') return <CompanyProfilePage />;
    if (currentRoute === '/about/zones') return <ZonalSupplyPage />;
    if (currentRoute === '/about/clinical-freedom') return <ClinicalFreedomPage />;
    if (currentRoute === '/about/quality') return <QualityAssurancePage />;
    if (currentRoute.startsWith('/catalog')) return <CatalogPage />;
    if (currentRoute === '/contacts') return <ContactsPage />;
    if (currentRoute === '/faq') return <FAQPage />;
    if (currentRoute === '/admin') return <AdminPortal />;
    if (currentRoute === '/privacy') return <LegalPage mode="privacy" />;
    if (currentRoute === '/terms') return <LegalPage mode="terms" />;
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-salama-orange selection:text-white transition-colors duration-200">
      {/* Global Navbar with auto-closing dropdowns */}
      <Navbar />

      {/* Main Page Container */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {renderCurrentPage()}
      </main>

      {/* Footer with Mandatory Sole Admin Login Panel */}
      <Footer />

      {/* Interactive Floating UX Utilities */}
      <SearchModal />
      <MobileDrawer />
      <ScrollToTop />
      <FloatingContact />
      <StickyHelp />
      <CookieBanner />
      <ToastContainer />
      <ConfirmationModal />
    </div>
  );
}
